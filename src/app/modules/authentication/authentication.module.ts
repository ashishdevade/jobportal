import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModules  } from '../../core/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangeOtpComponent } from './change-otp/change-otp.component'; 
@NgModule({
  declarations: [LoginComponent, RegistrationComponent, ForgotPasswordComponent, ChangeOtpComponent],
  imports: [
    CommonModule,
    SharedModules,
    NgSelectModule,
    AuthenticationRoutingModule,
  ]
})
export class AuthenticationModule { }
