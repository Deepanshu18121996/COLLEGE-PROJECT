import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AdminLoginService } from "../../service/admin-login.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  response;
  constructor(
    private adminlogin: AdminLoginService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  Login() {
    const data = this.login.getRawValue();
    this.adminlogin.adminlogin(data).subscribe((res) => {
      this.response = res;
      if (this.response.err == "account") {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Email not Found....",
          footer: "You are not admin",
        });
      } else if (this.response.err == "pass") {
        Swal.fire({
          icon: "error",
          title: "Oops!...",
          text: "Password not Match....",
          footer: "Access denied",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success...",
          text: "Login Success",
        }).then(() => {
          this.login.reset();

          this.router.navigate(["/main"]);
          localStorage.setItem("admin_email", this.response.email);
        });
      }
    });
  }

  ngOnInit(): void {
    this.login_validate();
  }

  login_validate() {
    this.login = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }
}
