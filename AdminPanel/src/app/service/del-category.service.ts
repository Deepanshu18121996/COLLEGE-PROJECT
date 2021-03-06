import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";

@Injectable({
  providedIn: "root",
})
export class DelCategoryService {
  constructor(private http: HttpClient) {}

  delcategory(data) {
    return this.http.post(`${url}/delete_category`, data);
  }
}
