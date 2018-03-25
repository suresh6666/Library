import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {AuthService} from '../shared/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  rForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl(),
    c_password: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    mobile_number: new FormControl(),
    gender: new FormControl('male'),
    status: new FormControl('inactive'),
    city: new FormControl(''),
    age: new FormControl(),
    user_level: new FormControl('user')
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router) {}

  ngOnInit() {
  }
  register(user: any) {
    console.log(user);
    user['user_level'] = [user['user_level']];
    delete user['c_password'];
    user = [user];
    this.appService.post(this.appUrls.register, user).then((data) => {
      if (data['data'] && data['data'].length) {
        this.router.navigate(['/welcome']);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

}
