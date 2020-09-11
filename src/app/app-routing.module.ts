import { EmptymdmcomponentComponent } from './components/emptymdmcomponent/emptymdmcomponent.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavSidebarComponent } from './nav-sidebar/nav-sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ZoneMatrixComponent } from './zone-matrix/zone-matrix.component';
import { OrganisationComponent } from './organisation/organisation.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { DemoComponent } from './demo/demo.component';
import { AddStateComponent } from './modals/add-state/add-state.component';
import { ManagePinComponent } from './manage-pin/manage-pin.component';
import { RateGroupComponent } from './components/rate-group/rate-group.component';
import { GeographyComponent } from './geography/geography.component';
import { BranchComponent } from './branch/branch.component';
import { NotepadComponent } from './notepad/notepad.component';
import { LookupComponent } from './lookup/lookup.component';
import { CreateCommandmentComponent } from './create-commandment/create-commandment.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ManageRouteComponent } from './manage-route/manage-route.component';
import { CommandmentRrComponent } from './commandment-rr/commandment-rr.component';
import { APP_BASE_HREF } from '@angular/common';


const routes: Routes = [
    {
        path: 'mdm',
        canActivate: [AuthGuard],
        children: [
          
            {
                path: "",
                component: EmptymdmcomponentComponent
            },
            {
                path: "dashboard",
                component: DashboardComponent
            },
            {
                path: "rate-group",
                component: RateGroupComponent
            },
            {
                path: "vehicle",
                component: VehicleComponent
            },
            {
                path: "lookup",
                component: LookupComponent
            },
            {
                path: "zone-matrix",
                component: ZoneMatrixComponent
            },
            {
                path: 'zone-matrix/:page',
                component: ZoneMatrixComponent
            },
            {
                path: "notepad",
                component: NotepadComponent
            }, 
            {
                path: "geography",
                component: GeographyComponent
            },
            {
                path: "add-state",
                component: AddStateComponent
            },
            {
                path: "organisation",
                component: OrganisationComponent
            },
            {
                path: "manage-pin",
                component: ManagePinComponent
            },
            {
                path: "branch",
                component: BranchComponent
            },
            {
                path: "commandment",
                component: CreateCommandmentComponent
            },
            {
                path: "manage-route",
                component: ManageRouteComponent
            },
            {
                path: "commandment-rr",
                component: CommandmentRrComponent
            }
        ]
    }
]


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }]

})
export class AppRoutingModule { }
