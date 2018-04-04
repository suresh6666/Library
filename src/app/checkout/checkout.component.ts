import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public book_id: string;
  public localUser: any = {};
  public toggle: any = {address: true, payment: false};
  public newAddress: any = {clicked: false};
  public details: any = {};
  public shipping_address: any = {};
  public userInfo: any = {};
  pForm = new FormGroup({
    cvv: new FormControl(),
    mm: new FormControl(),
    yy: new FormControl(),
    cardNumber: new FormControl()
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private authService: AuthService,
              private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.book_id = params['book_id'];
    });
    this.localUser = this.authService.getUser();
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
    // Get User info
    this.appService.get(this.appUrls.users + '/' + this.localUser._id).then((data) => {
      console.log(data);
      this.userInfo = data;
      this.shipping_address = data['shipping_address'];
    }).catch((err) => {
      console.log(err)
    });
  }
  doPayment(payment: any) {
    const pObj = {
      total_amount: payment,
      payment_date: new Date().toISOString(),
      payment_status: 'active'
    };
    this.appService.post(this.appUrls.payments, pObj).then((data) => {
      console.log('Hello Payment', data);
      const date = new Date();
      const order_object = {
        total_amount: payment,
        book_id: this.details['_id'],
        ordered_date: date.toISOString(),
        delivery_date: new Date(date.setDate(date.getDate() + 2)).toISOString(),
        delivery_status: 'progress',
        payment_id: data['_id']
      };
      this.appService.post(this.appUrls.orders, order_object).then((orderSuccess) => {
        console.log(orderSuccess);
        this.router.navigate(['/order-success', orderSuccess._id]);
      }).catch((orderErr) => {
        console.log(orderErr);
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}
