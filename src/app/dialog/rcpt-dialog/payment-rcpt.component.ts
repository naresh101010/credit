import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rcpt-page',
  templateUrl: './payment-rcpt.component.html',
  styleUrls: ['./payment-rcpt.component.css']
})
export class PaymentRcptComponent implements OnInit {

  constructor(
    private router: Router,
    private acrouter: ActivatedRoute
  ) { }

  message:any;
  isNew:any;
  ngOnInit() {
    // this.autoRun;
    this.acrouter.params.subscribe(params => {            
      if (params['receiptno']) { 
        this.message = params['receiptno'];
      }
    });
  }
  autoRun:any = setTimeout(() => {
    this.router.navigate(['/bookings-web-booking/web-booking']);
}, 10000);

  stopautoRun(){
    clearTimeout(this.autoRun);
    this.router.navigate(['/bookings-web-booking/web-booking']);
  }

}
