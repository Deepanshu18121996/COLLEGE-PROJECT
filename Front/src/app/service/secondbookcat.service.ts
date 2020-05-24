import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { url } from "../manual/url";
import { jsonresponse } from "../pagemodels/jsonresponse";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class SecondbookcatService {
  length: number;
  constructor(private http: HttpClient) { }
  secondbookcat(): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/getsecondcategory`)
  }
  fetchbycat(category): Observable<jsonresponse> {
    return this.http.get<jsonresponse>(`${url}/fetchsecondbook/${category}`);
  }
}


