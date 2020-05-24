import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { timer } from "rxjs";
import { GetOrderService } from "../../service/get-order.service";
import { UpdateOrderService } from "../../service/update-order.service";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  order_data;
  order_value;
  update_res;
  login: FormGroup;
  constructor(
    private order: GetOrderService,
    private update: UpdateOrderService,
    private fb: FormBuilder,
    private route: Router
  ) { }

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

  search(event) {
    const table = document.querySelector("table");
    const order = document.getElementById("#order");
    const searchfeild = document.querySelector("input").value.toLowerCase();
    const tr = table.querySelectorAll("tr");
    for (let i = 0; i < tr.length; i++) {
      const td = tr[i].querySelectorAll("td")[1];
      if (td) {
        const td_text = td.innerText.toLowerCase();
        if (td_text.indexOf(searchfeild) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  order_fetch() {
    this.order.order().subscribe((res) => {
      this.order_data = res;
      this.order_value = this.order_data.data;
      if (this.order_value.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        });
      }
    });
  }
  set_status(id, email) {
    const back = document.querySelector(".order_wrapper");
    back.classList.toggle("back_hide");
    const status = document.querySelector(".status");
    status.classList.toggle("update");
    localStorage.setItem("id", id);
    localStorage.setItem("orderemail", email);
  }

  search_animation() {
    const search = document.querySelector("input");
    search.addEventListener("mouseover", () => {
      search.classList.toggle("search_animation");
    });

    search.addEventListener("mouseleave", () => {
      search.classList.toggle("search_animation");
    });
  }

  sent() {
    const text = this.login.getRawValue();
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("orderemail");
    const data = { text: text, id: id, email: email };
    const div = document.querySelector(".status");
    div.classList.add("blur");
    this.update.update_order(data).subscribe((res) => {
      this.update_res = res;
      if (this.update_res.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Error!...",
          text: "Connection Error....",
          footer: "!",
        });
      } else if (this.update_res.err == 2) {
        Swal.fire({
          icon: "error",
          title: "Error!...",
          text: "Email error....",
          footer: "Accept localstorage",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Status Update....",
          footer: "!",
        }).then(() => {
          const back = document.querySelector(".order_wrapper");
          back.classList.toggle("back_hide");
          const status = document.querySelector(".status");
          status.classList.toggle("update");
          div.classList.remove("blur");
          localStorage.removeItem("id");
          localStorage.removeItem("orderemail");
          this.login.reset();
          location.reload();
        });
      }
    });
  }

  normal() {
    const back = document.querySelector(".order_wrapper");
    back.classList.toggle("back_hide");
    const status = document.querySelector(".status");
    status.classList.toggle("update");
  }

  ngOnInit(): void {
    this.nav();
    this.order_fetch();
    this.search_animation();
    this.login_validate();
  }
  login_validate() {
    this.login = this.fb.group({
      text: ["", [Validators.required]],
    });
  }
}
