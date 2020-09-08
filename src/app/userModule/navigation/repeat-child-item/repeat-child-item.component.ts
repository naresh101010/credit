import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-repeat-child-item',
  templateUrl: './repeat-child-item.component.html'
})
export class RepeatChildItemComponent implements OnInit {
  @Input() items;
  @ViewChild('childMenu', {static:false}) public childMenu;
  @Input() mainSection = "";
  @Input() subSection = "";
  constructor() {   }
  ngOnInit() {  }

  run(v){
    console.log(v)
  }

}

