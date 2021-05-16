import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-switch-branch',
  templateUrl: './switch-branch.component.html',
  styleUrls: ['./switch-branch.component.css']
})
export class SwitchBranchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayedColumns: string[] = ['radio', 'waybill', 'weight', 'address', 'status'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  radio: string;
  waybill: string;
  weight: string;
  address: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {radio: '', waybill: 'Branch123', weight: 'Delhi Mahipalpur', address: 'Line 1 Address', status: 'Active'},
  {radio: '', waybill: 'Branch123', weight: 'Delhi Mahipalpur', address: 'Line 1 Address', status: 'Active'},
  {radio: '', waybill: 'Branch123', weight: 'Delhi Mahipalpur', address: 'Line 1 Address', status: 'Active'},
  {radio: '', waybill: 'Branch123', weight: 'Delhi Mahipalpur', address: 'Line 1 Address', status: 'Active'},
];
