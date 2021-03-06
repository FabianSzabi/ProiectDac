import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiURL = "https://reqres.in/api";

  constructor(
    private http: HttpClient
  ) { }

  post(path, body={}, params={}){
    return this.http.post(`${this.apiURL}${path}`, body, {params});
  }

  get(path, params={}){
    return this.http.get(`${this.apiURL}${path}`, {params});
  }
}
