import { Component, OnInit } from "@angular/core";
import { NoteRequestService } from "src/app/service/note-request.service";
import { AddNotecategoryService } from "../../service/add-notecategory.service";
import { SavednotesService } from "../../service/savednotes.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"],
})
export class NotesComponent implements OnInit {
  resData;
  noteData;
  msg;
  delete_res: any;
  saveanddelete;
  constructor(
    private notereq: NoteRequestService,
    private addcat: AddNotecategoryService,
    private savenote: SavednotesService
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

  delnotes(id, email) {
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
        this.notereq.deletenotes(id, email).subscribe((res) => {
          this.resData = res;
          if (this.resData.err == 0) {
            this.notereq.fetchnotesreq().subscribe((res) => {
              this.resData = res;
              if (this.resData.err == 0) {
                this.noteData = this.resData.data;
                Swal.fire({
                  icon: "warning",
                  text: " Notes Deleted Successfully",
                }).then(() => {
                  location.reload();
                });
              }
            });
          }
        });
      }
    });
  }

  ngOnInit() {
    this.nav();
    this.notereq.fetchnotesreq();
    this.notereq.fetchnotesreq().subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.noteData = this.resData.data;
      }
    });
  }
  addnotesbyid(data) {
    this.savenote.savednotes(data).subscribe((x) => {
      this.saveanddelete = x;
      if (
        (this.saveanddelete.err == 1 || this.saveanddelete.err == 2,
        this.saveanddelete.err == 3)
      ) {
        Swal.fire({
          icon: "success",
          text: " Some Error",
        }).then(() => {
          location.reload();
        });
      } else {
        Swal.fire({
          icon: "success",
          text: " Notes Added Successfully",
        }).then(() => {
          location.reload();
        });
      }
    });
  }
}
