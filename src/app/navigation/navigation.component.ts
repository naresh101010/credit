import { Component, OnInit } from '@angular/core';

import { Subscription  } from 'rxjs';
import { AppSetting } from '../app.setting';


export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private subscription: Subscription;

  data = [];
  entitylist = [];
  selected = '';
  stepperFlag=AppSetting.stepperFlag
  constructor() { }

  ngOnInit() {


   

}
}
