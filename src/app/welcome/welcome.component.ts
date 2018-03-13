import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  booksList: any = [];
  resourceItems: any = [];
  constructor (private appService: AppService, private appUrls: AppUrls) {}
  ngOnInit () {
    // get the List of categories
    this.appService.get(this.appUrls.categories).subscribe((data) => {
      const items: any = data;
      items.forEach((item, index) => {
        if (index <= 12) {
          this.resourceItems.push(item);
        }
      });
    });
    this.appService.get(this.appUrls.books_list).subscribe((data) => {
      const items: any = data;
      items.forEach((item, index) => {
        if (index <= 9) {
          this.booksList.push(item);
        }
      });
    });
  }
}
