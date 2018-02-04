import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavToggleComponent } from './nav-toggle/nav-toggle.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [NavToggleComponent],
  declarations: [NavToggleComponent]
})
export class SlideNavModule { }
