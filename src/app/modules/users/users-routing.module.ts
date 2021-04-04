import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'    
  }, 
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),    
    data: { showHeader: true, showFooter: true }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
