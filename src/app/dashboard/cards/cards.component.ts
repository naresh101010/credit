import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-app-cards',
  templateUrl: './cards.component.html'
})
export class CardsComponent implements OnInit {

  constructor() { }
  @Input() item;
  @Input() innerItem;
  ngOnInit(): void {
  }

}
