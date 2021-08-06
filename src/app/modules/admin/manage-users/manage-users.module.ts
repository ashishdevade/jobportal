import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { CompanyComponent } from './company/company.component';
import { CandidatesComponent } from './candidates/candidates.component';


@NgModule({
  declarations: [
    CompanyComponent,
    CandidatesComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule
  ]
})
export class ManageUsersModule { }
