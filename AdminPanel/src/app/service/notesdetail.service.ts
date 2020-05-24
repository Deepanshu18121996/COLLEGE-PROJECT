import { Injectable } from '@angular/core';
import { url } from "../url/url.js";
import { HttpClient } from "@angular/common/http";
import { jsonresponse } from "../pagemodels/jsonresponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotesdetailService {
  length: number;
  constructor(private http: HttpClient) { }
  notesdetails(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/getnotescategory`);
  }
}
