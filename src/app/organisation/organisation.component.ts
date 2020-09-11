import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
})
export class OrganisationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.OrganisationComp = OrganisationComponent;
  }
  OrganisationComp;

}
