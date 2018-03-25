import { Component, OnInit, AfterViewInit } from '@angular/core';
import 'rxjs/add/observable/of';

import {ActivatedRoute, Router} from '@angular/router';
import {FilterArray} from '../shared/app.pipes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [FilterArray]
})
export class NavbarComponent implements OnInit, AfterViewInit {
  searchForBook: string;
  showVar: boolean;
  constructor(private route: Router) {
    this.route.events.subscribe((val) => {
      // console.log(val);
    });
    this.showVar = false;
  }
  searchBooks(searchText, cat, author) {
    this.route.navigate(['/search'], {queryParams: {q: searchText, author: author, category: cat}});
    this.searchForBook = '';
  }
  ngOnInit() {}
  ngAfterViewInit() {}
}
