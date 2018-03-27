import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {
  public membership: object;
  constructor() {}

  ngOnInit() {
    this.membership = {
      membership_type: '',
      membership_id: 12345,
      account_balance: 0,
      issue_pending: 0,
      plan_balance: 0,
      return_pending: 0,
      return_ready: 0,
      status: false
    }
  }

}
