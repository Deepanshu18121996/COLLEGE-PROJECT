import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";
@Injectable({
  providedIn: "root",
})
export class SubscriberMailService {
  constructor(private http: HttpClient) {}

  subscriber(data) {
    return this.http.post(`${url}/subscriber`, data);
  }
}
