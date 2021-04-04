import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ExpertiseComponent } from './expertise/expertise.component';
import { ExpertiseLevelComponent } from './expertise-level/expertise-level.component';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full'    
  }, 
  { path: 'category', component: CategoryComponent },
  { path: 'expertise', component: ExpertiseComponent },
  { path: 'expertise-level', component: ExpertiseLevelComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
