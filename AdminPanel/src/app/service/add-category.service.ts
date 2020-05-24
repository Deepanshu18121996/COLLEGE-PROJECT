import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class AddCategoryService {
  constructor(private http: HttpClient) {}

  addcategory(data) {
    return this.http.post(`${url}/addbookscategory`, data);
  }
}
