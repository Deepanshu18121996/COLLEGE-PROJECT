import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class UpdateSellService {
  constructor(private http: HttpClient) {}

  sell_update(data, id, image) {
    return this.http.post(`${url}/updatesell/${id}/${image}`, data);
  }
}
