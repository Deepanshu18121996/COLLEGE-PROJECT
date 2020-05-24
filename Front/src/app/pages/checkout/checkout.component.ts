import { Component, OnInit } from "@angular/core";
import { GetUserService } from "../../service/get-user.service";
import { OrderReqService } from "../../service/order-req.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ClearcartService } from "../../service/clearcart.service";
@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
  grandtotal;
  subtotal;
  gst;
  order;
  user_data;
  user_details;
  order_res;
  cleandata;
  constructor(
    private user_info: GetUserService,

    private order_ser: OrderReqService,
    private clean: ClearcartService,
    private router: Router
  ) {}

  create_order() {
    const data = JSON.parse(localStorage.getItem("data"));
    this.order = data.order;
    this.gst = data.gst;
    this.subtotal = data.sub_total;
    this.grandtotal = data.grandtotal;
  }

  user() {
    const email = localStorage.getItem("email");
    this.user_info.get_user(email).subscribe((res) => {
      this.user_details = res;
      this.user_data = this.user_details.data;
    });
  }

  do_order() {
    const data = JSON.parse(localStorage.getItem("data"));
    const email = localStorage.getItem("email");
    this.order_ser.order_req(email, data).subscribe((res) => {
      this.order_res = res;
      if (this.order_res.err == 1) {
        Swal.fire({
          icon: "error",
          text: "Connection Error....",
          footer: "Try Again",
        });
      } else {
        this.clearcart();
      }
    });
  }

  clearcart() {
    const email = localStorage.getItem("email");
    this.clean.get_cart(email).subscribe((res) => {
      this.cleandata = res;
      if (this.cleandata.err == 1) {
        Swal.fire({
          icon: "error",
          text: "Connection Error....",
          footer: "Try Again",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Order Placed....",
          footer: "Clear Cart",
        }).then(() => {
          localStorage.removeItem("data");
          this.router.navigate(["/"]);
        });
      }
    });
  }

  ngOnInit() {
    this.create_order();
    this.user();
  }
}
