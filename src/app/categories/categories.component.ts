import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any = [];
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private titleService: Title) { }

  ngOnInit() {
    this.getCategories();
    this.titleService.setTitle('New categories - Brand.com');
  }
  getSubString(title: string) {
    return title.substr(0, 30) + '...';
  }
  getCategories () {
    const query = {sort: 'category_name'};
    this.appService.get(this.appUrls.categories, query).then((data: any) => {
      console.log(data);
      this.categories = data['_items'];
    }, (err) => {
      console.log(err);
    });
  }

}
