import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../shared/app.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  public books = [];
  public filter: any = {
    book_authors: []
  };
  public searchFilter: any = {authors: {}, stock: true};
  constructor(private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private appUrls: AppUrls,
              private appService: AppService,
              private titleService: Title) {
    this.activatedRoute.queryParams.subscribe(parameters => {
      this.titleService.setTitle('Brand.com: ' + parameters['q'] + ' :Books');
      const where = {}, params = parameters;
      if (params['category']) {
        where['book_categories'] = {'$in': [params['category']]};
      }
      if (params['author']) {
        where['book_authors'] = {'$in': [params['author']]}
      }
      const query = (params['q']) ? params['q'] : '';
      where['book_title'] = {$regex: '.*' + query + '.*', '$options': 'i'};
      const myQuery = {
        where: where
      };
      this.appService.get(this.appUrls.search_books, myQuery).then((data: any) => {
        this.books = [];
        this.filter = {book_authors: []};
        this.searchFilter = {authors: {}, stock: true};
        const items = data['_items'];
        items.forEach((book) => {
          book['image_thumbnail'] = this.appService.checkHttps(book['image_thumbnail']);
          book['image_small_thumbnail'] = this.appService.checkHttps(book['image_small_thumbnail']);
          book['book_url'] = book['book_title'].replace(/\//g, '').replace(/ /g, '-');
          this.books.push(book);

          // Get list of Unique categories for filter purpose
          book['book_authors'].forEach((author) => {
            if (this.filter['book_authors'].indexOf(author) === -1) {
              this.searchFilter['authors'][author] = false;
              this.filter['book_authors'].push(author);
            }
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ngOnInit() {}
  stockChange(value) {
    this.searchFilter['stock'] = value;
  }
  authorChange(author) {
    this.searchFilter['authors'][author] = !this.searchFilter['authors'][author];
  }
}
