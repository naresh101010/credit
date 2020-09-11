import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorisation.service';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { LookUpComponent } from './../components/look-up/look-up.component';
import { FuelComponent } from '../components/fuel/fuel.component';
import { AdHostDirective } from '../directives/ad-host.directive';
import { GstComponent } from '../components/gst/gst.component';
import { ProductMasterComponent } from '../components/product-master/product-master.component';
import { ServiceLineComponent } from '../components/service-line/service-line.component';
import { SegmentComponent } from '../components/segment/segment.component';
import { AddressFeatureComponent } from '../components/address-feature/address-feature.component';
import { BillingByValueComponent } from '../components/billing-by-value/billing-by-value.component';
import { MetroComponent } from '../components/metro/metro.component';

@Component({
  selector: 'app-lookup',
  templateUrl: './lookup.component.html',
})
export class LookupComponent implements OnInit {

  constructor(private componentFactoryResolver: ComponentFactoryResolver , private AuthorizationService: AuthorizationService,
    private permissionsService: NgxPermissionsService) { }
  @ViewChild(AdHostDirective, null) adHost: AdHostDirective;
  userName = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.username;
  //start Greeting Message
greeting(){
  let myDate = new Date();
  let hrs = myDate.getHours();
  let greet;
  if (hrs < 12)
      greet = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17)
      greet = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24)
      greet = 'Good Evening';

      return greet
}
//End Greeting Message
  ngOnInit() {
    this.lookUpComp = LookUpComponent;
    this.fuelComp = FuelComponent;
    this.gstComp = GstComponent;
    this.productMasterComp = ProductMasterComponent;
    this.serviceLineComp = ServiceLineComponent;
    this.segmentComp = SegmentComponent;
    this.addressFeatureComp = AddressFeatureComponent;
    this.billingByValueComp = BillingByValueComponent;
    this.metroByValueComp = MetroComponent;

    var lookupPermission = this.AuthorizationService.getPermissions('LOOKUP', 'LOOKUP');
    var servicePermission = this.AuthorizationService.getPermissions('LOOKUP', 'SERVICE LINE');
    var productPermission = this.AuthorizationService.getPermissions('LOOKUP', 'PRODUCH MASTER');
    var segmentPermission = this.AuthorizationService.getPermissions('LOOKUP', 'SAGMENT');
    var gstPermission = this.AuthorizationService.getPermissions('LOOKUP', 'GST');
    var fuelPermission = this.AuthorizationService.getPermissions('LOOKUP', 'FUEL');
    var billingPermission = this.AuthorizationService.getPermissions('LOOKUP', 'BILING BY LEVEL');
    var featurePermission = this.AuthorizationService.getPermissions('LOOKUP', 'FEATURES');
    this.lookup = lookupPermission;
    this.serviceLine = servicePermission;
    this.productMaster = productPermission;
    this.segment = segmentPermission;
    this.gst = gstPermission;
    this.fuel = fuelPermission;
    this.billingByValue = billingPermission;
    this.features = featurePermission;



    if (this.lookup.length > 0) {
        return this.loadComponent(this.lookUpComp, 1);
    }

    if (this.serviceLine.length > 0) {
        return this.loadComponent(this.serviceLineComp, 2);
    }

    if (this.productMaster.length > 0) {
        return this.loadComponent(this.productMasterComp, 3);
    }
    if (this.segment.length > 0) {
        return this.loadComponent(this.segmentComp, 4);
    }
    if (this.gst.length > 0) {
        return this.loadComponent(this.gst, 5);
    }
    if (this.fuel.length > 0) {
        return this.loadComponent(this.fuelComp, 6);
    }
    if (this.billingByValue.length > 0) {
        return this.loadComponent(this.billingByValueComp, 7);
    }
    if (this.features.length > 0) {
        return this.loadComponent(this.addressFeatureComp, 8);
    }

  }
  lookUpComp;
  lookup=[];
  serviceLine =[];
  fuelComp;
  segment =[];
  gst =[];
  fuel=[];
  billingByValue=[];
  features=[];
  productMaster=[];
  productMasterComp;
  segmentComp;
  serviceLineComp;
  gstComp;
  addressFeatureComp;
  billingByValueComp;
  metroByValueComp;
  id: any;

  loadComponent(component, id = 1) {
    this.id = id
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    // (componentRef.instance);

  }
}
