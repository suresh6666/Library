import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activateemail',
  templateUrl: './activateemail.component.html',
  styleUrls: ['./activateemail.component.css']
})
export class ActivateemailComponent implements OnInit {
  public myParams: any = {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router,
              private aRoute: ActivatedRoute) {
    this.aRoute.params.subscribe((params) => {
      this.myParams = params;
    });
  }

  ngOnInit() {
    this.appService.post(this.appUrls.emailActivation, this.myParams)
      .then((data) => {
        console.log(data);
        this.router.navigate(['/login-now']);
        this.appService.toast('Email is Activated!', 'Please login to continue!', 's');
      }).catch((error) => {
        console.log(error);
        this.appService.toast('Something went wrong!', 'Please try again!', 'e');
    });
  }

}
