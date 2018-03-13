import { Component, OnInit, TemplateRef } from '@angular/core';
import 'rxjs/add/observable/of';
import {ActivatedRoute, Router} from '@angular/router';
import {FilterArray} from '../shared/app.pipes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [FilterArray]
})
export class NavbarComponent implements OnInit {
  searchForBook: string;
  constructor(private route: Router) {}

  ngOnInit() {}
  searchBooks(searchText, cat, author) {
    this.route.navigate(['/search'], {queryParams: {q: searchText, author: author, category: cat}});
  }
}
