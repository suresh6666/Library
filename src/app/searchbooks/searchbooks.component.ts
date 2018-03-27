import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Params} from '@angular/router';
import {AppService} from '../shared/app.service';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  public books = [];
  public queryParams: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private appUrls: AppUrls,
              private appService: AppService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    this.appService.get(this.appUrls.search_books, this.queryParams).then((data) => {
      console.log(data);
      this.books = data['_items'];
    }).catch((err) => {
      console.log(err);
    });
  }

}
