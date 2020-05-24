import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-adminpanel",
  templateUrl: "./adminpanel.component.html",
  styleUrls: ["./adminpanel.component.scss"],
})
export class AdminpanelComponent implements OnInit {
  index = 0;
  constructor() {}

  nav() {
    const hambarger = document.querySelector(".hambarger");
    const aside = document.querySelector("aside");
    const header = document.querySelector("header");
    // const logo = document.querySelector("aside>div>div");
    hambarger.addEventListener("click", () => {
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
