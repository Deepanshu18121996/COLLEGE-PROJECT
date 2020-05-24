import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  deleteuser(id) {
    return this.http.get(`${url}/delete_user/${id}`);
  }
}
