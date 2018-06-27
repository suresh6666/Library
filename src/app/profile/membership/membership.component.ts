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
  public readingCalculation = {books: 3, months: 3, readingFee: 0, totalAmount: 0};
  public membershipType = {
    '3': 'Economy reader',
    '6': 'Value reader',
    '9': 'Deluxe reader',
    '12': 'Ultimate reader'
  };
  constructor(public appService: AppService,
              private router: Router,
              public authService: AuthService,
              public appUrls: AppUrls,
              public appConstants: AppConstants,
              public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      console.log('membership Plan', params);
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
      this.readingCalculation['readingFee'] = tFee + (180 * (bCount - 1));
    } else if (month === 6) {
      tFee = (tFee * 2) - ((tFee * 2) / 100) * 10;
      this.readingCalculation['readingFee'] = tFee + (324 * (bCount - 1));
    } else if (month === 9) {
      tFee = (tFee * 3) - ((tFee * 3) / 100) * 15;
      this.readingCalculation['readingFee'] = tFee + (468 * (bCount - 1));
    } else if (month === 12) {
      tFee = (tFee * 4) - ((tFee * 4) / 100) * 20;
      this.readingCalculation['readingFee'] = tFee + (576 * (bCount - 1));
    }
    const extraCost = this.appConstants.one_time_security_deposit + this.appConstants.one_time_reg_fee;
    this.readingCalculation['totalAmount'] = this.readingCalculation['readingFee'] + extraCost;
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
  requestMembership() {
    const date = new Date(),
      books = Number(this.readingCalculation['books']),
      months = Number(this.readingCalculation['months']);
    const plan_expiry = new Date(date.setMonth(date.getMonth() + months)).toISOString();
    const notes_first = 'successfully requested for the ',
      notes_second = ' Membership plan, Our executive will call you Shortly!';
    const membership = {
      user_id: this.authService.getUser()['_id'],
      plan_expiry: plan_expiry,
      books_at_a_time: books,
      no_of_months: months,
      membership_type: this.membershipType[this.readingCalculation['books']],
      status: false,
      new_member: true,
      amount: {
        account_balance: -this.readingCalculation['readingFee'],
        plan_balance: -this.readingCalculation['readingFee'],
        one_time_reg_fee: -this.appConstants.one_time_reg_fee,
        one_time_security_deposit: -this.appConstants.one_time_security_deposit,
        amount_paid: false
      },
      membership_notes: notes_first + this.membershipType[this.readingCalculation['books']] + notes_second
    };
    console.log(membership);
    this.appService.post(this.appUrls.membership, membership).then((data) => {
      this.appService.toast(membership['membership_notes'], '', 's');
      this.router.navigate(['/welcome']);
    }).catch((error: any) => {
      this.appService.toast('Something went wrong!', 'Contact Administrator for any issue!', 'e');
    });
  }
}
