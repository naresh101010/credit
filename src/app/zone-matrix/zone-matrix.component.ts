import { RateGroupComponent } from './../components/rate-group/rate-group.component';
import { ViewLogisticComponent } from './../components/view-logistic/view-logistic.component';
import { AdHostDirective } from './../directives/ad-host.directive';
import { ViewZoneMatrixComponent } from './../components/view-zone-matrix/view-zone-matrix.component';
import { LogisticZoneService } from './../services/logistic-zone.service';
import { LogisticZone } from './../Models/logistic-zone';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
    selector: 'app-zone-matrix',
    templateUrl: './zone-matrix.component.html',
    styleUrls: ['./zone-matrix.component.css']
})
export class ZoneMatrixComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private $logisticMatrix: LogisticZoneService, private route: ActivatedRoute, private location: Location, private AuthorizationService: AuthorizationService,
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
        this.viewZoneMatrixComp = ViewZoneMatrixComponent;
        this.rateGroupComp = RateGroupComponent;
        this.viewLogisticComp = ViewLogisticComponent;

        var zonePermission = this.AuthorizationService.getPermissions('ZONE MATRIX', 'ZONE MATRIX');
        var logisticsPermission = this.AuthorizationService.getPermissions('ZONE MATRIX', 'LOGISTIC ZONE');
        var rateGroupPermission = this.AuthorizationService.getPermissions('ZONE MATRIX', 'RATE GROUP');
        this.zone = zonePermission;
        this.logistics = logisticsPermission;
        this.reteGroup = rateGroupPermission;



        if (this.logistics.length > 0) {
            return this.loadComponent(ViewLogisticComponent, 1, 'logistic');
        }

        if (this.reteGroup.length > 0) {
            return this.loadComponent(RateGroupComponent, 3, 'rate-group');
        }

        if (this.zone.length > 0) {
            return this.loadComponent(ViewZoneMatrixComponent, 2, 'zone');
        }

        this.route.params.subscribe(params => {
            this.paramType = params['page'];
        });

        switch (this.paramType) {
            case 'zone':
                this.loadComponent(ViewZoneMatrixComponent, 2, 'zone');
                break;
            case 'rate-group':
                this.loadComponent(RateGroupComponent, 3, 'rate-group');
                break;
            case 'logistic':
                this.loadComponent(ViewLogisticComponent, 1, 'logistic');
                break;
            default:
                this.loadComponent(ViewLogisticComponent, 1, 'logistic');
                break;
        }

    }
    reteGroup: Array<any> = [];
    logistics: Array<any> = [];
    zone: Array<any> = [];
    logisticMatrixList: LogisticZone;
    addLogistisZone = <boolean>false;
    viewZoneMatrix = <boolean>false;
    viewLogistisZone = <boolean>true;
    id = <number>1;

    addLogisticComp;
    viewZoneMatrixComp;
    rateGroupComp;
    viewLogisticComp;
    paramType: any;

    manageView(type) {
        if (type == "view-zone") {
            this.viewZoneMatrix = true;
            this.addLogistisZone = false;
            this.viewLogistisZone = false;
        }
    }

    loadComponent(component =null, id = 1, page = null) {
        this.id = id
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        // (componentRef.instance);

        this.replaceNavigationUrl(page);


    }


    replaceNavigationUrl(page) {
        this.location.replaceState(`/mdm/zone-matrix/${page}`);
        this.paramType = page;
    }

}
