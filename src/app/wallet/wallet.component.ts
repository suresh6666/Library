import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public tra = {
    MERCHANT_KEY: 'am7eBpic',
    key: 'am7eBpic',
    SALT: 'KJ5oWHOUni',
    txnid: '847d045dccebbea4eb99',
    PAYU_BASE_URL: 'https://sandboxsecure.payu.in/_payment',
    hashSequence: 'key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10',
    furl: 'http://localhost:4200/fauiluretransaction',
    surl: 'http://localhost:4200/successtransaction'
  };
  public loadMoney: any;
  public user: any = {};
  public wallet: any = {};
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
    const myQuery = {
      where: {user_id: this.user['_id']}
    };
    this.appService.get(this.appUrls.wallet, myQuery).then((walletData) => {
      console.log('Wallet data', walletData);
      if (walletData['_items'].length) {
        this.wallet = walletData['_items'][0];
      }
      return this.wallet;
    }).then((walletData) => {
      console.log('walletData -----', walletData);
      const transactionQuery = {
        where: {wallet_id: walletData['_id'], transaction_for: 'wallet'},
        sort: '-_created'
      };
      this.appService.get(this.appUrls.transactions, transactionQuery).then((transactions) => {
        console.log('Transactions ----', transactions['_items']);
        this.transactions = transactions['_items'];
      });
    })
  }
  addMoney(money) {
    console.log(money);
    const myTransaction = {
      wallet_id: this.wallet['_id'],
      amount: money,
      transaction_type: 'credit',
      transaction_for: 'wallet',
      email: this.user['email'],
      status: 'success',
      name: this.user['first_name'],
      txnid: Math.floor(Math.random() * 1000000000).toString(),
      product_info: 'Wallet Update'
    };
    this.appService.post(this.appUrls.transactions, myTransaction).then((sTrans) => {
      console.log('Success transaction', sTrans);
      myTransaction['_created'] = sTrans['_created'];
      myTransaction['_id'] = sTrans['_id'];
      this.transactions.unshift(myTransaction);
    }).then((data) => {
      const url = this.appUrls.wallet + '/' + this.wallet['_id'],
        amount = this.wallet['amount'] + money;
      this.appService.patch(url, {amount: amount}).then((successWallet) => {
        console.log('Success wallet update', successWallet);
        this.appService.toast('Successful!', 'Rs ' + money + ' Added to wallet!', 's');
        this.loadMoney = null;
        this.wallet['amount'] = amount;
        console.log(amount, this.wallet);
      });
    })
  }

}
