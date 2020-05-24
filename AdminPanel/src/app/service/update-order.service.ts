import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class UpdateOrderService {
  constructor(private http: HttpClient) {}

  update_order(data) {
    return this.http.post(`${url}/update_order`, data);
  }
}
