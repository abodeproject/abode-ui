import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatStepperModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  exports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatStepperModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
