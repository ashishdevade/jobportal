import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdmindashboardComponent } from './admin-dashboard.component';


const routes: Routes = [
{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'    
}, 
{ path: 'dashboard', component: AdmindashboardComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
