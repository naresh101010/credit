import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emptymdmcomponent',
  templateUrl: './emptymdmcomponent.component.html',
  styleUrls: ['./emptymdmcomponent.component.css']
})
export class EmptymdmcomponentComponent implements OnInit {
 url = sessionStorage.getItem('refresh_component');
  constructor(private router:Router) { 
    if(this.url){
      this.router.navigate([this.url], { skipLocationChange: false });
    }
  }
 ngOnInit() {
  }

   }
