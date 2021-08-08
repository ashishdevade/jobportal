import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard } from './core/auth-guard/admin-auth.guard';
import { AuthGuard } from './core/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    data: { showHeader: true, showFooter: true }
  },
  {
    path: 'user',
    canLoad: [AuthGuard],
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
    data: { showHeader: true, showFooter: true }
  },
   {
    path: 'admin',
    canLoad: [AdminAuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    data: { showHeader: true, showFooter: true }
  },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
