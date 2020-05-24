import { Injectable } from '@angular/core';
import { url } from "../url/url.js";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookRequestService {

  constructor(private http: HttpClient) { }
  fetchbooksreq() {
    return this.http.get(`${url}/fetchbooks_req`);
  }
  deletebooksreq(id, email) {
    return this.http.get(`${url}/delbooksreq/${id}/${email}`);
  }
}