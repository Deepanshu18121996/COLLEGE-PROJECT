import { Component, OnInit } from "@angular/core";
import { GetUserService } from "../../service/get-user.service";
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  constructor(private data: GetUserService) {}

  response;
  name;
  email;
  address;
  contact;
  pincode;
  state;

  getdata() {
    const email = localStorage.getItem("email");
    this.data.get_user(email).subscribe((res) => {
      this.response = res;
      this.name = this.response.data[0].name;
      this.email = this.response.data[0].email;
      this.address = this.response.data[0].address;
      this.contact = this.response.data[0].contact;
      this.pincode = this.response.data[0].pincode;
      this.state = this.response.data[0].state;
    });
  }

  ngOnInit() {
    this.getdata();
  }
}
