import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CategoryComponent } from './category/category.component';
import { SharedModules } from '../../../core/shared.module';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';
import { EducationComponent } from './education/education.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EmploymentComponent } from './employment/employment.component';
import { LanguagesComponent } from './languages/languages.component';
import { HourlyRateComponent } from './hourly-rate/hourly-rate.component';
import { TitleOverviewComponent } from './title-overview/title-overview.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { LocationComponent } from './location/location.component';
import { PhoneComponent } from './phone/phone.component';
import { SidebarComponent } from 'src/app/Shared/sidebar/sidebar.component';
import { CardComponent } from 'src/app/Shared/card/card.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { ProjectsComponent } from './projects/projects.component';
import { LicenseCertificationComponent } from './license-certification/license-certification.component';

@NgModule({
  declarations: [CategoryComponent,
    ExpertiseComponent,
    ExpertiseLevelComponent,
    EducationComponent,
    EmploymentComponent,
    LanguagesComponent,
    HourlyRateComponent,
    TitleOverviewComponent,
    ProfilePhotoComponent,
    LocationComponent,
    PhoneComponent,
    SidebarComponent,
    CardComponent,
    JobTypeComponent,
    ProjectsComponent,
    LicenseCertificationComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModules,
    ModalModule.forRoot()
  ]
})
export class ProfileModule { }
