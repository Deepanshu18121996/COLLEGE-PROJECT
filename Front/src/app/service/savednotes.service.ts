import { Injectable } from '@angular/core';
import { url } from "../manual/url";
import { HttpClient, } from "@angular/common/http";
import { jsonresponse } from "../pagemodels/jsonresponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SavednotesService {
  constructor(private http: HttpClient) { }
  deletesavednotes(id) {
    return this.http.get(`${url}/delsavednotes/${id}`);
  }
  fetchsavednotes(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/fetchnotes_saved`);
  }
  fetchnotesByCat(data: any) {
    return this.http.get<jsonresponse>(`${url}/fetchnotes_bycat/${data}`);
  }
  downloadFile(data) {
    return this.http.get(`${url}/download/${data}`, { responseType: 'blob' }
    );
  }
}
