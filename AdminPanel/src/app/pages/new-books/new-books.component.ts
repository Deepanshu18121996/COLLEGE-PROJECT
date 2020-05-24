import { Component, OnInit } from "@angular/core";
import { DetailsService } from "../../service/details.service";
import { GetBooksService } from "../../service/get-books.service";
import { DeleteBookService } from "../../service/delete-book.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-new-books",
  templateUrl: "./new-books.component.html",
  styleUrls: ["./new-books.component.scss"],
})
export class NewBooksComponent implements OnInit {
  constructor(
    private get_cat: DetailsService,
    private get_book: GetBooksService,
    private delete_book: DeleteBookService
  ) {}
  private index = 0;
  caterory;
  category_name;
  books;
  books_name;
  delete_status;
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

  new_book() {
    const img = document.querySelector(".setting>div");
    const menu = document.querySelector(".new_menu");
    img.addEventListener("click", () => {
      menu.classList.toggle("menu_height");
    });
  }

  width() {
    setTimeout(() => {
      this.section_inc();
    }, 200);
  }

  height() {
    setTimeout(() => {
      this.sec();
    }, 800);
  }

  sec() {
    const section = document.querySelector(".new_wrapper>section");
    section.classList.add("section_increase");
    this.get_book.getbooks("science").subscribe((res) => {
      this.books = res;
      if (this.books.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        });
      }
      this.books_name = this.books.data;
    });
  }
  section_inc() {
    const new_wrapper = document.querySelector(".new_wrapper");
    new_wrapper.classList.add("increase_width");
  }

  get_category() {
    const img = document.querySelector(".setting>div");
    if (this.index == 0) {
      img.classList.add("add_cursor");
      this.get_cat.details().subscribe((res) => {
        this.caterory = res;
        if (this.caterory.err == 1) {
          Swal.fire({
            icon: "error",
            title: "Oops!...",
            text: "SomeThing Wrong....",
            footer: "!",
          });
        }
        this.category_name = this.caterory.data;
        img.classList.remove("add_cursor");
        this.index++;
      });
    } else {
      this.index--;
    }
  }

  category_books(category) {
    this.get_book.getbooks(category).subscribe((res) => {
      this.books = res;
      if (this.books.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Not found....",
          footer: "This category not found in database",
        });
      } else if (this.books.data.length == 0) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "NO books....",
          footer: "!",
        });
      } else {
        this.books_name = this.books.data;
      }
    });
  }

  delete_books(id, category) {
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
        this.delete_book.deletebooks(id, category).subscribe((res) => {
          this.delete_status = res;
          if (this.delete_status.err == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops!...",
              text: "SomeThing Wrong....",
              footer: "!",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Success...",
              text: "Book Deleted",
              footer: `Books deleted form ${category} category`,
            }).then(() => {
              location.reload();
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.nav();
    this.new_book();
    this.width();
    this.height();
  }
}
