import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class GetOrderService {
  constructor(private http: HttpClient) {}

  order() {
    return this.http.get(`${url}/getorder`);
  }
}
