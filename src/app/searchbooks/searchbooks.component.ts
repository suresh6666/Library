import { Component, OnInit } from '@angular/core';
import { Lease } from '../shared/app.constants';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {
  public books = [];
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        console.log(params);
      });
    const obj = {
      'book_id': '',
      'title': 'This is my Book title!',
      'book_summary': 'Hello, this is the description',
      'url': '',
      'keywords': [],
      'number_of_pages': 300,
      'author': 'Kv, Mahadevan',
      'lease_price': 300,
      'availability': true,
      'delivery_time': '3 - 5 Days',
      'book_image': 'http://html.crunchpress.com/book-store/images/image41.jpg',
      'material_group': '',
      'language': 'English, Hindi',
      'publisher': 'Escorts',
      'year': '2018',
      'isbn': '12838021838',
      'ibcn': '39217362131238',
      'book_author_desc': 'This is my Author description!'
    };
    this.books = [obj, obj, obj];
    this.books.forEach(function (item) {
      item['reading_fee'] = (Lease.percentage / 100) * item.lease_price;
    });
  }

}
