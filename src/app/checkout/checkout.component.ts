import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public toggle: any = {address: true, payment: false};
  public shipping_address: any = [];
  public myShippingAddress: any = {};
  public selectedShipping: any;
  public user: any = {};
  public totalPrice: any = 0;
  public cartResults = [];
  public wallet: any = {};
  public disableWallet: boolean;
  pForm = new FormGroup({
    cvv: new FormControl(),
    mm: new FormControl(),
    yy: new FormControl(),
    card_type: new FormControl('Credit'),
    card_number: new FormControl(),
    name_on_card: new FormControl()
  });
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private authService: AuthService,
              private router: Router) {}
  getTotalPrice(item, book) {
    const bPrice = (item['book_type'] === 'ecopy') ? book['ecopy_price'] : book['hcopy_price'];
    book.book_price = Number((( bPrice / 100) * this.appConstants['lease_rate']).toFixed(2));
    return book.book_price;
  }
  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.appService.cartCast.subscribe((results) => {
        this.cartResults = results;
        for (let i = 0; i < results.length; i ++) {
          const book = results[i]['book'],
            cartItem = results[i];
          book['image_thumbnail'] = this.appService.checkHttps(book['image_thumbnail']);
          book['image_small_thumbnail'] = this.appService.checkHttps(book['image_small_thumbnail']);
          book['book_type'] = (cartItem['book_type'] === 'ecopy') ? 'E-Copy' : 'Hard Copy';
          console.log('My items from parse: ', cartItem);
          this.totalPrice = this.totalPrice + this.getTotalPrice(cartItem, book);
        }
      });
      // get user details from cast
      this.appService.userCast.subscribe((user) => {
        console.log('My User info ---- ', user);
        this.user = user;
        this.shipping_address = user['shipping_address'];
        if (this.shipping_address) {
          this.shipping_address.forEach((address, index) => {
            if (address['default']) {
              this.myShippingAddress = address;
              this.selectedShipping = index;
            }
          });
        }
        if (Object.keys(this.user).length > 0) {
          const query = {
            where: {user_id: this.user['_id']}
          };
          // Get wallet information
          this.appService.get(this.appUrls.wallet, query).then((walletInfo) => {
            console.log('Wallet information: ', walletInfo);
            this.wallet = walletInfo['_items'][0];
            this.disableWallet = this.wallet['amount'] < (this.totalPrice + this.appConstants.del_charges);
          });
        }
      });
    }
  }
  selectAddress(address) {
    this.myShippingAddress = address;
  }
  orderNow () {
    console.log('Order now Wallet!');
    if (this.disableWallet) {
      return true;
    }
    const deductionAmount = this.totalPrice + this.appConstants.del_charges;
    const myTransaction = {
      wallet_id: this.wallet['_id'],
      amount: deductionAmount,
      transaction_type: 'debit',
      transaction_for: 'wallet',
      email: this.user['email'],
      status: 'success',
      name: this.user['first_name'],
      txnid: Math.floor(Math.random() * 1000000000).toString(),
      product_info: 'Book(s) purchased!'
    };
    this.appService.post(this.appUrls.transactions, myTransaction).then((sTrans) => {
      console.log('Success transaction', sTrans);
      return sTrans;
    }).then((transaction) => {
      const url = this.appUrls.wallet + '/' + this.wallet['_id'],
        amount = this.wallet['amount'] - deductionAmount;
      this.appService.patch(url, {amount: amount}).then((successWallet) => {
        console.log('Success wallet update', successWallet);
        // Place order after successful deduction from Wallet!
        const date = new Date();
        delete this.myShippingAddress['default'];
        const bookIds = [];
        // Push the Book ids
        this.cartResults.forEach((cartItem) => {bookIds.push(cartItem['book']['_id'])});
        const order_object = {
          total_amount: deductionAmount,
          books: bookIds,
          user_id: this.user['_id'],
          shipping_address: this.myShippingAddress,
          delivery_date: new Date(date.setDate(date.getDate() + 2)).toISOString(),
          delivery_status: 'progress',
          transaction_id: transaction['_id']
        };
        this.appService.post(this.appUrls.orders, order_object).then((orderSuccess) => {
          console.log(orderSuccess);
          this.appService.toast('Order Placed successfully!',
            'Rs ' + deductionAmount + ' deducted from your Wallet!', 's');
          // Delete all the items from the cart using for loop
          this.cartResults.forEach((cartItem, index) => {
            this.appService.delete(this.appUrls.cart + '/' + cartItem['_id']);
          });
          this.router.navigate(['/order-details', orderSuccess._id]);
        }).catch((orderErr) => {
          console.log(orderErr);
        });
      });
    })
  }
}
