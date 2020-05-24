import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NoteRequestService } from "src/app/service/note-request.service";
import { Observable } from 'rxjs';
import { NotesdetailService } from '../../service/notesdetail.service';
import { map } from 'rxjs/operators';
import { notedetail } from 'src/app/pagemodels/notedetail';
import Swal from 'sweetalert2';

@Component({
  selector: "app-notesreq",
  templateUrl: "./notesreq.component.html",
  styleUrls: ["./notesreq.component.css"],
})
export class NotesreqComponent implements OnInit {
  myForm: FormGroup;
  filePath;
  notes_categories$: Observable<notedetail>;
  msg;
  constructor(private fb: FormBuilder, private notereq: NoteRequestService,
    private notecat_name: NotesdetailService) { }
  ufile(event) {
    if (event.target.files.length > 0) {
      this.filePath = event.target.files[0];

    }
  }
  postCat() {
    const fData = this.myForm.getRawValue();
    const email = localStorage.getItem('email');
    let formdata = new FormData();
    formdata.append("cat_name", fData.cat_name);
    formdata.append('email', email);
    formdata.append("custom_cat", fData.cat_name == "others" ? fData.custom_cat : fData.cat_name);
    formdata.append("note_name", fData.note_name);
    formdata.append("description", fData.description);
    formdata.append("File", this.filePath);
    this.notereq.notesreq(formdata).subscribe((res) => {
      this.msg = res;
      if (this.msg.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Error in notes",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Notes Request Sent",
          footer: "done",
        }).then(() => {
          this.myForm.reset();
        });
      }
    });
  }

  ngOnInit() {
    this.notes_categories$ = this.notecat_name.notesdetails().pipe(map((x) => x.data));
    this.validate();
  }
  validate() {
    this.myForm = this.fb.group({
      "cat_name": ["", Validators.required],
      "custom_cat": [""],
      "note_name": ["", Validators.required],
      "description": ["", Validators.required],
      // "Form": ["", Validators.required],
    });
  }
}
