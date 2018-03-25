import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}
  // Get Method to get the Data from Server
  get(url?: string, data?: any, params?: any): Promise<any> {
    return this.http.get(url).toPromise();
  }
  post(url: string, data: any, params?: any): Promise<any> {
    return this.http.post(url, data).toPromise();
  }
  put(url: string, data: any, params: any): Promise<any> {
    return this.http.put(url, data).toPromise();
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
    setTimeout(function(){ x.className = x.className.replace('show', ''); }, 4000);
  }

}
