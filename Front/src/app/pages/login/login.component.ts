import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmPasswordValidator } from "../../validators";
import { LoginService } from "../../service/login.service";
import { RegisterService } from "../../service/register.service";
import { CreateUserService } from "../../service/create-user.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  registation: FormGroup;
  login: FormGroup;
  pinform: FormGroup;
  register_res;
  pin;
  index = 0;
  form_data;
  create_res;
  login_res;
  constructor(
    private fb: FormBuilder,
    private log: LoginService,
    private reg: RegisterService,
    private cre: CreateUserService,
    private router: Router
  ) {}

  Login() {
    const data = this.login.getRawValue();
    const section = document.querySelector(".login_page");
    section.classList.add("blur");
    this.log.Login(data).subscribe((res) => {
      this.login_res = res;
      if (this.login_res.err == "404") {
        Swal.fire({
          title: "Error",
          text: "Account Not Found",
          icon: "error",
          footer: "Incorrect Email",
        }).then(() => {
          section.classList.remove("blur");
        });
      } else if (this.login_res.err == "notmatch") {
        Swal.fire({
          title: "Error",
          text: "Password Not Match",
          icon: "error",
          footer: "Retry",
        }).then(() => {
          section.classList.remove("blur");
        });
      } else {
        localStorage.setItem("token", this.login_res.token);
        localStorage.setItem("email", this.login_res.email);
        Swal.fire({
          title: "Success",
          text: "Login",
          icon: "success",
          footer: "Welcome",
        }).then(() => {
          this.router.navigate(["/home"]);
          section.classList.remove("blur");
        });
      }
    });
  }

  // This function is for get user info and send a mail
  Register() {
    this.form_data = this.registation.getRawValue();
    const section = document.querySelector(".login_page");
    section.classList.add("blur");
    this.reg.Register_acc(this.form_data).subscribe((res) => {
      this.register_res = res;
      if (this.register_res.err == 1) {
        Swal.fire({
          title: "Error",
          text: "Account All Ready Found",
          icon: "error",
          footer: "Retry",
        }).then(() => {
          this.registation.reset();
          section.classList.remove("blur");
        });
      } else if (this.register_res.err == 2) {
        Swal.fire({
          title: "Error",
          text: "Not a valid Email",
          icon: "error",
          footer: "Retry",
        }).then(() => {
          section.classList.remove("blur");
        });
      } else {
        this.pin = this.register_res.pin;
        const box = document.querySelector("#otp");
        box.classList.toggle("box_show");
        const section = document.querySelector("#login_page");
        section.classList.toggle("login_hide");
        section.classList.remove("blur");
      }
    });
  }
  // This function is for check otp and save data in database
  show_otp() {
    const data = this.pinform.getRawValue();

    if (this.pin == data.email) {
      this.cre.create(this.form_data).subscribe((res) => {
        this.create_res = res;
        if (this.create_res.err == "db") {
          Swal.fire({
            title: "Error",
            text: "Connection Error",
            icon: "error",
            footer: "Retry",
          });
        } else if (this.create_res.err == "jwt") {
          Swal.fire({
            title: "Error",
            text: "Some Error",
            icon: "error",
            footer: "Retry",
          });
        } else {
          const token = this.create_res.token;
          const email = this.create_res.email;
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          Swal.fire({
            title: "Welcome",
            text: "Account Created",
            icon: "success",
            footer: "Now Login to your account",
          }).then(() => {
            const box = document.querySelector("#otp");
            box.classList.toggle("box_show");
            const section = document.querySelector("#login_page");
            section.classList.toggle("login_hide");
            this.registation.reset();
            this.router.navigate(["/home"]);
          });
        }
      });
    } else {
      if (this.index < 3) {
        Swal.fire({
          title: "Not Match",
          text: "Are you sure?",
          icon: "warning",
          footer: "Retry",
        }).then(() => {
          this.index++;
        });
      } else {
        Swal.fire({
          title: "Not Match",
          text: "Otp Expire",
          icon: "warning",
          footer: "!",
        }).then(() => {
          this.index = 0;
          this.pinform.reset();
          const box = document.querySelector("#otp");
          box.classList.toggle("box_show");
          const section = document.querySelector("#login_page");
          section.classList.toggle("login_hide");
        });
      }
    }
  }
  // Check if already login or not
  check() {
    const email = localStorage.getItem("email");
    if (email != null) {
      Swal.fire({
        title: "Already Logged In",
        text: "Your account is already Logged In",
        icon: "warning",
        footer: "Logout First",
      }).then(() => {
        this.router.navigate(["/"]);
      });
    }
  }

  ngOnInit() {
    this.validate();
    this.login_validate();
    this.otp();
    this.check();
    const img = document.querySelector("#otp>img");
    img.addEventListener("click", () => {
      const box = document.querySelector("#otp");
      box.classList.toggle("box_show");
      const section = document.querySelector("#login_page");
      section.classList.toggle("login_hide");
    });
  }
  // THis is validation
  // Register
  validate() {
    this.registation = this.fb.group(
      {
        name: ["", [Validators.required]],
        password: ["", [Validators.required, Validators.minLength(8)]],
        confirm_password: ["", [Validators.required]],
        email: ["", [Validators.required]],
        contact: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.pattern("[0-9]*"),
          ],
        ],
        address: ["", [Validators.required]],
        pincode: ["", [Validators.required, Validators.pattern("[0-9]*")]],
        state: ["", [Validators.required, Validators.pattern("[a-zA-Z_ ]*")]],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword, // custom validation
      }
    );
  }

  // Login validation
  login_validate() {
    this.login = this.fb.group({
      password: ["", Validators.required],
      contact: ["", [Validators.required]],
      email: ["", [Validators.required]],
    });
  }

  // Opt validation
  otp() {
    this.pinform = this.fb.group({
      email: ["", Validators.required],
    });
  }
}
