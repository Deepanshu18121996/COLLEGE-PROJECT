import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class DeleteSellReqService {
  constructor(private http: HttpClient) {}

  sell_req_delete(data) {
    return this.http.post(`${url}/deletesellreq`, data);
  }
}
