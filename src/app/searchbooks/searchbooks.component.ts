import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
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
  public query: any = {page: 1, max_results: 15};
  public searchFilter: any = {authors: {}, stock: true};
  constructor(private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private appUrls: AppUrls,
              private appService: AppService,
              private titleService: Title,
              private _router: Router) {
    this.activatedRoute.queryParams.subscribe(parameters => {
      this.titleService.setTitle('Brand.com: ' + parameters['q'] + ' :Books');
      const where = {}, params = parameters;
      this.query = Object.assign({}, parameters);
      this.query['page'] = (this.query['page']) ? this.query['page'] : 1;
      this.query['max_results'] = (this.query['max_results']) ? this.query['max_results'] : 15;
      if (params['category']) {
        where['book_categories'] = {'$in': [params['category']]};
      }
      if (params['author']) {
        where['book_authors'] = {'$in': [params['author']]}
      }
      const query = (params['q']) ? params['q'] : '';
      where['book_title'] = {$regex: '.*' + query + '.*', '$options': 'i'};
      const myQuery = {where: where, page: parameters['page'], max_results: parameters['max_results']};
      this.appService.get(this.appUrls.search_books, myQuery).then((data: any) => {
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
  navigate() {
    this.query['page'] = Number(this.query['page']) + 1;
    this._router.navigate(['/search'], {queryParams: this.query});
  }
  ngOnInit() {}
  stockChange(value) {
    this.searchFilter['stock'] = value;
  }
  authorChange(author) {
    this.searchFilter['authors'][author] = !this.searchFilter['authors'][author];
  }
}
