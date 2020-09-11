import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmptyRouteComponent } from "./empty-route/empty-route.component";
import { APP_BASE_HREF } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { Dashboard } from "./dashboard/dashboard.component";
import { DocumentuploadComponent } from "./document-upload/document-upload.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: 'dashboard', component: Dashboard, data: {title: 'dashboard'}},
  { path: 'document-upload/:id', component: DocumentuploadComponent, data: {title: 'dashboard'}},
  { path: "**", component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: "/" }],
})
export class AppRoutingModule {}
