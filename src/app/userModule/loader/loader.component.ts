import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{

  // isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor() { }

  ngOnInit() {
  }

  // show = false;
  // private subscription: Subscription;
  // constructor(private loaderService: LoaderService) { }
  // ngOnInit() {
  //   this.subscription = this.loaderService.loaderState
  //   .subscribe((state: LoaderState) => {
  //     this.show = state.show;
  //   });
  // }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}


