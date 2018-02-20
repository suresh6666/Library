import { Component } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  items = [
    {text: 'Harley David', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'Harry Porter', src: 'http://html.crunchpress.com/book-store/images/image03.jpg'},
    {text: 'Harry Porter', src: 'http://html.crunchpress.com/book-store/images/image03.jpg'},
    {text: 'Harley David', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'}
  ];
  resourceItems = [
    {text: 'Movies', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'English', src: 'http://html.crunchpress.com/book-store/images/image03.jpg'},
    {text: 'Telugu Books', src: 'http://html.crunchpress.com/book-store/images/image03.jpg'},
    {text: 'Toddlers', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'Children Books', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'Disney', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'Calender Mysteries', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'},
    {text: 'English Novels', src: 'http://html.crunchpress.com/book-store/images/image02.jpg'}
  ];
  gridView = [
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image25.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image38.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image38.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image41.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image25.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image38.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image25.jpg'},
    {text: 'A Walk Across The Sun', src: 'http://html.crunchpress.com/book-store/images/image38.jpg'}
  ];
  constructor() {}
}
