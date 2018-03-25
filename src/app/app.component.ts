import {Component, Input, OnInit} from '@angular/core';
import {Router, NavigationEnd, NavigationStart} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  routerSubscription: Subscription;
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {}
    });
  }

  ngOnInit() {}
}
