import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ConfigModule } from '../config/config.module';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule
  ],
  declarations: [],
  providers: [AuthService]
})
export class AuthModule { }
