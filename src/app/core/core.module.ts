import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { CustomMaterialModule } from "../angMatModule/material.module";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CustomMaterialModule,
    ToastrModule.forRoot({
      timeOut: 777000,
      positionClass: "toast-bottom-right",
    }),
  ],
  providers: [],
})
export class CoreModule {}
