import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdmindashboardComponent } from './admin-dashboard.component';
import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
// import { AdminSidebarComponent } from './../common/admin-sidebar/admin-sidebar.component';


@NgModule({
  declarations: [
  AdmindashboardComponent,
  // AdminSidebarComponent
  ],
  imports: [
  CommonModule,
  AdminDashboardRoutingModule
  ],
 
})
export class AdminDashboardModule { }
