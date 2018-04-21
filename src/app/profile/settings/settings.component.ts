import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppService} from '../../shared/app.service';
import {AppUrls} from '../../shared/app.constants';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public registeredOn: any;
  public user: any;
  public gender: any[];
  public queryParams: {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activateRoute: ActivatedRoute,
              private authService: AuthService) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    this.gender = [{title: 'Male', value: 'male'}, {title: 'Female', value: 'female'}];
    this.user = {
      '_id': null,
      'is_active': false,
      'picture': null,
      'age': null,
      'first_name': null,
      'last_name': null,
      'gender': this.gender[0],
      'company': null,
      'email': null,
      'mobile_number': null,
    };
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      const token = this.authService.getToken('access_token');
      this.appService.get(this.appUrls.me, {login_token: token}).then((data) => {
        console.log(data);
        this.user = data['data'];
        const date = new Date(data['data']['created_date']);
        this.registeredOn = date;
      }).catch((err: HttpErrorResponse) => {
        console.log(err);
        this.appService.errorHandling(err);
      });
    }
  }
  update(user) {
    this.appService.patch(this.appUrls.me, user).then((data) => {
      console.log(data);
      this.appService.toast(user['email'], 'Successfully Updated!', 's');
    }).catch((err) => {
      console.log('Error', err);
      this.appService.toast(user['email'], 'Something went wrong!', 'e');
    });
  }

}
