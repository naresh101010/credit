import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTabsModule,
  MatExpansionModule,
  MatTooltipModule

} from '@angular/material';



const materialComponents = [
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatTabsModule,
  MatDialogModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatTooltipModule
]

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
})
export class MaterialModule { }
