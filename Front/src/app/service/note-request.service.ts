import { Injectable } from "@angular/core";
import { url } from "../manual/url";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class NoteRequestService {
  constructor(private http: HttpClient, ) { }
  notesreq(data) {
    return this.http.post(`${url}/notes_req`, data);
  }
};