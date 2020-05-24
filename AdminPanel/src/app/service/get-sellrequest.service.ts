import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class GetSellrequestService {
  constructor(private http: HttpClient) {}

  sell() {
    return this.http.get(`${url}/getsellreq`);
  }
}
