import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class GetorderService {
  constructor(private http: HttpClient) {}

  order_req(email) {
    return this.http.get(`${url}/fetch_order/${email}`);
  }
}
