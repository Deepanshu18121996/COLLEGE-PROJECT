import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  get_user(id) {
    return this.http.get(`${url}/user_info/${id}`);
  }
}
