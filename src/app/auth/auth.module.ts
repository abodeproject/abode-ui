import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
