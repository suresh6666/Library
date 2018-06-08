import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libraryfeatures',
  templateUrl: './libraryfeatures.component.html',
  styleUrls: ['./libraryfeatures.component.css']
})
export class LibraryfeaturesComponent implements OnInit {
  public libraryCondition: any = {membership: true};
  constructor() { }

  ngOnInit() {
  }

}
