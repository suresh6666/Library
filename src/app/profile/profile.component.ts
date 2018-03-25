import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private appService: AppService,
              private router: Router,
              private appUrls: AppUrls) {}
  ngOnInit() {
    this.appService.get(this.appUrls.me).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}
