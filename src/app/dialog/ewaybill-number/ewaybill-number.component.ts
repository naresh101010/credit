import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-ewaybill-number',
    templateUrl: './ewaybill-number.component.html',
    styleUrls: ['./ewaybill-number.component.css']
})
export class EwaybillNumberComponent implements OnInit {

    displayedColumns: string[] = ['waybill', 'weight', 'packages', 'action'];
    displayedColumns1: string[] = ['waybill', 'action'];
    displayedColumns2: string[] = ['waybill', 'weight', 'packages'];
    dataSource: MatTableDataSource<any>;
    dataSource1: MatTableDataSource<any>;
    waybillList: Array<any> = [];
    isDeleteButtonReq : boolean;
    hideEwayBillCol: boolean;
    isViewMode : boolean = false;
    constructor(@Inject(MAT_DIALOG_DATA) public data, public dialog: MatDialog, public dialogRef: MatDialogRef<EwaybillNumberComponent>) { }

    ngOnInit() {

        console.log(this.data);
        if(this.data.isViewMode){
            this.isViewMode = this.data.isViewMode;
        } else {
            this.isViewMode = false;
        }
       console.log('isViewMode',this.isViewMode)
        this.waybillList = [...this.data.invoiceList];
        if(this.data.infoType == 'boinfo'){
            this.hideEwayBillCol = false;
            this.dataSource = new MatTableDataSource(this.waybillList);
        }
        if(this.data.infoType == 'opinfo'){
            this.hideEwayBillCol = true;
            this.dataSource1 = new MatTableDataSource(this.waybillList);

        } if(this.data.infoType =='waybillApi'){
            this.isDeleteButtonReq = true;
            this.dataSource1 = new MatTableDataSource(this.waybillList);
        }

        // this.data.forEach(element => {
        //     if (element.ewaybillInvoiceDetail) {
        //          this.waybillList.push(element.ewaybillInvoiceDetail)
        //     }
        //     else{
        //         this.waybillList.push(element)
        //     }
        // });

    }


    deleteEwayBill(element) {

        let index = this.waybillList.findIndex(elem => elem.ewaybillInvoiceDetail.ewaybillNumber == element.ewaybillInvoiceDetail.ewaybillNumber);
        if (index != -1 || index != undefined) {
            this.waybillList.splice(index, 1)
        }
        this.dialogRef.close(this.waybillList);
    }


}
// export interface PeriodicElement {
//   waybill: number;
//   weight: string;
//   packages: number;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {waybill: 12346712345, weight: 'Invoice123', packages: 10000},
//   {waybill: 12345123423, weight: 'Invoice432', packages: 100079},
// ];
