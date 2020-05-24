import { Component, OnInit } from "@angular/core";
import { GetSellrequestService } from "../../service/get-sellrequest.service";
import { DeleteSellReqService } from "../../service/delete-sell-req.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UpdateSellService } from "../../service/update-sell.service";
import { PaymentmailService } from "../../service/paymentmail.service";
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { from } from "rxjs";
@Component({
  selector: "app-sell-request",
  templateUrl: "./sell-request.component.html",
  styleUrls: ["./sell-request.component.scss"],
})
export class SellRequestComponent implements OnInit {
  constructor(
    private sellrequest: GetSellrequestService,
    private delete_sell: DeleteSellReqService,
    private fb: FormBuilder,
    private updatesell: UpdateSellService,
    private payment: PaymentmailService
  ) {}
  add_books: FormGroup;
  get_req;
  sell_response;
  delete;
  delete_response;
  image;
  email;
  mail;
  update;
  payment_response;

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
      const td = tr[i].querySelectorAll("td")[0];
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

  get_sellRequest() {
    this.sellrequest.sell().subscribe((res) => {
      this.get_req = res;
      if (this.get_req.err == 1) {
      } else {
        this.sell_response = this.get_req.data;
      }
    });
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

  // Delete REq
  Delete(id, email) {
    const data = { id: id, email: email };
    const del = document.querySelector(".order_wrapper");
    del.classList.toggle("cursor");
    this.delete_sell.sell_req_delete(data).subscribe((res) => {
      this.delete = res;
      if (this.delete.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        });
      } else {
        Swal.fire({
          icon: "success",
          text: "Request Deleted....",
          footer: "!",
        }).then(() => {
          del.classList.toggle("cursor");
          location.reload();
        });
      }
    });
  }

  // THis is function is for append value
  Edit(i) {
    const data = this.sell_response[i];
    const section = document.querySelector(".update");
    const div = document.querySelector(".add_books");
    section.classList.toggle("form_align");
    div.classList.toggle("show");
    this.add_books.controls.name.patchValue(this.sell_response[i].name);
    this.add_books.controls.category.patchValue(this.sell_response[i].category);
    this.add_books.controls.price.patchValue(this.sell_response[i].price);
    this.add_books.controls.writer.patchValue(this.sell_response[i].writer);
    this.add_books.controls.edition.patchValue(this.sell_response[i].edition);
    this.add_books.controls.published_year.patchValue(
      this.sell_response[i].published_year
    );
    this.add_books.controls.status.patchValue(this.sell_response[i].status);
    this.email = this.sell_response[i]._id;
    this.image = this.sell_response[i].image;
    this.mail = this.sell_response[i].email;
  }

  // Remove FOrm
  remove() {
    const section = document.querySelector(".update");
    const div = document.querySelector(".add_books");
    section.classList.toggle("form_align");
    div.classList.toggle("show");
  }

  // THis function is for update book
  books() {
    const section = document.querySelector(".update");
    section.classList.add("blur");
    const data = this.add_books.getRawValue();
    const email = this.email;
    const price = data.price;
    let aData = new FormData();
    aData.append("name", data.name);
    aData.append("image", this.image);
    aData.append("category", data.category);
    aData.append("price", data.price);
    aData.append("writer", data.writer);
    aData.append("edition", data.edition);
    aData.append("published_year", data.published_year);
    aData.append("status", data.status);
    this.updatesell.sell_update(data, email, this.image).subscribe((res) => {
      this.update = res;

      if (
        this.update.err == 1 ||
        this.update.err == 2 ||
        this.update.err == 3
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        });
      } else if (this.update.err == "update") {
        Swal.fire({
          icon: "success",
          title: "Update...",
          text: "Book info update....",
          footer: "!",
        }).then(() => {
          location.reload();
          this.remove();
          section.classList.remove("blur");
        });
      } else {
        const paymentprice = Math.floor(0.3 * price);
        const data = { mail: this.mail, price: paymentprice, id: this.email };
        this.payment.subscriber(data).subscribe((res) => {
          this.payment_response = res;
          if (this.payment_response.err == 1) {
            Swal.fire({
              icon: "error",
              title: "Mail not send",
              text: "Some error in mail",
              footer: "!",
            }).then(() => {
              location.reload();
              this.remove();
              section.classList.remove("blur");
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Update",
              text: "Update and Payment complete",
              footer: "!",
            }).then(() => {
              location.reload();
              this.remove();
              section.classList.remove("blur");
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.nav();
    this.get_sellRequest();
    this.search_animation();
    this.books_validate();
  }

  books_validate() {
    this.add_books = this.fb.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      price: ["", Validators.required],
      writer: ["", Validators.required],
      edition: ["", Validators.required],
      published_year: ["", Validators.required],
      status: ["", Validators.required],
    });
  }
}
