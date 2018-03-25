import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  fForm = new FormGroup({
    email: new FormControl('')
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router) {}

  ngOnInit() {
  }
  forgotPassword(formData, formValid) {
    this.appService.post(this.appUrls.sendForgotPasswordLink, formData).then((data) => {
      console.log(data);
      if (data['data']) {
        const title = formData['email'],
          message = 'Forgot password link has been sent';
        this.appService.toast(title, message, 's');
        this.router.navigate(['/welcome']);
      }
    }).catch((err) => {
      console.log(err);
    });
  }

}
