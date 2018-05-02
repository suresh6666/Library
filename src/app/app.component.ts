import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationStart} from '@angular/router';
import 'rxjs/add/operator/pairwise';
import { Subscription } from 'rxjs/Subscription';
import {HttpErrorResponse} from '@angular/common/http';
import {AppService} from './shared/app.service';
import {AuthService} from './shared/auth.service';
import {AppUrls} from './shared/app.constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routerSubscription: Subscription;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.router.events.filter(event => event instanceof NavigationStart).pairwise().subscribe((e) => {
      // console.log(e[0]['url']);
      window.scrollTo(0, 0);
    });
  }

  ngOnInit() {}
}
