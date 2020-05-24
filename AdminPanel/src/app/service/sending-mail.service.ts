import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";

@Injectable({
  providedIn: "root",
})
export class SendingMailService {
  constructor(private http: HttpClient) {}

  mail(data) {
    return this.http.post(`${url}/mail_send`, data);
  }
}
