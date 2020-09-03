import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-msg',
  templateUrl: './validation-msg.component.html'
})
export class ValidationMsgComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  @Input('msg') msg;

}
