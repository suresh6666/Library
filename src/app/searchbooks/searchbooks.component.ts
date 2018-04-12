import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppService} from '../shared/app.service';
import {AuthService} from '../shared/auth.service';

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
              private appService: AppService,
              private authService: AuthService,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      const query = '?where=' + JSON.stringify({'book_title': {'$regex': '.' + params['q'] + '.'}});
      this.appService.get(this.appUrls.search_books + query).then((data) => {
        console.log(data);
        this.books = data['_items'];
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  ngOnInit() {}
  requestCopy(id, type) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    } else {
      this.router.navigate(['/checkout/' + id], {queryParams: {type: type}});
    }
  }
}
