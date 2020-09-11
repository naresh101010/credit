import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AdHostDirective } from '../directives/ad-host.directive';
import { VehicleMakeComponent } from '../components/vehicle-make/vehicle-make.component';
import { VehicleMasterComponent } from '../components/vehicle-master/vehicle-master.component';
import { VehicleModelComponent } from '../components/vehicle-model/vehicle-model.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
})
export class VehicleComponent implements OnInit {

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
    this.VehicleMakeComp = VehicleMakeComponent;
    this.VehicleMasterComp = VehicleMasterComponent;
    this.VehicleModelComp = VehicleModelComponent;
    this.loadComponent(this.VehicleMakeComp);
  }

  VehicleMakeComp;
  VehicleMasterComp;
  VehicleModelComp;
  id: any;
  loadComponent(component, id = 1) {
    this.id = id
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    

  }
}
