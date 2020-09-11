import { BranchPinMapComponent } from './../components/branch-pin-map/branch-pin-map.component';
import { BranchDetailsComponent } from './../components/branch-details/branch-details.component';
import { AdHostDirective } from './../directives/ad-host.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
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
    ngOnInit() {
        this.branchDetails = BranchDetailsComponent;
        this.branchPinMap = BranchPinMapComponent;
        this.loadComponent(this.branchDetails, 1);
    }

    id: any;
    branchDetails: any;
    branchPinMap: any;

    loadComponent(component, id = 1) {
        this.id = id
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (componentRef.instance);

    }

}
