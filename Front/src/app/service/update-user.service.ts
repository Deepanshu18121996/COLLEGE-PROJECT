import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class UpdateUserService {
  constructor(private http: HttpClient) {}

  user_update(data) {
    return this.http.post(`${url}/user_update_data`, data);
  }
}
