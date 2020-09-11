import { DeliveryLocalRouteComponent } from './../components/delivery-local-route/delivery-local-route.component';
import { BookingHubComponent } from './../components/booking-hub/booking-hub.component';
import { HubToHubLocalComponent } from './../components/hub-to-hub-local/hub-to-hub-local.component';
import { HubToHubComponent } from './../components/hub-to-hub/hub-to-hub.component';
import { AdHostDirective } from './../directives/ad-host.directive';
import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from '../services/authorisation.service';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { HubToHubAirComponent } from '../components/hub-to-hub-air/hub-to-hub-air.component';

@Component({
    selector: 'app-manage-route',
    templateUrl: './manage-route.component.html',
})
export class ManageRouteComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private AuthorizationService: AuthorizationService,
        private permissionsService: NgxPermissionsService) { }
    @ViewChild(AdHostDirective, null) adHost: AdHostDirective;
    userName = JSON.parse(sessionStorage.getItem("all")).data.responseData.user.username;
    //start Greeting Message
    greeting() {
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
        this.HubToHubComp = HubToHubComponent;
        this.HubToHubLocalComp = HubToHubLocalComponent;
        this.HubToHubAirComp = HubToHubAirComponent;
        this.BookingHubComp = BookingHubComponent;
        this.DeliveryLocalRouteComp = DeliveryLocalRouteComponent;
        this.loadComponent(this.HubToHubComp);
    }
    showRoute;
    HubToHubComp;
    HubToHubLocalComp;
    HubToHubAirComp;
    DeliveryLocalRouteComp;
    BookingHubComp;
    searchPoint;
    assigSchedule;
    ManageRouteComp;
    routeSubmit = false;
    isExpand = false;
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
