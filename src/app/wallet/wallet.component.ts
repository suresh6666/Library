import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public userInfo: any = {};
  public user: any = {};
  constructor(private appService: AppService,
              private router: Router,
              private authService: AuthService,
              private appUrls: AppUrls) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    }
  }

  ngOnInit() {
    this.userInfo = this.authService.getUser();
    this.getUser();
  }
  getUser() {
    this.appService.get(this.appUrls.users + '/' + this.userInfo['_id']).then((data) => {
      this.user = data;
    }).catch((err) => {
      console.log(err);
    });
  }

}
