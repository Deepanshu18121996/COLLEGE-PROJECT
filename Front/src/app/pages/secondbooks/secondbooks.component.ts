import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { SaveSecondBooksService } from "src/app/service/save-second-books.service";
import { SecondbookcatService } from "src/app/service/secondbookcat.service";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";
import { SaveCartService } from "../../service/save-cart.service";
import { SaveWishlistService } from "../../service/save-wishlist.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-secondbooks",
  templateUrl: "./secondbooks.component.html",
  styleUrls: ["./secondbooks.component.css"],
})
export class SecondbooksComponent implements OnInit {
  second_category$: Observable<jsonresponse>;
  second_book$: Observable<jsonresponse>;
  wishlist_res;
  cart_res;
  constructor(
    private saveSecond: SaveSecondBooksService,
    private secondcat: SecondbookcatService,
    private savecart: SaveCartService,
    private savewishlist: SaveWishlistService
  ) {}
  secondcat$() {
    this.second_category$ = this.secondcat
      .secondbookcat()
      .pipe(map((x) => x.data));
  }

  fetchsecond$() {
    this.second_book$ = this.saveSecond
      .fetchsecondbook()
      .pipe(map((x) => x.data));
  }

  cart(name, price, writer, image) {
    const data = {
      name: name,
      price: price,
      writer: writer,
      image: image,
      quantity: 1,
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
    };
    this.savecart.cart(data).subscribe((res) => {
      this.cart_res = res;
      if (this.cart_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Already In Cart",
          icon: "error",
          footer: "!",
        });
      } else if (this.cart_res.err == "token_error") {
        Swal.fire({
          text: "Please Login",
          icon: "error",
          footer: "!",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Book Added",
          icon: "success",
          footer: "!",
        });
      }
    });
  }

  wishlist(name, price, writer, image) {
    const data = {
      name: name,
      price: price,
      writer: writer,
      image: image,
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
    };
    this.savewishlist.wishlist(data).subscribe((res) => {
      this.wishlist_res = res;
      if (this.wishlist_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Login",
          icon: "error",
          footer: "!",
        });
      } else if (this.wishlist_res.err == 2) {
        Swal.fire({
          title: "Error",
          text: "Already In WishList",
          icon: "error",
          footer: "!",
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Book Added",
          icon: "success",
          footer: "!",
        });
      }
    });
  }

  quickview(name, price, currentprice, image, writer, edition, publishedyear) {}

  ngOnInit() {
    this.secondcat$();
    this.fetchsecond$();
    this.second_category$.subscribe((x) => x);
    this.second_book$.subscribe((x) => x);
  }
  reloadSecondCategories(category) {
    this.second_book$ = this.secondcat
      .fetchbycat(category)
      .pipe(map((x) => x.data));
  }
}
