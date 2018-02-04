import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MaterialModule} from '../material/material.module';

import { ContentComponent } from './content/content.component';
import { AbodeService } from './abode.service';
import { StatusbarComponent } from './statusbar/statusbar.component';
import { StatusTimeComponent } from './status-time/status-time.component';
import { StatusDateComponent } from './status-date/status-date.component';
import { StatusWeatherComponent } from './status-weather/status-weather.component';
import { StatusNetworkComponent } from './status-network/status-network.component';
import { StatusNotificationsComponent } from './status-notifications/status-notifications.component';
import { StatusIssuesComponent } from './status-issues/status-issues.component';
import { StatusItemComponent } from './status-item/status-item.component';
import { SlideNavModule } from '../slide-nav/slide-nav.module';
import { StatusSettingsComponent } from './status-settings/status-settings.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    NgbModule.forRoot(),
    SlideNavModule
  ],
  exports: [
    ContentComponent,
    StatusbarComponent
  ],
  declarations: [ ContentComponent, StatusbarComponent, StatusTimeComponent, StatusDateComponent, StatusWeatherComponent, StatusNetworkComponent, StatusNotificationsComponent, StatusIssuesComponent, StatusItemComponent, StatusSettingsComponent ],
  providers: [AbodeService]
})
export class AbodeModule { }
