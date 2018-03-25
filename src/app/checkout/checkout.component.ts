import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public book_id: string;
  public toggle: any = {address: true, payment: false};
  public newAddress: any = {clicked: false};
  public details: any = {};
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.book_id = params['book_id'];
    });
  }

  ngOnInit() {
    // get book Details
    this.appService.get(this.appUrls.baseUrl + 'books/' + this.book_id).then((data: any) => {
      console.log(data);
      this.details = data;
      this.details['reading_fee'] = (( this.details['lease_price'] / this.appConstants['lease_rate'])).toFixed(2);
      this.details['total_fee'] = (Number(this.details['reading_fee']) + this.appConstants['del_charges']).toFixed(2);
    }).catch((err) => {
      console.log(err);
    });
  }
}
