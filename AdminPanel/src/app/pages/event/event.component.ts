import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { AddBooksService } from "../../service/add-books.service";
import { AddCategoryService } from "../../service/add-category.service";
import { DelCategoryService } from "../../service/del-category.service";
import { SubscriberMailService } from "../../service/subscriber-mail.service";
import { AddNotecategoryService } from "../../service/add-notecategory.service";
import { DelNotecategoryService } from "../../service/del-notecategory.service";
import { NoteRequestService } from "src/app/service/note-request.service";
import { SavednotesService } from "src/app/service/savednotes.service";
import { Observable } from "rxjs";
import { NotesdetailService } from "../../service/notesdetail.service";
import { map } from "rxjs/operators";
import { notedetail } from "src/app/pagemodels/notedetail";
@Component({
  selector: "app-event",
  templateUrl: "./event.component.html",
  styleUrls: ["./event.component.scss"],
})
export class EventComponent implements OnInit {
  index = 1;
  sending_mail: FormGroup;
  add_books: FormGroup;
  add_category: FormGroup;
  del_category: FormGroup;
  add_notecategory: FormGroup;
  del_notecategory: FormGroup;
  imgPath;
  books_res;
  delete_res;
  adding_res;
  mail_res;
  myForm: FormGroup;
  filePath;
  notes_categories$: Observable<notedetail>;
  msg;
  saveanddelete;
  constructor(
    private fb: FormBuilder,
    private new_book: AddBooksService,
    private delete_cat: DelCategoryService,
    private adding_cat: AddCategoryService,
    private sub: SubscriberMailService,
    private adding_notecat: AddNotecategoryService,
    private delete_notecat: DelNotecategoryService,
    private notereq: NoteRequestService,
    private savenote: SavednotesService,
    private notecat_name: NotesdetailService
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

  //================= image path ===============//
  uimage(event) {
    if (event.target.files.length > 0) {
      this.imgPath = event.target.files[0];
    }
  }

  //==================== file path ===============//
  ufile(event) {
    if (event.target.files.length > 0) {
      this.filePath = event.target.files[0];
    }
  }

  //================= show form section ===========//
  show_form(pos) {
    this.index = pos;
    // .log(this.index);
    const category = document.querySelector("main > div:nth-child(1)");
    const new_books = document.querySelector("main > div:nth-child(2)");
    const notecategory = document.querySelector("main > div:nth-child(3)");
    const new_notes = document.querySelector("main > div:nth-child(4)");
    const sub = document.querySelector("main > div:nth-child(5)");

    if (this.index == 1) {
      new_books.classList.remove("show");
      notecategory.classList.remove("show");
      new_notes.classList.remove("show");
      sub.classList.remove("show");
      category.classList.add("show");
    } else if (this.index == 2) {
      notecategory.classList.remove("show");
      new_notes.classList.remove("show");
      sub.classList.remove("show");
      category.classList.remove("show");
      new_books.classList.add("show");
    } else if (this.index == 3) {
      new_notes.classList.remove("show");
      sub.classList.remove("show");
      category.classList.remove("show");
      new_books.classList.remove("show");
      notecategory.classList.add("show");
    } else if (this.index == 4) {
      category.classList.remove("show");
      new_books.classList.remove("show");
      notecategory.classList.remove("show");
      sub.classList.remove("show");
      new_notes.classList.add("show");
    } else if (this.index == 5) {
      category.classList.remove("show");
      new_books.classList.remove("show");
      notecategory.classList.remove("show");
      new_notes.classList.remove("show");
      sub.classList.add("show");
    }
  }

  default() {
    const category = document.querySelector("main > div:nth-child(1)");
    const new_books = document.querySelector("main > div:nth-child(2)");
    const notecategory = document.querySelector("main > div:nth-child(3)");
    const new_notes = document.querySelector("main > div:nth-child(4)");
    const sub = document.querySelector("main > div:nth-child(5)");
    if (this.index == 1) {
      new_books.classList.remove("show");
      notecategory.classList.remove("show");
      new_notes.classList.remove("show");
      sub.classList.remove("show");
      category.classList.add("show");
    }
  }

  //===================== add/delete books category section ===================//
  add_cat() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.add_category.getRawValue();
    this.adding_cat.addcategory(data).subscribe((res) => {
      this.adding_res = res;
      if (this.adding_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Already Found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Category Added....",
          footer: `${data.category}`,
        }).then(() => {
          this.add_category.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  del_cat() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.del_category.getRawValue();
    this.delete_cat.delcategory(data).subscribe((res) => {
      this.delete_res = res;
      if (this.delete_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Not Found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Deleted",
          text: "Category Deleted...",
          footer: "!",
        }).then(() => {
          this.del_category.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  //======================== add/delete notes category section =====================//
  add_notecat() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.add_notecategory.getRawValue();
    this.adding_notecat.addnotecategory(data).subscribe((res) => {
      this.adding_res = res;
      if (this.adding_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Already Found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Category Added....",
          footer: `${data.category}`,
        }).then(() => {
          this.add_notecategory.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  del_notecat() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.del_notecategory.getRawValue();
    this.delete_notecat.delnotecategory(data).subscribe((res) => {
      this.delete_res = res;
      if (this.delete_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Not Found....",
          footer: "!",
        });
      } else if (this.delete_res.err == 2) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Category Not found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Category Deleted....",
          footer: "!",
        }).then(() => {
          this.del_notecategory.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  //=========================== add new books section ===============================//
  books() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.add_books.getRawValue();
    let aData = new FormData();
    aData.append("name", data.name);
    aData.append("category", data.category);
    aData.append("price", data.price);
    aData.append("writer", data.writer);
    aData.append("edition", data.edition);
    aData.append("published_year", data.published_year);
    aData.append("current_price", data.current_price);
    aData.append("Image", this.imgPath);
    this.new_book.add_new_books(aData).subscribe((res) => {
      this.books_res = res;
      if (this.books_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Category Not Found....",
          footer: "!",
        });
      } else if (this.books_res.err == 2) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Connection Error....",
          footer: "!DataBase",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Book Added Successfully...",
          footer: "!",
        }).then(() => {
          this.add_books.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  //=============================== add new notes section ===========================//
  postCat() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const fData = this.myForm.getRawValue();
    const email = localStorage.getItem("admin_email");
    let formdata = new FormData();
    formdata.append("cat_name", fData.cat_name);
    formdata.append("email", email);
    formdata.append(
      "custom_cat",
      fData.cat_name == "others" ? fData.custom_cat : fData.cat_name
    );
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
          section.classList.toggle("blur");
        });
      }
    });
  }

  //============================= Send Email Section ==========================//
  mail() {
    const data = this.sending_mail.getRawValue();
    const wait_res = document.getElementById("wait");
    wait_res.classList.toggle("wait_cursor");

    this.sub.subscriber(data).subscribe((res) => {
      this.mail_res = res;
      if (this.mail_res.err == 1 || this.mail_res.err == 3) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Connection Error....",
          footer: "Retry",
        });
      } else if (this.mail_res.err == 2) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Account Not Found....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Mail Send",
          text: "Done....",
          footer: "!",
        }).then(() => {
          wait_res.classList.toggle("wait_cursor");
          this.sending_mail.reset();
        });
      }
    });
  }

  ngOnInit(): void {
    this.nav();
    this.default();
    this.mail_validate();
    this.books_validate();
    this.add_cat_validate();
    this.del_cat_validate();
    this.add_notecat_validate();
    this.del_notecat_validate();
    this.notes_categories$ = this.notecat_name
      .notesdetails()
      .pipe(map((x) => x.data));
    this.notes_validate();
  }

  notes_validate() {
    this.myForm = this.fb.group({
      cat_name: ["", Validators.required],
      custom_cat: [""],
      note_name: ["", Validators.required],
      description: ["", Validators.required],
      // "Form": ["", Validators.required],
    });
  }

  mail_validate() {
    this.sending_mail = this.fb.group({
      mail: ["", Validators.required],
    });
  }

  add_cat_validate() {
    this.add_category = this.fb.group({
      category: ["", Validators.required],
    });
  }
  del_cat_validate() {
    this.del_category = this.fb.group({
      category: ["", Validators.required],
    });
  }

  add_notecat_validate() {
    this.add_notecategory = this.fb.group({
      category: ["", Validators.required],
    });
  }
  del_notecat_validate() {
    this.del_notecategory = this.fb.group({
      category: ["", Validators.required],
    });
  }

  books_validate() {
    this.add_books = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      price: ["", Validators.required],
      writer: ["", Validators.required],
      edition: ["", Validators.required],
      published_year: ["", Validators.required],
      current_price: ["", Validators.required],
      Image: ["", Validators.required],
    });
  }
}
