import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
@Injectable({
  providedIn: "root",
})
export class GetSelluserService {
  constructor(private http: HttpClient) {}
  create(data) {
    return this.http.get(`${url}/getselluser/${data}`);
  }
}
