import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';
import {NewAddress, User} from '../shared/app.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: any;
  public gender: [object, object];
  public modalRef: BsModalRef;
  public newAddress: NewAddress;
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.gender = [{title: 'Male', value: 'male'}, {title: 'Female', value: 'female'}];
    this.user = {
      'user_id': null,
      'user_name': null,
      'is_active': false,
      'picture': null,
      'age': null,
      'first_name': null,
      'last_name': null,
      'gender': this.gender[0],
      'company': null,
      'email': null,
      'phone': null,
      'address': null,
      'about': null,
      'shipping_address': []
    };
    this.newAddress = {
      name: 'Hello',
      address: '',
      city: '',
      state: '',
      pin_code: '',
      status: true,
      phone: ''
    };
    this.appService.get(this.appUrls.jsonUser).subscribe(data => {});
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
