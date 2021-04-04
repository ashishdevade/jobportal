import { NgModule } from '@angular/core';
import { ExtraOptions, Routes, RouterModule } from '@angular/router';

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
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),    
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
