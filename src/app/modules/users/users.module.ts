import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ProfileModule } from './profile/profile.module';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
