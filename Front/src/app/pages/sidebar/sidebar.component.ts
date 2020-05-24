import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router) {}

  addclass() {
    const a = document.querySelectorAll("section>ul>li>a");
    a.forEach((el, index) => {
      el.addEventListener("click", this.add);
      // el.classList.contains
    });
  }

  add(e) {
    const i = e.target.previousElementSibling;
    const all_i = document.querySelectorAll("section>ul>li>i");
    all_i.forEach((e) => {
      if (e.classList.contains("green")) {
        e.classList.remove("green");
      } else {
        i.classList.add("green");
      }
    });
  }

  logout() {
    localStorage.clear();
    Swal.fire({
      title: "Success",
      text: "LogOut",
      icon: "success",
      footer: "!",
    }).then(() => {
      this.router.navigate(["/"]);
    });
  }
  ngOnInit() {
    this.addclass();
  }
}
