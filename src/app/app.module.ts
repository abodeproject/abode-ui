import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { AppComponent } from './app.component';

import { AbodeModule } from './abode/abode.module';
import { AuthModule } from './auth/auth.module';
import { WelcomeModule } from './welcome/welcome.module';

const rootRoute = {
  name: 'root',
  url: ''
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AbodeModule,
    AuthModule,
    WelcomeModule,
    UIRouterModule.forRoot({ states: [ rootRoute ], useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
