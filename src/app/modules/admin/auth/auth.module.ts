import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { SharedModules } from '../../../core/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
  CommonModule,
  AuthRoutingModule,
  SharedModules,
  ModalModule.forRoot(),
  NgSelectModule,
  ]
})
export class AuthModule { }
