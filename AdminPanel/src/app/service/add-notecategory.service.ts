import { Injectable } from '@angular/core';
import { url } from "../url/url.js";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddNotecategoryService {
  constructor(private http: HttpClient) { }
  addnotecategory(data) {
    return this.http.post(`${url}/addnotescategory`, data);
  }
}
