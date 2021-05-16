import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog,MatSnackBar} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppComponent } from 'src/app/app.component';
import { CommonService } from 'src/app/core/common.service';
import { WaybillEditService } from 'src/app/core/service/Waybill-edit.service';
import { WaybillService } from 'src/app/core/service/waybill.service';
import { AddEmailComponent } from 'src/app/dialog/add-email/add-email.component';

@Component({
  selector: 'app-view-waybill',
  templateUrl: './view-waybill.component.html',
  styleUrls: ['./view-waybill.component.css']
})
export class ViewWaybillComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  refrenceList;
  constructor(
    private waybillService: WaybillService,
    private spinner: NgxSpinnerService,
    private matSnackBar: MatSnackBar,
    private dialog: MatDialog,
    private changeDetection: ChangeDetectorRef,
    private commonService: CommonService,
    private router: Router,
    private _appComp:AppComponent,
    private editWaybillService: WaybillEditService) { }
  fromDate = new Date();
  toDate = new Date();
  ngOnInit() {
    this.viewWaybillList();
    this.getAllofferings();
    this.getAllLookups()
  }
  allOfferings = [];
  allLookups = [];
  consinnee_consignorList = [];
  getAllofferings() {
    this.waybillService.getAllofferings().subscribe((offerings: any) => {
      this.allOfferings = offerings;
      console.log('this.allOfferings', this.allOfferings);
    })
  }
  getAllLookups() {
    this.commonService.getAllLookups().subscribe((lookups: any) => {
      this.allLookups = lookups;
    });
  }
  getOfferingFromId(id) {
    const find = this.allOfferings.find(el => el.id == id);
    // console.log(find);
    return find ? find.descr : '';
  }
  displayedColumns: string[] = ['checkbox', 'waybill', 'pickup', 'mop', 'service', 'consignor', 'consignee', 'package', 'weight', 'email', 'print'];
  // dataSource = ELEMENT_DATA;
  viewWaybillList() {
    const body = {
      fromDate: this.fromDate,
      toDate: this.toDate
    }
    this.spinner.show();
    this.waybillService.viewWaybillList(body).subscribe(
      async (resp: any) => {
        this.waybillNumber = "";
        this.refrenceList = resp.data.referenceData.referenceItemList;
        let waybillList = resp.data.responseData.waybillDetailList;
       
        let consinnee_consignor = [];
        for (let waybill of waybillList) {

          waybill.checked = false;
          if (waybill.consignorId) {
            if (!consinnee_consignor.includes(waybill.consignorId)) {
              consinnee_consignor.push(waybill.consignorId);
            }
          }
          if (waybill.consigneeId) {
            if (!consinnee_consignor.includes(waybill.consigneeId)) {
              consinnee_consignor.push(waybill.consigneeId);
            }
          }

        }
        if (consinnee_consignor.length > 0) {
          try {
            this.consinnee_consignorList = await this.commonService.getCnor_cneeList(consinnee_consignor).toPromise();
          } catch (e) {
            console.log("No data found");
          }
        }
        this.spinner.hide();
        this.dataSource = new MatTableDataSource([...waybillList]);
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  CheckedIndividual(element) {
    element.checked = !element.checked;
  }
  getCnr_cee(id) {
    const find = this.refrenceList.find(el => el.id == id);
    return find ? find.value : '';
  }
  onChangeMultiple(event) {
    let waybillList = []
    if (event.checked) {
      waybillList = this.dataSource.data;
      waybillList = waybillList.map(el => {
        el.checked = true;
        return el;
      });
    } else {
      waybillList = this.dataSource.data;
      waybillList = waybillList.map(el => {
        el.checked = false;
        return el;
      });
    }
    console.log('waybillList', waybillList);
    this.dataSource = new MatTableDataSource(waybillList);
    this.changeDetection.detectChanges();
  }
  navigateTo(ele) {
    sessionStorage.setItem('waybillId', ele.waybillId);
    this.router.navigate(["/bookings-web-booking/view-start-booking"])
  }
  openEmailModal(element) {
    var dialog = this.dialog.open(AddEmailComponent, {
      width: "100rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((res: any) => {
      // console.log(res);
      if (res) {
        // console.log('element', element);
        this.sendEmail(element, res);
        // console.log('res', res);
      }
    });
  }
  openEmailModalMultiple() {
    let waybillList = this.dataSource.data;
        let waybillIds = []
        waybillList = waybillList.filter(el => el.checked);
        waybillList.forEach(elem => {
          waybillIds.push(elem.waybillId);
        })

        if(!waybillList.length){
          this._appComp.showMessage('Please Select Waybill','warning');
          return;
        }
    
    var dialog = this.dialog.open(AddEmailComponent, {
      width: "100rem",
      panelClass: "bookingDialog",
    });
    dialog.afterClosed().subscribe((res: any) => {
      console.log(res);
      if (res) {
        if (waybillList.length) {
          
          this.spinner.show();
          this.waybillService.postSendMail(waybillIds,res).subscribe(resp=>{
            
            this.spinner.hide();
            this._appComp.showMessage(resp['message'],'success');
          },(err)=>{
            this.spinner.hide();
          });
        }
      }
    });
  }

  sendEmail(waybillDetail, email) {
    this.spinner.show();
    this.waybillService.getWaybillDowcument(waybillDetail.waybillId, [email]).subscribe(
      (resp: any) => {
        this.spinner.hide();
        console.log(resp);
        this.matSnackBar.open(resp.message, "", {
          duration: 3000,
          panelClass: ["text-white", "bg-green"],
          horizontalPosition: "right",
          verticalPosition: "top",
        });
      },
      (err) => {
        this.spinner.hide();
        console.log(err);
      }
    );
  }
  onChangeFromDate(event: any) {
    console.log(event);
    this.fromDate = event.value;
  }
  onChangeToDate(event) {
    console.log(event);
    this.toDate = event.value;
  }
  applyFilter(val) {
    this.dataSource.filter = val.trim().toUpperCase();
    this.dataSource.paginator = this.paginator;
  }
  mapId(id, type) {
    const find = this.allLookups.find(el => el.id == id && el.lookupTypeVal == type);
   // console.log(find);
    return find ? find.lookupVal : '';
  }

  waybillNumber : string;

/*--    Get Waybill using Waybill no. --*/
gettingWaybillbyWaybillNumber(){
  this.spinner.show()
  this.editWaybillService.getWayBillByNumber(this.waybillNumber).subscribe(async response => {
      if (response) {
           let waybillList = [];
           waybillList.push(response);
          let consinnee_consignor = [];
          for (let waybill of waybillList) {
  
            waybill.checked = false;
            if (waybill.consignorId) {
              if (!consinnee_consignor.includes(waybill.consignorId)) {
                consinnee_consignor.push(waybill.consignorId);
              }
            }
            if (waybill.consigneeId) {
              if (!consinnee_consignor.includes(waybill.consigneeId)) {
                consinnee_consignor.push(waybill.consigneeId);
              }
            }
  
          }
          
          if (consinnee_consignor.length > 0) {
            try {
              this.consinnee_consignorList = await this.commonService.getCnor_cneeList(consinnee_consignor).toPromise();
              console.log('consinnee_consignorList', this.consinnee_consignorList);
              // waybill.consigneeName = conssignee.name;
            } catch (e) {
              console.log("No data found");
            }
          }
          this.spinner.hide();
          this.dataSource = new MatTableDataSource(waybillList);
      }
  },(err) => {
    this.spinner.hide();
  })
}

/*-- Get Consignor and Consignee Name -- */
getCnor_cneeName(id) {
  if(this.consinnee_consignorList) {
    let obj = this.consinnee_consignorList.find(x => x.id == id);
    if(obj) {
      return obj.name;
    } else {
      return '';
    }
  } else {
    return '';
  }
}

}

export interface PeriodicElement {
  checkbox: string;
  waybill: number;
  pickup: string;
  mop: string;
  service: string;
  consignor: string;
  consignee: string;
  package: number;
  weight: string;
  email: string;
  print: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: 'Surface', consignor: 'TATA Aerocity', consignee: 'Vijay Traders', package: 51, weight: '112 KG', email: '', print: '' },
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: 'Surface', consignor: 'TATA Aerocity', consignee: 'Vijay Traders', package: 51, weight: '112 KG', email: '', print: '' },
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: 'Surface', consignor: 'TATA Aerocity', consignee: 'Vijay Traders', package: 51, weight: '112 KG', email: '', print: '' },
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: 'Surface', consignor: 'TATA Aerocity', consignee: 'Vijay Traders', package: 51, weight: '112 KG', email: '', print: '' },
  { checkbox: '', waybill: 12345, pickup: '31/12/2020', mop: 'Credit', service: 'Surface', consignor: 'TATA Aerocity', consignee: 'Vijay Traders', package: 51, weight: '112 KG', email: '', print: '' },
];