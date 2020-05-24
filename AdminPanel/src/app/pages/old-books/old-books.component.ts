import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-old-books",
  templateUrl: "./old-books.component.html",
  styleUrls: ["./old-books.component.scss"],
})
export class OldBooksComponent implements OnInit {
  constructor() { }

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

  ngOnInit(): void {
    this.nav();
  }
}
