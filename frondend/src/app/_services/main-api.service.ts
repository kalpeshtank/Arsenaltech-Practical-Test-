import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainApiService {

  constructor(private httpClient: HttpClient) { }
  SetDataAPI(Data: any, url: any) {
    if (Data == null) {
      Data = {};
    }
    return this.httpClient.post<any>(environment.APIEndpoint + url, Data);
  }
  getDataAPI(url: any) {
    return this.httpClient.get<any>(environment.APIEndpoint + url);
  }
}
