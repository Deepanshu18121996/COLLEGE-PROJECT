import { Component, OnInit } from "@angular/core";
import { NotesdetailService } from "../../service/notesdetail.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SavednotesService } from "../../service/savednotes.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import * as FileSaver from "file-saver";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"],
})
export class NotesComponent implements OnInit {
  note_category$: Observable<any>;
  note_detail$: Observable<any>;
  resData;
  cid;
  file;
  myForm: FormGroup;
  noteSave;
  noteDetail;
  attachmentList: any;
  notesDescription: any;
  notesHeader: any;

  constructor(
    private notecat_name: NotesdetailService,
    private saved_note: SavednotesService,
    private ar: ActivatedRoute,
    private modalService: NgbModal
  ) {}

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
    this.saved_note.deletesavednotes(id).subscribe((res) => {
      this.resData = res;
      Swal.fire({
        icon: "warning",
        text: "Notes deleted",
      });
      if (this.resData.err == 0) {
        this.saved_note.fetchsavednotes().subscribe((res) => {
          this.resData = res;
          if (this.resData.err == 0) {
            this.noteSave = this.resData.data;
          }
        });
      }
    });
  }

  ngOnInit() {
    this.saved_note.fetchsavednotes().subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.noteSave = this.resData.data;
      }
    });
    this.notes_d$();
    this.notes_Allsaved$();
  }
  fetchsavenote() {
    this.saved_note.fetchsavednotes().subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.noteSave = this.resData.data;
      }
    });
  }
  download(data, filename) {
    this.saved_note.downloadFile(data).subscribe(
      (res) => {
        FileSaver.saveAs(res, filename);
      },
      (err) => {}
    );
  }

  open(content, data, datahead) {
    this.notesDescription = data;
    this.notesHeader = datahead;
    const modalRef = this.modalService.open(content, {
      ariaLabelledBy: "modal-basic-title",
    });
  }
}
