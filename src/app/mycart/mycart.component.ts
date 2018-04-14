import { Component, OnInit } from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppConstants, AppUrls} from '../shared/app.constants';
import {Router} from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-mycart',
  templateUrl: './mycart.component.html',
  styleUrls: ['./mycart.component.css']
})
export class MycartComponent implements OnInit {
  public books: any = [];
  public cartItems = [];
  public totalPrice: any = 0;
  constructor(private appService: AppService,
              private appUrls: AppUrls,
              private router: Router,
              private authService: AuthService,
              public appConstants: AppConstants) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.appService.cartCast.subscribe((results) => {
        this.cartItems = results;
        for (let i = 0; i < results.length; i ++) {
          this.appService.get(this.appUrls.books_list + '/' + results[i]['bId']).then((book) => {
            results.filter((item) => {
              if (item.bId === book._id) {
                book['book_type'] = (item['bType'] === 'ecopy') ? 'E-Copy' : 'Hard Copy';
                console.log('My items from parse: ', item);
                this.totalPrice = this.totalPrice + this.getTotalPrice(item, book);
              }
            });
            this.books.push(book);
          });
        }
      });
    }
  }
  getTotalPrice(item, book) {
    const bPrice = (item['bType'] === 'ecopy') ? book['ecopy_price'] : book['hcopy_price'];
    book.book_price = Number((( bPrice / this.appConstants['lease_rate'])).toFixed(2));
    return book.book_price;
  }
  removeFromCart(id) {
    const bookItem: any = {};
    this.cartItems.filter((item, index) => {
      if (item.bId === id) {
        this.appService.deleteParse(this.appUrls.cart + '/' + item['objectId']).subscribe((success) => {
          this.cartItems.splice(index, 1);
          // this.appService.updateCart(this.cartItems);
          this.books.filter((book, bIndex) => {
            if (book._id === id) {
              this.books.splice(bIndex, 1);
              this.totalPrice = this.totalPrice - this.getTotalPrice(item, book);
              this.appService.toast(book.book_title, 'Removed from cart', 's');
            }
          })
        });
      }
    });
  }

}
