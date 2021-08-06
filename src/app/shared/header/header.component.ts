import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() isAuthorView:boolean = false;
  @Input() isBookView:boolean = false;
  @Input() isAboutView:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
