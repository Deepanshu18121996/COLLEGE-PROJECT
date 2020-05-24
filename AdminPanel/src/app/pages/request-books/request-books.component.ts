import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { BookRequestService } from "../../service/book-request.service";

@Component({
  selector: "app-request-books",
  templateUrl: "./request-books.component.html",
  styleUrls: ["./request-books.component.scss"],
})
export class RequestBooksComponent implements OnInit {
  bookreqData;
  resData;
  constructor(private book_req: BookRequestService) {}
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

  delbookreq(id, email) {
    this.book_req.deletebooksreq(id, email).subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.bookreqData = this.resData.data;
        Swal.fire({
          icon: "success",
          text: "Books Request Completed",
          footer: "!",
        }).then(() => location.reload());
      } else {
        Swal.fire({
          icon: "error",
          text: "Book Request Not Completed",
          footer: "!",
        });
      }
    });
  }

  ngOnInit(): void {
    this.book_req.fetchbooksreq().subscribe((res) => {
      this.resData = res;
      if (this.resData.err == 0) {
        this.bookreqData = this.resData.data;
      }
    });
    this.nav();
  }
}
