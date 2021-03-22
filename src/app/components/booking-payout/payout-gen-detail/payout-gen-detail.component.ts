import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppSetting } from 'src/app/app.setting';
import { DatePipe } from '@angular/common';
import { PaymentTermsModel } from '../paymentTermsModel';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material';
import { AssignVehicleComponent } from 'src/app/dialog/assign-vehicle/assign-vehicle.component';
import { AuthorizationService } from '../../../core/services/authorization.service';
import { NgxPermissionsService } from 'ngx-permissions';


@Component({
  selector: 'app-payout-gen-detail',
  templateUrl: './payout-gen-detail.component.html',
  styleUrls: ['./payout-gen-detail.component.css'],
  providers: [DatePipe]
})
export class PayoutGenDetailComponent implements OnInit {
  @ViewChild('fAssoPaygen',{static:false}) fAssoPaygen : NgForm;
  @Input() payoutGenDetail: PaymentTermsModel;
  @Input() payoutGenRefDetail: any;
  @Input() indexValue: any;
  @Input() vehicleList:any;

  perList: any = [];
  exAttrMap = new Map();
  exAttrKeyList =  [];
  
  // @Input() validation: any;
  
  
  custId = 780;
  main = 779;

  // Data Sources

  
  displayedColumns: string[] = ['PserviceO', 'Pcreadit', 'Ppaid', 'PtoPay'];
  displayedColumnVehicle: string[] = ['PserviceO', 'Ppaid'];
  dataSourceServiceoff:any
  dataSourceServiceBook:any // = ELEMENT_DATA;
  dataSourceVehicle:any // = ELEMENT_DATA;

  displayedColumns3: string[] = ['Flabel', 'Fvalue'];
  creditId:any; 
  paidId:any; 
  topayId:any; 
  bookingId:any;
  offeringId:any;
  pertipId: any;
  editflow: any;
  editStatusId = AppSetting.editStatus;
  
  searchExpType = '';

  constructor( private acRoute: ActivatedRoute, public datePipe : DatePipe, public spinner: NgxSpinnerService,public dialog: MatDialog,
    private authorizationService : AuthorizationService,
    private permissionsService: NgxPermissionsService ) { }

  ngOnInit() {

    this.authorizationService.setPermissions('COMMERCIAL');
    this.perList = this.authorizationService.getPermissions('COMMERCIAL') == null ? [] : this.authorizationService.getPermissions('COMMERCIAL');
    this.permissionsService.loadPermissions(this.perList);
    this.exAttrMap = this.authorizationService.getExcludedAttributes('SCHEDULED PAYOUT');
    this.exAttrKeyList = Array.from(this.exAttrMap.values());

    this.acRoute.params.subscribe(x => {
      if(x.editflow){
        this.editflow = x.editflow;
      }      
    })

  }
  ngOnChanges() {
    if(this.payoutGenDetail){
      this.acRoute.params.subscribe(x => {
        if(x.editflow){
          this.editflow = x.editflow;
        }
        
      })
      this.setStaticIds();  
      
    }
  }
  openAssignVehicleModal(obj) {
    this.spinner.show();
    console.log('this.tempArr', this.vehicleList, obj);
    const vehicle = JSON.parse(JSON.stringify(this.vehicleList));
    const dialogRef = this.dialog.open(AssignVehicleComponent, {
      data: { 'tempVehicle': vehicle, 'obj': obj, 'component': 'payment_term' },
      panelClass: 'mat-dialog-responsive',
      disableClose: true
    });
    this.spinner.hide();
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result);
    })

  }
  weightBasId: any;
  perTripId: any;
  productSpectId: any;
  perWayBillId: any;

  setStaticIds() {
    this.payoutGenRefDetail.assocDeliveryPayOutOptionList.forEach(element => {
      if (element.lookupVal == 'WEIGHT BASIS') {
        this.weightBasId = element.id;
      } else if (element.lookupVal == 'PER TRIP') {
        this.perTripId = element.id;
      } else if (element.lookupVal == 'PER WAYBILL') {
        this.perWayBillId = element.id;
      } else if (element.lookupVal == 'PRODUCT SPECIFIC') {
        this.productSpectId = element.id;
      }
    });
  }


  payoutForEdit(obj, event){
    if(event.value == this.pertipId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjPer = obj.bookingCommercialEntList;
      }else{
        obj.BookingCommercialEntListObjPer = obj.commercialEntList;
      }
      
    }else if(event.value == this.bookingId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjBook = obj.bookingCommercialEntList ;
      }else{
        obj.BookingCommercialEntListObjBook = obj.commercialEntList ;
      }
      
    }else if(event.value == this.offeringId){
      if(obj.bookingCommercialEntList){
        obj.BookingCommercialEntListObjOff = obj.bookingCommercialEntList ;
      }else{
        obj.BookingCommercialEntListObjOff = obj.commercialEntList ;
      }
      
    }

  }

  rateAddOnVehicle(obj) {
    console.log('>><><>', this.vehicleList);
    this.openAssignVehicleModal(obj);

  }


  change($event, addtnlParamFlag, payoutGenDetail){
      console.log($event, addtnlParamFlag, payoutGenDetail)
  }

  
  editInput(element){
    if(this.editflow){
      element.status = this.editStatusId;
    }
  }

}
