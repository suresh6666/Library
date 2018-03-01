import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public randomCheck: number;
  constructor() {
    this.randomNumber();
  }

  ngOnInit() {
  }
  randomNumber(): number {
    this.randomCheck = Math.floor((Math.random() * 1032123) + 1);
    return this.randomCheck;
  }

}
