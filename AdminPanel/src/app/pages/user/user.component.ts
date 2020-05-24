import { Component, OnInit } from "@angular/core";
import { GetUserService } from "../../service/get-user.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { SendingMailService } from "src/app/service/sending-mail.service";
import { Router } from "@angular/router";
import { DeleteUserService } from "../../service/delete-user.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent implements OnInit {
  login: FormGroup;
  user_data;
  user_details;
  user_email;
  mail;
  mail_response;
  delete_res;
  constructor(
    private get_user: GetUserService,
    private fb: FormBuilder,
    private send_mail: SendingMailService,
    private router: Router,
    private del_user: DeleteUserService
  ) {}

  nav() {
    const hambarger = document.querySelector(".hambarger");
    const aside = document.querySelector(".aside");
    const header = document.querySelector(".header");
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
      const user = document.querySelector(".user");
      user.classList.toggle("table_move");
    });
  }

  get_user_data() {
    this.get_user.user_data().subscribe((res) => {
      this.user_data = res;
      if (this.user_data.err == 1) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        }).then(() => {
          this.router.navigate(["/main"]).then(() => {
            location.reload();
          });
        });
      } else if (this.user_data == 2) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Account Table Empty....",
          footer: "!",
        }).then(() => {
          this.router.navigate(["/main"]).then(() => {
            location.reload();
          });
        });
      } else {
        this.user_details = this.user_data.data;
      }
    });
  }

  email(email) {
    this.user_email = email;
    const email_pos = document.querySelector(".email_send");
    const section = document.querySelector(".user_wrapper");
    email_pos.classList.toggle("email_move");
    section.classList.toggle("section_blur");
  }

  div_move() {
    const cross = document.querySelector(".email_send>img");
    const email_pos = document.querySelector(".email_send");
    const section = document.querySelector(".user_wrapper");
    cross.addEventListener("click", () => {
      email_pos.classList.toggle("email_move");
      section.classList.toggle("section_blur");
    });
  }

  delete_user(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        this.del_user.deleteuser(id).subscribe((res) => {
          this.delete_res = res;
          if (this.delete_res.err == 1) {
            Swal.fire({
              icon: "error",
              title: "Oops!...",
              text: "Account alredy delete....",
              footer: "Refresh",
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Deleted",
              text: "Account Deleted....",
              footer: "!",
            }).then(() => {
              location.reload();
            });
          }
        });
      }
    });
  }

  sent() {
    const email_pos = document.querySelector(".email_send");
    email_pos.classList.add("blur");
    const section = document.querySelector(".user_wrapper");
    const text = this.login.getRawValue();
    const value = text.text;
    const data = { email: this.user_email, text: value };
    this.send_mail.mail(data).subscribe((res) => {
      this.mail_response = res;
      if (this.mail_response.err != 0) {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "SomeThing Wrong....",
          footer: "!",
        }).then(() => {
          email_pos.classList.toggle("email_move");
          email_pos.classList.remove("blur");
          section.classList.toggle("section_blur");
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Mail sent",
          footer: `${this.user_email}`,
        }).then(() => {
          email_pos.classList.toggle("email_move");
          section.classList.toggle("section_blur");
          email_pos.classList.remove("blur");
          this.login.reset();
        });
      }
    });
  }

  ngOnInit(): void {
    this.login_validate();
    this.nav();
    this.get_user_data();
    this.div_move();
  }

  login_validate() {
    this.login = this.fb.group({
      text: ["", [Validators.required]],
    });
  }
}
