import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatStepperModule,
  MatToolbarModule,
  MatMenuModule,
  MatListModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatStepperModule,
    MatToolbarModule,
    MatListModule
  ]
})
export class MaterialModule { }
