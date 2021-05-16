import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { BookingInformationService } from 'src/app/core/service/booking-information.service';

@Component({
  selector: 'app-view-track',
  templateUrl: './view-track.component.html',
  styleUrls: ['./view-track.component.css']
})
export class ViewTrackComponent implements OnInit {

  displayedColumns3: string[] = ['request', 'waybill', 'pick'];
  sarchTypeData = [
    { 'name': 'WAYBILL NO.', 'val': 'WAYBILL_NUMBER' },
    { 'name': 'E-WAYBILL', 'val': 'EWAYBILL_NUMBER' },
    { 'name': 'INVOICE NO.', 'val': 'INVOICE_NUMBER' },
    { 'name': 'PACKAGE ID', 'val': 'CUST_PACKAGEID' }];
  constructor(private _shipMentTrackData: BookingInformationService) { }

  dataSource: MatTableDataSource<any>;
  waybillType:string;
  tableData;
  referenceData = [];
  destination;
  istracked=false;
  originBranch;
  branchId= JSON.parse(sessionStorage.getItem("branchId"))
  userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  headerData = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId: this.branchId,
    userId: this.userDetails.userId,
  } as any;
  headerData2 = {
    branchCode: "02",
    journeyId: "01",
    originUserType: "03",
    branchId:  JSON.stringify(this.branchId),
    userId: this.userDetails.userId,
  };
  ngOnInit() {
  }

  searchshipmentTrack(event){
    if(event.length< 4){
      return ;
    }
    this._shipMentTrackData.getshipMenTrack(this.waybillType,event , this.headerData).subscribe(resp=>{
      let pinlkpid = resp.data.responseData.destPincodeLookupId;
      console.log(resp)
      console.log(resp.data.responseData);
      this.tableData = resp.data.responseData;
      this.referenceData = resp.data.referenceData.referenceItemList;
      this.referenceData.forEach(element => {
        if(element.referenceItemType === "BRANCH" && this.tableData.bookingBranchId === element.id){
          this.originBranch = element.desc;
        }
        resp.data.responseData.waybillTrackStatusLogList.forEach(elmnt => {
          if(element.referenceItemType === "WAYBILLSTATUS" && element.id === elmnt.waybillStatusCodeLkpId){
            elmnt.status = element.value;
          }
          let time = elmnt.statusDate.slice(11);
          let varDate = elmnt.statusDate.slice(0, 10).split('-');
          let local= varDate[2];
          varDate[2] = varDate[0];
          varDate[0] = local;
          // var momentDate = moment(varDate);
         
          elmnt.statusDate = varDate.join('-') + " " + time;
          console.log(elmnt.statusDate)
          console.log(elmnt)
        });
      });
      if(resp.data.responseData.waybillTrackStatusLogList.length > 0){
        this._shipMentTrackData.getPincodeByPincodeId(pinlkpid , this.headerData).subscribe(res=>{
          this.destination = res.city;
          console.log(res.city.cityName)
          setTimeout(() => {
            this.istracked = true;
          }, 1000);
          console.log(res)
        })
      } 
      this.dataSource = new MatTableDataSource(resp.data.responseData.waybillTrackStatusLogList); 
    })
 
  }
  getWybillType(event){
    console.log(this.waybillType)
  }
 


}

