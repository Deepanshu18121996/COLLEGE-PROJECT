import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteRequestService } from 'src/app/service/note-request.service';
import { NotesdetailService } from '../../service/notesdetail.service';
import { notedetail } from 'src/app/pagemodels/notedetail';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editnotes',
  templateUrl: './editnotes.component.html',
  styleUrls: ['./editnotes.component.scss']
})
export class EditnotesComponent implements OnInit {
  myForm: FormGroup;
  cid;
  resData;
  filePath;
  rData;
  notes_categories$: Observable<notedetail>;

  constructor(private fb: FormBuilder, private ar: ActivatedRoute,
    private notereq: NoteRequestService, private router: Router,
    private notecat_name: NotesdetailService) { }
  ufile(event) {
    if (event.target.files.length > 0) {
      this.filePath = event.target.files[0];
    }
  }
  editNote() {
    let fData = this.myForm.getRawValue();
    // let formdata = new FormData();
    // formdata.append("cat_name", fData.cat_name);
    // formdata.append("custom_cat", fData.cat_name == "others" ? fData.custom_cat : fData.cat_name);
    // formdata.append("note_name", fData.note_name);
    // formdata.append("description", fData.description);
    // formdata.append("File", this.filePath);
    this.notereq.editnotes(this.cid, fData).subscribe((res) => {
      this.rData = res;
      if (this.rData.err == 0) {
        Swal.fire({
          icon: "success",
          text: " Notes Updated Successfully"
        });
        this.router.navigate(["/main/notes"]);
      }
      else {
        Swal.fire({
          icon: "error",
          text: "Some error"
        });
      }
    });
  }
  ngOnInit() {
    //fetch param value
    this.ar.params.subscribe(res => {
      this.cid = res.cid;
      this.notereq.fetchnotebyid(this.cid)
        .subscribe(res => {
          this.resData = res;
          if (this.resData.err == 0) {
            this.myForm.controls.cat_name.patchValue
              (this.resData.data[0].cat_name);
            this.myForm.controls.custom_cat.patchValue
              (this.resData.data[0].custom_cat);
            this.myForm.controls.note_name.patchValue
              (this.resData.data[0].note_name);
            this.myForm.controls.description.patchValue
              (this.resData.data[0].description)
          }
        })
    })
    this.validate();
    this.notes_categories$ = this.notecat_name.notesdetails().pipe(map((x) => x.data));
  }

  validate() {
    this.myForm = this.fb.group({
      "cat_name": ["", Validators.required],
      "custom_cat": [""],
      "note_name": ["", Validators.required],
      "description": ["", Validators.required],
    });
  }
}


