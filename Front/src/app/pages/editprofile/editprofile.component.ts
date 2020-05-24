import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GetUserService } from "../../service/get-user.service";
import { UpdateUserService } from "../../service/update-user.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-editprofile",
  templateUrl: "./editprofile.component.html",
  styleUrls: ["./editprofile.component.css"],
})
export class EditprofileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private data: GetUserService,
    private usr: UpdateUserService
  ) {}
  update_form: FormGroup;
  user_data;
  user;
  update_data;
  update() {
    const section = document.querySelector("section");
    section.classList.toggle("blur");
    const data = this.update_form.getRawValue();
    const newdata = { data: data, email: localStorage.getItem("email") };
    this.usr.user_update(newdata).subscribe((res) => {
      this.update_data = res;
      if (this.update_data.err == 1) {
        //  console.log('something Wrong')
      } else {
        Swal.fire({
          title: "Success",
          text: "Update",
          icon: "success",
          footer: "Profile Update",
        }).then(() => {
          section.classList.toggle("blur");
        });
      }
    });
  }

  getdata() {
    const email = localStorage.getItem("email");
    this.data.get_user(email).subscribe((res) => {
      this.user_data = res;
      this.user = this.user_data.data;
      this.update_form.controls.name.patchValue(this.user[0].name);
      this.update_form.controls.contact.patchValue(this.user[0].contact);
      this.update_form.controls.pincode.patchValue(this.user[0].pincode);
      this.update_form.controls.address.patchValue(this.user[0].address);
      this.update_form.controls.state.patchValue(this.user[0].state);
    });
  }

  ngOnInit() {
    this.update_validate();
    this.getdata();
  }

  update_validate() {
    this.update_form = this.fb.group({
      name: ["", [Validators.required]],
      contact: ["", [Validators.required]],
      pincode: ["", [Validators.required]],
      state: ["", [Validators.required]],
      address: ["", [Validators.required]],
    });
  }
}
