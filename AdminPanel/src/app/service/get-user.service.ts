import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  user_data() {
    return this.http.get(`${url}/get_all_user`);
  }
}
