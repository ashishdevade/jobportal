import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { CompanyComponent } from './company/company.component';
import { CandidatesComponent } from './candidates/candidates.component';

import { SharedModules } from 'src/app/core/shared.module';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select'; 

@NgModule({
  declarations: [
  CompanyComponent,
  CandidatesComponent,
  EditUsersComponent,

  ],
  imports: [
  CommonModule,
  ManageUsersRoutingModule,
  SharedModules,
  NgSelectModule,
  TabsModule.forRoot(),
  ] 
})
export class ManageUsersModule { }
