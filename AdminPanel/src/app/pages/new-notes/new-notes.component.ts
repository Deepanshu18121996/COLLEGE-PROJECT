import { Component, OnInit } from "@angular/core";
import { NotesdetailService } from "../../service/notesdetail.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SavednotesService } from "../../service/savednotes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NoteRequestService } from "../../service/note-request.service";
import { FormGroup } from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-new-notes",
  templateUrl: "./new-notes.component.html",
  styleUrls: ["./new-notes.component.scss"],
})
export class NewNotesComponent implements OnInit {
  note_category$: Observable<any>;
  note_detail$: Observable<any>;
  resData;
  cid;
  myForm: FormGroup;
  noteSave;
  noteDetail;
  attachmentList: any;
  notesDescription: any;

  constructor(
    private notecat_name: NotesdetailService,
    private saved_note: SavednotesService,
    private notereq: NoteRequestService,
    private ar: ActivatedRoute
  ) {}

  nav() {
    const hambarger = document.querySelector(".hambarger");
    const aside = document.querySelector(".aside");
    const header = document.querySelector(".header");
    // const logo = document.querySelector("aside>div>div");
    hambarger.addEventListener("click", () => {
      hambarger.classList.toggle("ham_bar");
      var w = window.innerWidth;
      aside.classList.toggle("nav_move");
      hambarger.classList.toggle("cross");
      if (w == 768) {
        header.classList.toggle("header_move2");
      } else if (w > 768 && w <= 1200) {
        header.classList.toggle("header_move3");
      } else if (w > 1200) {
        header.classList.toggle("header_move4");
      } else {
        header.classList.toggle("header_move");
      }
    });
  }

  notes_d$() {
    this.note_category$ = this.notecat_name
      .notesdetails()
      .pipe(map((x) => x.data));
  }
  reloadNotes(data) {
    this.note_detail$ = this.saved_note
      .fetchnotesByCat(data)
      .pipe(map((x) => x.data));
  }
  notes_Allsaved$() {
    this.note_detail$ = this.saved_note
      .fetchsavednotes()
      .pipe(map((x) => x.data));
  }

  delsavednotes(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.saved_note.deletesavednotes(id).subscribe((res) => {
          if (this.resData.err == 0) {
            this.noteSave = this.resData.data;
            Swal.fire({
              icon: "warning",
              text: "Notes Deleted",
              footer: "!",
            }).then(() => location.reload());
          } else {
            Swal.fire({
              icon: "error",
              text: "notes not deleted",
              footer: "!",
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.saved_note.fetchsavednotes().subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.noteSave = this.resData.data;
      }
    });
    this.nav();
    this.notes_d$();
    this.notes_Allsaved$();
  }
}
