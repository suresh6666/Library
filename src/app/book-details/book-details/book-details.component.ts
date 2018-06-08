import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {AppService} from '../../shared/app.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {AuthService} from '../../shared/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  bookParams: any = {};
  details: any = {};
  myDetails: any = {};
  cartItems: any = [];
  currentRoute: any = '';
  constructor(private appUrls: AppUrls,
              private appService: AppService,
              public authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private router: Router,
              private titleService: Title) {
    this.activatedRoute.params.subscribe((params) => {
      this.bookParams = {book_name: params['book_name'], isbn: params['isbn']};
      this.currentRoute = this.router.url;
    });
    this.myDetails = this.authService.getUser();
  }
  getString (text, length: number) {
    console.log(text, length);
    if (text) {
      this.details.book_description = text.substr(0, length);
    }
  }
  ngOnInit() {
    this.getBookDetails();
    this.appService.cartCast.subscribe((data) => {
      this.cartItems = data;
    });
  }
  getBookDetails() {
    const url = this.appUrls.book_details + JSON.stringify({'ISBN_13': this.bookParams['isbn']});
    this.appService.get(url).then((data) => {
      console.log('details ---- ', data['_items']);
      if (data['_items'].length) {
        this.details = data['_items'][0];
        this.details['book_description'] = this.details.book_summary.substr(0, 400);
        this.titleService.setTitle(this.details['book_title'] +
          ' by ' + this.details['book_authors'][0] + ' | ' + this.details['ISBN_13']);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  requestCopy(book, type) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now'], {queryParams: {return_url: this.currentRoute}});
    } else {
      const found = this.cartItems.filter((cartItem) => {
        return cartItem.bId === book._id;
      });
      if (found.length && book.availability) {
        this.appService.toast(book.book_title, 'Already added in Cart', 'e');
      } else {
        const cart = {
          book: book._id,
          book_type: type,
          user_id: this.myDetails['_id']
        };
        this.appService.post(this.appUrls.cart, cart).then((data) => {
          cart['_id'] = data['_id'];
          cart['_created'] = data['_created'];
          cart['book'] = book;
          this.cartItems.push(cart);
          this.appService.updateCart(this.cartItems);
          this.appService.toast(book.book_title, 'Added to cart', 's');
        });
      }
    }
  }

}
