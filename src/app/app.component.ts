import { Component, HostListener, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})


export class AppComponent {
  title = 'app';
  
constructor( private router: Router,location: PlatformLocation){

// location.onPopState(() => {
//     // alert('You con not navigate back...!!!');
// });
}

// Developer console disable
// @HostListener('document:keydown', ['$event'])
// handleKeyboardEvent(event: KeyboardEvent) {
//   if(event.keyCode==123){
//     return false;
//   }
//   if (event.getModifierState && event.getModifierState('Control')
//   &&event.getModifierState('Shift') && event.keyCode===73){
//     return false
//   }
//   if (event.getModifierState && event.getModifierState('Control')
//   &&event.getModifierState('Shift') && event.keyCode===74){
//     return false
//   }
// }

//Right Click Disable Start
// onRightClick() {
//   alert('Due to security reasons you can not press right click');
//     return false;
//   }
  //Right Click Disable End

ngOnInit(){

  //Back button Click Disable Start
  // history.pushState(null, document.title, location.href);
  // window.addEventListener('popstate', function (event)
  // {
  //   history.pushState(null, document.title, location.href);
  // });
  //Back button Click Disable End

}
// ngDoCheck(){
//   history.pushState(null, document.title, location.href);
// }

}
