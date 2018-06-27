import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-wallet',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  public user: any = {};
  public transactions: any = [];
  constructor(private appService: AppService,
              private router: Router,
              private authService: AuthService,
              private appUrls: AppUrls) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    }
  }

  ngOnInit() {
   this.appService.userCast.subscribe((myUser) => {
     this.user = myUser;
     if (Object.keys(this.user).length > 0) {
       this.loadTransactions();
     }
   });
  }
  loadTransactions () {
    const transactionQuery = {
      where: {user_id: this.user['_id']}
    };
    this.appService.get(this.appUrls.transactions, transactionQuery).then((transactions) => {
      console.log('Transactions ----', transactions['_items']);
      this.transactions = transactions['_items'];
    });
  }

}
