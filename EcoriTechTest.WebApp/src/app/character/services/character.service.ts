import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { CharacterDataContainer } from '../models/dto/character-data-container';

@Injectable({
  providedIn: 'root'
})

export class CharacterService {
  baseUrl = "https:localhost:7098";
  serviceUrl = `${this.baseUrl}/Character`;
  constructor(private http: HttpClient) { }

  GetWithFilter(filter: string): Observable<CharacterDataContainer> {
    let url = this.serviceUrl;
    if (filter)
      url += "?" + filter;

    return this.http.get<CharacterDataContainer>(url);
  }

  Get(id: number): Observable<Character> {
    return this.http.get<Character>(this.serviceUrl+"/"+ id);
  }
}
