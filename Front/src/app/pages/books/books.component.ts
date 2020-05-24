import { Component, OnInit } from "@angular/core";
import { DetailsService } from "../../service/details.service";
import { BestSellerService } from "../../service/best-seller.service";
import { Observable } from "rxjs";
import { BooksdetailsService } from "src/app/service/booksdetails.service";
import { map } from "rxjs/operators";
import { jsonresponse } from "src/app/pagemodels/jsonresponse";
import { SaveCartService } from "../../service/save-cart.service";
import { SaveWishlistService } from "../../service/save-wishlist.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.css"],
})
export class BooksComponent implements OnInit {
  book_categories$: Observable<jsonresponse>;
  best_books$: Observable<jsonresponse>;
  wishlist_res;
  cart_res;
  constructor(
    private category_name: DetailsService,
    private best_seller: BestSellerService,
    private bookDetail: BooksdetailsService,
    private savecart: SaveCartService,
    private savewishlist: SaveWishlistService
  ) {}

  books_d$() {
    this.book_categories$ = this.category_name
      .details()
      .pipe(map((x) => x.data));
  }
  best_s$() {
    this.best_books$ = this.best_seller.bestSeller().pipe(map((x) => x.data));
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
    this.books_d$();
    this.best_s$();
    this.book_categories$.subscribe((x) => x);
    this.best_books$.subscribe((x) => x);
  }
  reloadBestCategories(categoryName) {
    this.best_books$ = this.bookDetail
      .bookdetails(categoryName)
      .pipe(map((x) => x.data));
  }
}
