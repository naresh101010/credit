import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-component',
  templateUrl: './empty-component.component.html'
})
export class EmptyComponentComponent implements OnInit {
  url = sessionStorage.getItem('refresh_component');
  constructor(private router:Router) { 

    if(this.url){
      this.router.navigate([this.url], { skipLocationChange: false });
    }

  }

  ngOnInit() {
  
  }


  
 
}
