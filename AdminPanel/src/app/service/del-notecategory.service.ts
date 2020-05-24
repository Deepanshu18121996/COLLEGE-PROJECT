import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { url } from "../url/url.js";

@Injectable({
  providedIn: 'root'
})
export class DelNotecategoryService {
  constructor(private http: HttpClient) { }
  delnotecategory(data) {
    return this.http.post(`${url}/deletenotes_category`, data);
  }
}
