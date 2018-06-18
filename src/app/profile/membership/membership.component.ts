import { Component, OnInit } from '@angular/core';
import {AppService} from '../../shared/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  public membership: any = {};
  public myParams: any = {};
  public readingCalculation = {books: 3, months: 3, totalFee: 0};
  public membershipType = {
    '3': 'Economy reader',
    '6': 'Value reader',
    '9': 'Deluxe reader',
    '12': 'Ultimate reader'
  };
  pForm = new FormGroup({
    cvv: new FormControl(),
    mm: new FormControl(),
    yy: new FormControl(),
    card_type: new FormControl('Credit'),
    card_number: new FormControl(),
    name_on_card: new FormControl()
  });
  constructor(public appService: AppService,
              private router: Router,
              public authService: AuthService,
              public appUrls: AppUrls,
              public appConstants: AppConstants,
              public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log(params);
      this.myParams = params;
      this.getPriceDetails((this.myParams['plan']) ? this.myParams : this.readingCalculation);
    });
  }

  ngOnInit() {
    this.getMembership();
  }
  getPriceDetails(calcData) {
    const month = Number(calcData['months']);
    const bCount = Number(calcData['books']);
    let tFee = 800;
    if (month === 3) {
      this.readingCalculation['totalFee'] = tFee + (180 * (bCount - 1));
    } else if (month === 6) {
      tFee = (tFee * 2) - ((tFee * 2) / 100) * 10;
      this.readingCalculation['totalFee'] = tFee + (324 * (bCount - 1));
    } else if (month === 9) {
      tFee = (tFee * 3) - ((tFee * 3) / 100) * 15;
      this.readingCalculation['totalFee'] = tFee + (468 * (bCount - 1));
    } else if (month === 12) {
      tFee = (tFee * 4) - ((tFee * 4) / 100) * 20;
      this.readingCalculation['totalFee'] = tFee + (576 * (bCount - 1));
    }
  }
  getMembership() {
    this.appService.get(this.appUrls.membership).then((data) => {
      console.log(data);
      if (data['_items'].length === 0) {
        this.membership = null;
      } else {
        this.membership = data['_items'][0];
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  doPayment(amount) {
    console.log(amount);
    const pObj = {
      total_amount: amount,
      payment_date: new Date().toISOString(),
      payment_status: 'active',
      card_details: {
        user_id: this.authService.getUser()['_id'],
        card_number: this.pForm.get('card_number').value,
        card_type: this.pForm.get('card_type').value,
        expire_date: this.pForm.get('mm').value + '/' + this.pForm.get('yy').value,
        cvv: this.pForm.get('cvv').value,
        name_on_card: this.pForm.get('name_on_card').value
      }
    };
    this.appService.post(this.appUrls.payments, pObj).then((data) => {
      console.log('Hello Payment', data);
      const date = new Date();
      const membershipObj = {
        user_id: this.authService.getUser()['_id'],
        plan_expiry: new Date(date.setFullYear(date.getFullYear() + 1)).toISOString(),
        membership_type: 'Individual',
        status: true,
        account_balance: 0,
        plan_balance: this.appConstants.mAmount
      };
      this.appService.post(this.appUrls.membership, membershipObj).then((orderSuccess) => {
        console.log(orderSuccess);
      }).catch((orderErr) => {
        console.log(orderErr);
      });
    }).catch((err) => {
      console.log(err);
    });
  }

}
