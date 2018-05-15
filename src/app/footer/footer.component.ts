import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../shared/app.service';
import {AppUrls} from '../shared/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public copyDate: any = new Date();
  public categories: any = [];
  @ViewChild('getHelp') getHelp: ElementRef;
  @ViewChild('contactForm') contactForm: ElementRef;
  constructor(private elRef: ElementRef,
              private appService: AppService,
              private appUrls: AppUrls) { }
  ngOnInit() {
    const query = {
      max_results: 5,
      sort: '-_updated'
    };
    this.appService.get(this.appUrls.categories, query).then((success) => {
      console.log(success);
      this.categories = success['_items'];
    }).catch((err) => {
      console.log(err);
    });
  }
  getHelpEvent () {
    if (this.contactForm.nativeElement.classList.contains('show-profile') === false) {
      this.contactForm.nativeElement.classList.add('show-profile');
      this.getHelp.nativeElement.classList.add('get-help-hide');
    } else {
      this.getHelp.nativeElement.classList.remove('get-help-hide');
      this.contactForm.nativeElement.classList.remove('show-profile');
    }
  }
}
