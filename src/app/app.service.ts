import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public _http: HttpClient) { }

  public searchMovie(movieName: string): Observable<any> {
   return this._http.get(`https://www.omdbapi.com/?apikey=41404d4b&s=${movieName}`)      
  }
}
