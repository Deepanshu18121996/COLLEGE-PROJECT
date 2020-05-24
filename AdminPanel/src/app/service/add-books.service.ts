import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class AddBooksService {
  constructor(private http: HttpClient) {}

  add_new_books(data) {
    return this.http.post(`${url}/new_books_save`, data);
  }
}
