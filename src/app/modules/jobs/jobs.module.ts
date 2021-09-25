import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModules } from 'src/app/core/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobListingComponent } from './job-listing/job-listing.component';
import { JobPostionComponent } from './job-posting/job-posting.component';

@NgModule({
  declarations: [
  JobPostionComponent,
  JobListingComponent
  ],
  imports: [
  CommonModule,
  JobsRoutingModule,
  ModalModule.forRoot(),
  SharedModules,
  NgSelectModule,
  TabsModule.forRoot(),
  ]
})
export class JobsModule { }
