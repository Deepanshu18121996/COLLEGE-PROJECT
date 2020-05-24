import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class DetailsService {
  constructor(private http: HttpClient) {}

  details() {
    return this.http.get(`${url}/getcategory`);
  }
}
