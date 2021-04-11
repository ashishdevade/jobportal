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

@NgModule({
  declarations: [CategoryComponent, ExpertiseComponent, ExpertiseLevelComponent, EducationComponent, EmploymentComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModules,
    ModalModule.forRoot()
]
})
export class ProfileModule { }
