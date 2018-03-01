import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  categories: any = [
    {url: 'hello', name: 'Fiction'},
    {url: 'hello', name: 'Health Care'},
    {url: 'hello', name: 'Technology'},
    {url: 'hello', name: 'Science'},
    {url: 'hello', name: 'Arts & Science'},
    {url: 'hello', name: 'Domestic'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
