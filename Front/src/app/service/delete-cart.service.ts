import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class DeleteCartService {
  constructor(private http: HttpClient) {}

  delete_cart(id) {
    return this.http.get(`${url}/remove_item__user/${id}`);
  }
}
