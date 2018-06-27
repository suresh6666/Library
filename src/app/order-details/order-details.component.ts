import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  urlParams: any = {};
  public myOrder: any = {};
  constructor(private activatedRoute: ActivatedRoute,
              public appService: AppService,
              private appUrls: AppUrls) {
    this.activatedRoute.params.subscribe((params) => {
      this.urlParams = params;
    });
  }
  ngOnInit() {
    this.getOrder();
    this.appService.updateCart([]);
  }
  getOrder() {
    const embedded = JSON.stringify({'books.book_id': 1});
    const query = '/' + this.urlParams['order_id'] + '?embedded=' + embedded;
    this.appService.get(this.appUrls.orders + query).then((data) => {
      console.log(data);
      this.myOrder = data;
    }).catch((err) => {
      console.log(err);
    });
  }

}
