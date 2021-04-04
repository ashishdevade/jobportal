import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { CategoryComponent } from './category/category.component';
import { SharedModules  } from '../../../core/shared.module';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';


@NgModule({
  declarations: [CategoryComponent, ExpertiseComponent, ExpertiseLevelComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModules
]
})
export class ProfileModule { }
