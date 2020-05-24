import { Component, OnInit } from "@angular/core";
import { CartItemService } from "../../service/cart-item.service";
@Component({
  selector: "app-head",
  templateUrl: "./head.component.html",
  styleUrls: ["./head.component.css"],
})
export class HeadComponent implements OnInit {
  constructor(private cart: CartItemService) {}
  count;
  cart_res;
  cartitem() {
    const email = localStorage.getItem("email");
    this.cart.get_cart(email).subscribe((res) => {
      this.cart_res = res;
      if (this.cart_res.err == 1) {
      } else {
        this.count = this.cart_res.data.length;
      }
    });
  }
  ngOnInit() {
    this.cartitem();
  }
}
