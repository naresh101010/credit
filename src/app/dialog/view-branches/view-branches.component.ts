import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html',
  styleUrls: ['./view-branches.component.css']
})
export class ViewBranchesComponent implements OnInit {
  displayedColumns: string[] = ['Bname', 'Btype', 'BstartDate', 'BendDate'];
  dataSource: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    console.log('data', this.data);
    this.dataSource = new MatTableDataSource(this.data.branchData);;
  }
  



}

export interface PeriodicElement {
  Bname: string; 
  Btype: string;
  BstartDate: string;
  BendDate: string;
}


