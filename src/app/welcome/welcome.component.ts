import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import * as Parse from 'parse';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  booksList: any = [];
  categories: any = [];
  constructor (private appService: AppService, private appUrls: AppUrls) {}
  ngOnInit () {
    const query = {sort: '-_updated', max_results: 9};
    this.appService.get(this.appUrls.books_list, query).then((data: any) => {
      console.log(data);
      const items: any = data['_items'];
      items.forEach((item, index) => {
        item['image_thumbnail'] = this.appService.checkHttps(item['image_thumbnail']);
        item['image_small_thumbnail'] = this.appService.checkHttps(item['image_small_thumbnail']);
        item['book_url'] = item['book_title'].replace(/\//g, '').replace(/ /g, '-');
        this.booksList.push(item);
      });
    }, (err) => {});
    this.getCategories();
  }
  getSubString(title: string) {
    return title.substr(0, 30) + '...';
  }
  getCategories() {
    const query = {sort: 'category_name', max_results: 12};
    this.appService.get(this.appUrls.categories, query)
      .then((data) => {
        this.categories = data['_items'];
      })
  }
}
