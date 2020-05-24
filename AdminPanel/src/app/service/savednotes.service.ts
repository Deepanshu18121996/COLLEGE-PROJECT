import { Injectable } from '@angular/core';
import { url } from "../url/url.js";
import { HttpClient, } from "@angular/common/http";
import { Observable } from "rxjs";
import { jsonresponse } from "../pagemodels/jsonresponse";

@Injectable({
  providedIn: 'root'
})
export class SavednotesService {

  constructor(private http: HttpClient) { }
  savednotes(data) {
    return this.http.post(`${url}/notes_saved`, data);
  }
  deletesavednotes(id) {
    return this.http.get(`${url}/delsavednotes/${id}`);
  }
  fetchsavednotes(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/fetchnotes_saved`);
  }
  fetchnotesByCat(data: any) {
    return this.http.get<jsonresponse>(`${url}/fetchnotes_bycat/${data}`);
  }
}
