import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
import { jsonresponse } from "../pagemodels/jsonresponse";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SaveSecondBooksService {

  constructor(private http: HttpClient) { }
  save(data) {
    return this.http.post(`${url}/save_second_book`, data);
  }
  fetchsecondbook(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/getsecondbook`);
  }


}
