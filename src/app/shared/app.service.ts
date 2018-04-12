import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {
  public options: any;
  public parseHeaders: any;
  private Cart = new BehaviorSubject<any>([]);
  cartCast = this.Cart.asObservable();
  constructor(private http: HttpClient) {
    this.options = new Headers({'Content-Type': 'application/json'});
    this.parseHeaders = new HttpHeaders({
      'X-Parse-Application-Id': 'myAppId', 'X-Parse-REST-API-Key': 'hello_master',
      'Content-Type': 'application/json'
    });
  }
  // Get Method to get the Data from Server
  get(url?: string, parameters?: any): Promise<any> {
    return this.http.get(url, parameters).toPromise();
  }
  post(url: string, data: any, noHeaders?: any): Promise<any> {
    this.options = (noHeaders) ? new Headers({'Content-Type': undefined}) : this.options;
    return this.http.post(url, data, this.options).toPromise();
  }
  patch(url: string, data: any, params?: any): Promise<any> {
    return this.http.patch(url, data).toPromise();
  }
  delete(url: string, data: any): Promise<any> {
    return this.http.delete(url, data).toPromise();
  }
  /*
  * Toast messages function
  *
  * */
  toast(titleMessage, bodyMessage, toastType) {
    const x = document.getElementById('toast');
    x.className = (toastType === 's') ? 'show green' : 'show red';
    // set title
    const tTitle = document.getElementById('toast-title'),
      tBody = document.getElementById('toast-body');
    tTitle.innerText = titleMessage;
    tBody.innerText = bodyMessage;
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 5000);
  }
  errorHandling(err) {
    if (err['error'] && err['error']['_error']) {
      const er = err['error']['_error'];
      this.toast(er['message'], 'Status code: ' + er['code'], 'e');
    }
  }
  dateFormat(date) {
    const dt = new Date(date);
    return dt.getFullYear() + '/' + dt.getMonth() + '/' + dt.getDate();
  }
  /*
  * --------------- PARSE API REQUESTS
  * */
  getParse(url) {
    return this.http.get(url, {headers: this.parseHeaders});
  }
  updateCart(value) {
    this.Cart.next(value);
  }
  postParse(url, data) {
    return this.http.post(url, data, {headers: this.parseHeaders});
  }
  deleteParse(url) {
    return this.http.delete(url, {headers: this.parseHeaders});
  }

}
