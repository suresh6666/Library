import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  public contactForm = new FormGroup({
    email: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });
  constructor() { }

  ngOnInit() {
  }

}
