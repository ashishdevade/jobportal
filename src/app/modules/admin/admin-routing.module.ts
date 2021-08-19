import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BackendComponent  } from './backend/backend.component';

const routes: Routes = [
 {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'    
  }, 
  // { path: 'dashboard', component: AdmindashboardComponent },
  {
    path: 'dashboard',
    component : BackendComponent,
    loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),    
    data: { showHeader: true, showFooter: true }
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),    
    data: { showHeader: true, showFooter: true }
  },
   {
    path: 'users',
    component : BackendComponent,
    loadChildren: () => import('./manage-users/manage-users.module').then(m => m.ManageUsersModule),    
    data: { showHeader: true, showFooter: true }
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
