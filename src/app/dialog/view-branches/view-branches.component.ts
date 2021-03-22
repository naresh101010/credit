import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-branches',
  templateUrl: './view-branches.component.html'
})
export class ViewBranchesComponent implements OnInit{
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  displayedColumns: string[] = ['Bname', 'Btype', 'BstartDate', 'BendDate'];
  dataSource: any;

  constructor( @Inject(MAT_DIALOG_DATA) public data) { }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.data.branchData);
    this.dataSource.sort = this.sort;
  }
  



}

export interface PeriodicElement {
  Bname: string; 
  Btype: string;
  BstartDate: Date;
  BendDate: Date;
}


