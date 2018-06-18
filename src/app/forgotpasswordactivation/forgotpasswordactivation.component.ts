import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-forgotpasswordactivation',
  templateUrl: './forgotpasswordactivation.component.html',
  styleUrls: ['./forgotpasswordactivation.component.css']
})
export class ForgotpasswordactivationComponent implements OnInit {
  public myParams: any = {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.aRoute.params.subscribe((params) => {
      this.myParams = Object.assign({}, params);
    });
  }
  ngOnInit() {}
  changePassword(obj: any) {
    this.myParams['new_password'] = obj['new_password'];
    this.appService.post(this.appUrls.change_password, this.myParams).then((data) => {
      console.log(data);
      this.appService.toast('Password has been changed Successfully', 'Please login to continue!', 's');
      this.router.navigate(['/login-now']);
    }).catch((err) => {
      console.log(err);
    });
  }

}
