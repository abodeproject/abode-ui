import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material/material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AbodeModule } from '../abode/abode.module';

import { WelcomeComponent } from './welcome.component';
import { ServerSelectorComponent } from './server-selector/server-selector.component';

const welcomeRoute = {
  name: 'welcome',
  url: '/Welcome',
  component: WelcomeComponent
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    AbodeModule,
    UIRouterModule.forChild({ states: [ welcomeRoute ] })
  ],
  declarations: [ WelcomeComponent, ServerSelectorComponent ]
})
export class WelcomeModule { }
