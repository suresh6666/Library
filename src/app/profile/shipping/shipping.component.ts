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
  shipping_address: any = [];
  user: any = {};
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
    this.appService.userCast.subscribe((myUser) => {
      this.user = myUser;
      this.shipping_address = myUser['shipping_address'] ? myUser['shipping_address'] : [];
    });
  }

  ngOnInit() {}
  submit(formData, formValid) {
    console.log(formData, this.shipping_address);
    this.shipping_address.push(formData);
    this.appService.patch(this.appUrls.users + '/' + this.user['_id'], {shipping_address: this.shipping_address})
      .then((data) => {
        console.log(data);
        this.new_address.clicked = false;
        this.appService.toast('Address added Successfully!', formData['name'], 's');
      }).catch((err) => {
        console.log(err);
      });
  }
  updateShippingAddress() {
    const url = this.appUrls.users + '/' + this.user['_id'];
    this.appService.patch(url, {shipping_address: this.shipping_address}).then((success) => {
      console.log(success);
    }).catch((error) => {
      console.log(error);
    });
  }
  markDefault(address, index) {
    console.log(address);
    this.shipping_address.forEach((item) => {
      item['default'] = false;
    });
    this.shipping_address[index]['default'] = true;
    this.updateShippingAddress();
  }
  deleteShippingAddress(address, index) {
    this.shipping_address.splice(index, 1);
    this.shipping_address[0]['default'] = true;
    this.updateShippingAddress();
  }
}
