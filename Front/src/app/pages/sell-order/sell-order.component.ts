import { Component, OnInit } from "@angular/core";
import { GetSellOrderService } from "../../service/get-sell-order.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "app-sell-order",
  templateUrl: "./sell-order.component.html",
  styleUrls: ["./sell-order.component.css"],
})
export class SellOrderComponent implements OnInit {
  constructor(private sellorder: GetSellOrderService, private router: Router) {}
  order;
  order_response;
  getorder() {
    const email = localStorage.getItem("email");
    this.sellorder.sell_order(email).subscribe((res) => {
      this.order_response = res;
      this.order = this.order_response.data;
      if (this.order_response.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Empty Order",
          icon: "error",
          footer: "Sell Some Book",
        }).then(() => {
          this.router.navigate(["/myacc"]);
        });
      } else {
        setTimeout(() => {
          this.statuscolor();
        }, 500);
      }
    });
  }

  statuscolor() {
    const td = document.querySelectorAll(".status");
    td.forEach((e) => {
      const text = e.innerHTML;
      if (e.innerHTML === "confirm") {
        e.classList.add("green");
      } else {
        e.classList.add("red");
      }
    });
  }

  ngOnInit() {
    this.getorder();
  }
}
