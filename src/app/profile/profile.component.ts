import { Component, OnInit, TemplateRef } from '@angular/core';

import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {NewAddress, User} from '../shared/app.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public gender: any[];
  constructor(private appService: AppService,
              private appUrls: AppUrls) { }

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
    this.appService.get(this.appUrls.categories).subscribe(data => {});
  }
}
