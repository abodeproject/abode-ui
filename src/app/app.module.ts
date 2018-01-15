import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { AppComponent } from './app.component';

import { WelcomeModule } from './welcome/welcome.module';

const rootRoute = {
  name: 'root',
  url: '',
  redirectTo: 'welcome'
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    WelcomeModule,
    UIRouterModule.forRoot({ states: [ rootRoute ], useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
