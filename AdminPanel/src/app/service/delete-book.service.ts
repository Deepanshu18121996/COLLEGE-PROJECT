import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";

@Injectable({
  providedIn: "root",
})
export class DeleteBookService {
  constructor(private http: HttpClient) {}

  deletebooks(id, category) {
    return this.http.get(`${url}/delete_books_details/${id}/${category}`);
  }
}
