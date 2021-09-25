import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select'; 
import { SharedModules } from 'src/app/core/shared.module';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminSidebarComponent } from './common/admin-sidebar/admin-sidebar.component';
import { BackendComponent } from './backend/backend.component';


@NgModule({
  declarations: [
  AdminSidebarComponent,
  BackendComponent
  ],
  imports: [
  CommonModule,
  AdminRoutingModule,
  SharedModules,
  ModalModule.forRoot(),
  NgSelectModule,
  ],
  exports : [
  AdminSidebarComponent
  ]
})
export class AdminModule { }
