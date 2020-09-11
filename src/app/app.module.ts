import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { RepeatChildItemComponent } from "./slide-menu/repeat-child-item/repeat-child-item.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { CoreModule } from "./core/core.module";
import { CustomMaterialModule } from "./angMatModule/material.module";
import { HttpClientModule } from "@angular/common/http";
import { NavPipe } from "./slide-menu/repeat-child-item/nav.pipe";
import { SlideMenuComponent } from "./slide-menu/slide-menu.component";
import { LoginComponent } from "./login/login.component";
import { FormsModule } from "@angular/forms";
import { NavUrlPipe } from "./slide-menu/repeat-child-item/nav_url.pipe";
import { ToggleDirective } from "./slide-menu/menuToggle.directive";
import { ClickOutsideModule } from 'ng-click-outside';
import { DatePipe } from "@angular/common";
import { Dashboard } from "./dashboard/dashboard.component";
import { GreenHeaderComponent } from './green-header/green-header.component';
import { DocumentuploadComponent } from './document-upload/document-upload.component';
import { SortByPipe } from "./document-upload/sort-by.pipe";

import {MatInputModule} from '@angular/material/input';
import { CardsComponent } from './dashboard/cards/cards.component';
import { OnlyNumberDirective } from "./core/only-number.directive";

@NgModule({
  declarations: [
    AppComponent,
    EmptyRouteComponent,
    RepeatChildItemComponent,
    TopbarComponent,
    NavPipe,
    NavUrlPipe,
    SlideMenuComponent,
    LoginComponent,
    ToggleDirective,
    Dashboard,
    GreenHeaderComponent,
    DocumentuploadComponent,
    SortByPipe,
    CardsComponent,
    OnlyNumberDirective
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,    
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ClickOutsideModule,
    MatInputModule    
  ],
  providers:[DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
