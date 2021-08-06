import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './common/admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
    AdmindashboardComponent,
    AdminSidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
