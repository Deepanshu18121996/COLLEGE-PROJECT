import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class GetSellOrderService {
  constructor(private http: HttpClient) {}

  sell_order(email) {
    return this.http.get(`${url}/fetch_sell_order/${email}`);
  }
}
