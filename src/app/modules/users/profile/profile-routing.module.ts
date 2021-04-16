import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';
import { EducationComponent } from './education/education.component';
import { EmploymentComponent } from './employment/employment.component';
import { LanguagesComponent } from './languages/languages.component';
import { HourlyRateComponent } from './hourly-rate/hourly-rate.component';
import { TitleOverviewComponent } from './title-overview/title-overview.component';
import { ProfilePhotoComponent } from './profile-photo/profile-photo.component';
import { LocationComponent } from './location/location.component';
import { PhoneComponent } from './phone/phone.component';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full'    
  }, 
  { path: 'category', component: CategoryComponent },
  { path: 'expertise', component: ExpertiseComponent },
  { path: 'expertise-level', component: ExpertiseLevelComponent },
  { path: 'education', component: EducationComponent },
  { path: 'employment', component: EmploymentComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'hourly-rate', component: HourlyRateComponent },
  { path: 'title-overview', component: TitleOverviewComponent },
  { path: 'photo', component: ProfilePhotoComponent },
  { path: 'location', component: LocationComponent },
  { path: 'phone', component: PhoneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
