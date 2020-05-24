import { Injectable } from '@angular/core';
import { url } from "../manual/url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookRequestService {
  constructor(private http: HttpClient) { }
  booksreq(data) {
    return this.http.post(`${url}/books_req`, data);
  }
}
