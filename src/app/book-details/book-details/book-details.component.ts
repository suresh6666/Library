import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {AppService} from '../../shared/app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookParams: any = {};
  details: any = {};
  categories: any = [
    {url: 'hello', name: 'Fiction'},
    {url: 'hello', name: 'Health Care'},
    {url: 'hello', name: 'Technology'},
    {url: 'hello', name: 'Science'},
    {url: 'hello', name: 'Arts & Science'},
    {url: 'hello', name: 'Domestic'}
  ];
  constructor(private appUrls: AppUrls,
              private appService: AppService,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.bookParams = {book_name: params['book_name'], isbn: params['isbn']}
    })
  }

  ngOnInit() {
    this.getBookDetails();
  }
  getBookDetails() {
    const url = this.appUrls.book_details + JSON.stringify({'ISBN_13': this.bookParams['isbn']});
    this.appService.get(url).then((data) => {
      console.log('details ---- ', data['_items']);
      if (data['_items'].length) {
        this.details = data['_items'][0];
      }
    }).catch((err) => {
      console.log(err);
    });
  }

}
