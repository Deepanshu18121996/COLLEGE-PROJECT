import { Component, OnInit } from "@angular/core";
import { GetorderService } from "../../service/getorder.service";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  constructor(private order: GetorderService) {}

  getdata;
  data;

  getorder() {
    const email = localStorage.getItem("email");
    this.order.order_req(email).subscribe((res) => {
      this.getdata = res;
      if (this.getdata.err != 0) {
        console.log("something wrong");
      } else {
        this.data = this.getdata.data;
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
