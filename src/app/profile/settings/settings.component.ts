import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {AppService} from '../../shared/app.service';
import {AppUrls} from '../../shared/app.constants';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public user: any;
  public gender: any[];
  public queryParams: {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activateRoute: ActivatedRoute) {
    this.activateRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    this.gender = [{title: 'Male', value: 'male'}, {title: 'Female', value: 'female'}];
    this.user = {
      'user_id': null,
      'user_name': null,
      'is_active': false,
      'picture': null,
      'age': null,
      'first_name': null,
      'last_name': null,
      'gender': this.gender[0],
      'company': null,
      'email': null,
      'phone': null,
      'address': null,
      'about': null,
      'shipping_address': []
    };
  }

}
