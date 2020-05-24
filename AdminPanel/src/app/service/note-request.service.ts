import { Injectable } from '@angular/core';
import { url } from "../url/url.js";
import { HttpClient } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class NoteRequestService {
  constructor(private http: HttpClient, ) { }

  notesreq(data) {
    return this.http.post(`${url}/notes_req`, data);
  }
  fetchnotesreq() {
    return this.http.get(`${url}/fetchnotes_req`);
  }
  deletenotes(id, email) {
    return this.http.get(`${url}/delnotes/${id}/${email}`);
  }
  fetchnotebyid(id) {
    return this.http.get(`${url}/getnotebyid/${id}`);
  }

  editnotes(id, data) {
    return this.http.post(`${url}/editnotes/${id}`, data);
  }
}
