import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../shared/app.service';
import {AppUrls} from '../../shared/app.constants';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  new_address: any = {
    clicked: false
  };
  shipping_address: any = {};
  userInfo: any = {};
  sForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pin_code: new FormControl('', [Validators.required]),
    phone_number: new FormControl('', [Validators.required])
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private authService: AuthService) {
    this.userInfo = this.authService.getUser();
  }

  ngOnInit() {
    this.shippingAddress();
  }
  shippingAddress() {
    this.appService.get(this.appUrls.users + '/' + this.userInfo._id).then((data) => {
      console.log('------- User info', data);
      this.shipping_address = data['shipping_address'];
    }).catch((err) => {
      console.log(err);
    });
  }
  submit(formData, formValid) {
    console.log(formData, formValid);
    const obj = {shipping_address: formData};
    this.appService.patch(this.appUrls.users + '/' + this.userInfo._id, obj).then((data) => {
      console.log(data);
    }).catch((err) => {
      console.log(err);
    });
  }
}
