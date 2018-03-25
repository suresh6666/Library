import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppUrls} from '../shared/app.constants';
import {AppService} from '../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  lForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl()
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
  }
  login(lUser: any, lValid: any) {
    console.log(lUser);
    this.appService.post(this.appUrls.login, lUser).then((data) => {
      console.log(data);
      if (data['data']) {
        this.authService.setToken(data['data']['login_token']);
        localStorage.setItem('email', data['data']['email']);
        this.router.navigate(['profile']);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

}
