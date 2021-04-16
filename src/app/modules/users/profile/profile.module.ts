import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CategoryComponent } from './category/category.component';
import { SharedModules  } from '../../../core/shared.module';
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

@NgModule({
  declarations: [CategoryComponent, ExpertiseComponent, ExpertiseLevelComponent, EducationComponent, EmploymentComponent, LanguagesComponent, HourlyRateComponent, TitleOverviewComponent, ProfilePhotoComponent, LocationComponent, PhoneComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModules,
    ModalModule.forRoot()
]
})
export class ProfileModule { }
