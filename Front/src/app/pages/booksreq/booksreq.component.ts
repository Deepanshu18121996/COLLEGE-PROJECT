import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BookRequestService } from "src/app/service/book-request.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-booksreq",
  templateUrl: "./booksreq.component.html",
  styleUrls: ["./booksreq.component.css"],
})
export class BooksreqComponent implements OnInit {
  bookForm: FormGroup;
  msg;
  constructor(private fb: FormBuilder, private bookreq: BookRequestService) {}

  Bookreq() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const fData = this.bookForm.getRawValue();
    const email = localStorage.getItem("email");
    const data = { data: fData, email: email };
    this.bookreq.booksreq(data).subscribe((res) => {
      this.msg = res;
      if (this.msg.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Book Request not sent ",
          text: "Error in filling the details",
        });
      } else {
        Swal.fire(
          "Books Request Sent!",
          "We will revert back to you in few days and update you about the book ASAP!",
          "success"
        ).then(() => {
          this.bookForm.reset();
          section.classList.toggle("blur");
        });
      }
    });
  }

  ngOnInit() {
    this.validate();
  }
  validate() {
    this.bookForm = this.fb.group({
      book_title: ["", Validators.required],
      author_name: ["", Validators.required],
      publisher: ["", Validators.required],
      edition: ["", Validators.required],
      description: ["", Validators.required],
    });
  }
}
