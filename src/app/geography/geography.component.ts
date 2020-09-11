
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AdHostDirective } from '../directives/ad-host.directive';
import { AddOrganisationComponent } from '../components/add-organisation/add-organisation.component';
import { AddGeographyComponent } from '../components/add-geography/add-geography.component';
import { AuthorizationService } from '../services/authorisation.service';
import { NgxPermissionsService } from 'ngx-permissions';
@Component({
    selector: 'app-geography',
    templateUrl: './geography.component.html',
})
export class GeographyComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private AuthorizationService: AuthorizationService,
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
        
        this.organisationComp = AddOrganisationComponent
        this.geographyComp = AddGeographyComponent;
        var geoPermission = this.AuthorizationService.getPermissions('GEOGRAPHY', 'ORGANISATION');
        var geo2Permission = this.AuthorizationService.getPermissions('GEOGRAPHY', 'GEOGRAPHY');
        this.org = geoPermission;
        this.geo = geo2Permission;
        if (this.org.length > 0) {
            return this.loadComponent(this.organisationComp, 1);
        }
        if (this.geo.length > 0) {
            return this.loadComponent(this.geographyComp, 2);
        }
    }

    organisationComp: any;
    geoPermission: any;
    org: Array<any> = [];
    geo: Array<any> = [];
    geographyComp: any;
    id: any;

    loadComponent(component, id = 1) {
        this.id = id
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance);

    }


}
