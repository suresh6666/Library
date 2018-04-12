import { Component, OnInit } from '@angular/core';
import {AppConstants, AppUrls} from '../../shared/app.constants';
import {AppService} from '../../shared/app.service';
import {ActivatedRoute, Router} from '@angular/router';
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
  constructor(private appUrls: AppUrls,
              private appService: AppService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public appConstants: AppConstants,
              private router: Router) {
    this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      this.bookParams = {book_name: params['book_name'], isbn: params['isbn']}
    });
    this.myDetails = this.authService.getUser();
  }

  ngOnInit() {
    this.getBookDetails();
  }
  getBookDetails() {
    const url = this.appUrls.book_details + JSON.stringify({'ISBN_13': this.bookParams['isbn']});
    this.appService.get(url).then((data) => {
      console.log('details ---- ', data['_items']);
      if (data['_items'].length) {
        this.details = data['_items'][0];
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  requestCopy(book, type) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login-now']);
    } else {
      // this.router.navigate(['/checkout/' + id], {queryParams: {type: type}});
      const cart = {
        bId: book._id,
        bType: type,
        uId: this.myDetails['_id']
      };
      this.appService.postParse(this.appUrls.cart, cart).subscribe((data) => {
        const url = '?where=' + JSON.stringify({uId: cart['_id']});
        this.appService.getParse(this.appUrls.cart + url).subscribe((cartData) => {
          this.appService.updateCart(cartData['results']);
          this.appService.toast(book.book_title, 'Added to cart', 's');
        }, (error) => {
          console.log(error);
        });
      });
    }
  }

}
