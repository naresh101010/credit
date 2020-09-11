import { NgxPermissionsService } from 'ngx-permissions';
import { AuthorizationService } from 'src/app/services/authorisation.service';

import { CommandmentComponent } from './../components/commandment/commandment.component';
import { PricingParameterComponent } from './../components/pricing-parameter/pricing-parameter.component';
import { AdHostDirective } from './../directives/ad-host.directive';
import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';

@Component({
	selector: 'app-create-commandment',
	templateUrl: './create-commandment.component.html',
	styleUrls: ['./create-commandment.component.css']
})
export class CreateCommandmentComponent implements OnInit {
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
		this.commandmentDetails = CommandmentComponent;
		this.pricingParameter = PricingParameterComponent;
         var pricingPermission = this.AuthorizationService.getPermissions('COMMANDMENT', 'PRICING PARAMETER');
    var commandmentPermission = this.AuthorizationService.getPermissions('COMMANDMENT', 'COMMANDMENT');
     this.pricing = pricingPermission;
    this.commandment = commandmentPermission;
      if (this.commandment.length > 0) {
        return this.loadComponent(this.commandmentDetails, 1);
    }

    if (this.pricing.length > 0) {
        return this.loadComponent(this.pricingParameter, 2);
    }

		// this.loadComponent(this.commandmentDetails, 1);
	}

	id: any;
	commandmentDetails: any;
	pricingParameter: any;
    commandment=[];
    pricing=[];

	loadComponent(component, id = 1) {
		this.id = id
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

		let viewContainerRef = this.adHost.viewContainerRef;
		viewContainerRef.clear();
		let componentRef = viewContainerRef.createComponent(componentFactory);
		// (componentRef.instance);

	}
}
