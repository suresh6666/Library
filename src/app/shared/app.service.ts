import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  // Get Method to get the Data from Server
  get(url?: string, data?: any, params?: any) {
    return this.http.get(url);
  }
  post(url: string, data: any, params: any) {
    this.http.post(url, data);
  }
  put(url: string, data: any, params: any) {
    this.http.put(url, data);
  }
  delete(url: string, data: any) {
    this.http.delete(url, data);
  }
}
