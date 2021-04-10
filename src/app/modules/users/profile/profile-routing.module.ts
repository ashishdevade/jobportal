import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';
import { EducationComponent } from './education/education.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
