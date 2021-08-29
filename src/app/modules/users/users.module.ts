import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { SharedModules } from '../../core/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
  CommonModule,
  UsersRoutingModule,
  CommonModule,
  SharedModules,
  ModalModule.forRoot(),
  BsDatepickerModule.forRoot(),
  NgSelectModule,
  ]
})
export class UsersModule { }
