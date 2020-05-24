import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";

@Injectable({
  providedIn: "root",
})
export class GetBooksService {
  constructor(private http: HttpClient) {}

  getbooks(category) {
    return this.http.get(`${url}/get_books_details/${category}`);
  }
}
