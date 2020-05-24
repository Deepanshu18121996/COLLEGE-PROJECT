import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class AdminLoginService {
  constructor(private http: HttpClient) {}

  adminlogin(data) {
    return this.http.post(`${url}/admin_login`, data);
  }
}
