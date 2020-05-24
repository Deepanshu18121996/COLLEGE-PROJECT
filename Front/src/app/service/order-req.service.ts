import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class OrderReqService {
  constructor(private http: HttpClient) {}

  order_req(email, data) {
    return this.http.post(`${url}/get_order/${email}`, data);
  }
}
