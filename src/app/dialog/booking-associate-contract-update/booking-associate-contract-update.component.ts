import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-associate-contract-update',
  templateUrl: './booking-associate-contract-update.component.html',
  styleUrls: ['./booking-associate-contract-update.component.css']
})
export class BookingAssociateContractUpdateComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<BookingAssociateContractUpdateComponent>, public router: Router, public acRoute: ActivatedRoute ) { }

  ngOnInit() {
    
  }
  
  editmodules(url){
    this.dialogRef.close(true);
    this.router.navigate([url, { steper:true,'editflow': 'true' }], { skipLocationChange: true });

  }
  contractTermRoute(url) {
    this.dialogRef.close(true);
    this.router.navigate([url, {steper:true, 'termination': 'true' }], { skipLocationChange: true });
  }
  generalEdit(url) {
    this.dialogRef.close(true);
    this.router.navigate([url, {steper:true, 'editflow': 'true' }], { skipLocationChange: true });
  }
}
