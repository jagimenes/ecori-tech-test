import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { ICharacterDataRequest, IParamsApi } from "../Interfaces/Character"

@Injectable({
  providedIn: "root"
})
export class ListCharacterService {
  private apiUrl = "http://localhost:3000/api/v1/character"
  constructor(private http: HttpClient) { }

  getAll(filterParams: Record<string, any>): Observable<ICharacterDataRequest> {
    let httpParams = {};
    Object.keys(filterParams).forEach(function (key) {
      if (filterParams[key] !== null) {
        httpParams = { ...httpParams, [key]: filterParams[key] }
      }
    });
    return this.http.get<ICharacterDataRequest>(this.apiUrl, { params: httpParams });
  }

  getById(id: number): Observable<ICharacterDataRequest> {
    return this.http.get<ICharacterDataRequest>(`${this.apiUrl}/${id}`);
  }
}
