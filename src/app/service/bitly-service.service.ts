import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitlyServiceService {

  private url = "https://api-ssl.bitly.com/v4/shorten"; //url to bitly web API
  private token = "4afea6c5c158e6095896634d48b963b4244a3b1d"; //TOKEN here

  constructor(private http: HttpClient) { }

  createLink(link : any): Observable<any>
  {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token
    };

    const httpOptions = { headers: new HttpHeaders(headers)};
    console.log("link = "+JSON.stringify(link));
    
    return this.http.post(this.url, link, httpOptions);
  }

}