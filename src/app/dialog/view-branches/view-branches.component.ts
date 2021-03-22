import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { confimationdialog } from '../confirmationdialog/confimationdialog';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html',
  styleUrls: ['./view-branches.component.css']
})
export class ViewBranchesComponent implements OnInit {
  displayedColumns: string[] = ['Bname', 'Btype', 'BstartDate', 'BendDate'];
  dataSource: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data,public dialog: MatDialog, public dialogRef: MatDialogRef<ViewBranchesComponent>) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.branchData);;
  }
  
  /*--- After close dialog --- */
  closeDialog(): void {
      
    const dialogRefConfirm = this.dialog.open(confimationdialog, {
      width: '300px',
      panelClass: 'creditDialog',
      data:{message:'Are you sure ?'},
      disableClose: true,
      backdropClass: 'backdropBackground'
    });

    dialogRefConfirm.afterClosed().subscribe(value => {
      if(value){
        this.dialogRef.close(false);
      }else{
        console.log('Keep Open');
      }
    });
  }


}

export interface PeriodicElement {
  Bname: string; 
  Btype: string;
  BstartDate: string;
  BendDate: string;
}


