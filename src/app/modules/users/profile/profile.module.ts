import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CategoryComponent } from './category/category.component';
import { SharedModules  } from '../../../core/shared.module';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';
import { EducationComponent } from './education/education.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [CategoryComponent, ExpertiseComponent, ExpertiseLevelComponent, EducationComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModules,
    ModalModule.forRoot()
]
})
export class ProfileModule { }
