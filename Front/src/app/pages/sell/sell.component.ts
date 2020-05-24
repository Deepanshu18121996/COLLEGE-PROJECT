import { Component, OnInit } from "@angular/core";
import { CreateSellService } from "../../service/create-sell.service";
import { GetSelluserService } from "../../service/get-selluser.service";
import { from } from "rxjs";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SaveSecondBooksService } from "../../service/save-second-books.service";
@Component({
  selector: "app-sell",
  templateUrl: "./sell.component.html",
  styleUrls: ["./sell.component.css"],
})
export class SellComponent implements OnInit {
  sell_response;
  get_response;
  add_books: FormGroup;
  imgPath;
  constructor(
    private create: CreateSellService,
    private selluser: GetSelluserService,
    private fb: FormBuilder,
    private router: Router,
    private second_book: SaveSecondBooksService
  ) {}

  term(event) {
    if (event.target.checked) {
      const email = localStorage.getItem("email");
      if (email == null) {
        Swal.fire({
          title: "Error",
          text: "Please Login",
          icon: "info",
          footer: "",
        }).then(() => {
          this.router.navigate(["/login"]);
        });
      } else {
        this.create.create(email).subscribe((res) => {
          this.sell_response = res;
          if (this.sell_response.err == 1) {
            Swal.fire({
              title: "Error",
              text: "Some Error",
              icon: "error",
              footer: "Retry",
            });
          } else {
            Swal.fire({
              title: "Success",
              text: "Account Create",
              icon: "success",
              footer: "!",
            }).then(() => {
              this.hide_term();
            });
          }
        });
      }
    } else {
    }
  }

  // To check user present in database or not
  get_data() {
    const email = localStorage.getItem("email");
    if (email == null) {
      Swal.fire({
        title: "Error",
        text: "Please Login",
        icon: "info",
        footer: "",
      }).then(() => {
        this.router.navigate(["/login"]);
      });
    } else {
      this.selluser.create(email).subscribe((res) => {
        this.get_response = res;
        if (this.get_response.err == 1) {
        } else if (this.get_response.err == 2) {
        } else {
          this.hide_term();
        }
      });
    }
  }

  hide_term() {
    const section = document.querySelector(".term_condition");
    const book = document.querySelector(".add_books");
    section.classList.add("hide");
    book.classList.add("show");
  }

  uimage(event) {
    if (event.target.files.length > 0) {
      this.imgPath = event.target.files[0];
    }
  }

  books() {
    const data = this.add_books.getRawValue();
    const email = localStorage.getItem("email");
    const div = document.querySelector(".add_books");
    div.classList.add("blur");
    let aData = new FormData();
    aData.append("email", email);
    aData.append("name", data.name);
    aData.append("category", data.category);
    aData.append("price", data.price);
    aData.append("writer", data.writer);
    aData.append("edition", data.edition);
    aData.append("published_year", data.published_year);
    aData.append("Image", this.imgPath);
    this.second_book.save(aData).subscribe((res) => {
      this.sell_response = res;
      if (this.sell_response.err == 0) {
        Swal.fire({
          title: "success",
          text: "Request Sent",
          icon: "success",
          footer: "!",
        }).then(() => {
          this.add_books.reset();
          div.classList.remove("blur");
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Some Error",
          icon: "error",
          footer: "!",
        }).then(() => {
          div.classList.remove("blur");
        });
      }
    });
  }

  ngOnInit() {
    this.get_data();
    this.books_validate();
  }
  books_validate() {
    this.add_books = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      price: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern("[0-9]*"),
        ],
      ],
      writer: ["", Validators.required],
      edition: [
        "",
        [Validators.required, Validators.pattern("[0-9 a-zA-Z_]*")],
      ],
      published_year: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern("[0-9]*"),
        ],
      ],
      Image: ["", Validators.required],
    });
  }
}
