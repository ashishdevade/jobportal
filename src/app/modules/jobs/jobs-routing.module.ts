import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobPostionComponent } from './job-posting/job-posting.component';
import { JobListingComponent } from './job-listing/job-listing.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'posting',
  pathMatch: 'full'    
}, 
  { path: 'posting', component: JobPostionComponent },
  { path: 'posting/:one', component: JobPostionComponent },
{ path: 'listing', component: JobListingComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
