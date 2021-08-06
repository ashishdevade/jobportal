import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CandidatesComponent } from './candidates/candidates.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'candidates',
  pathMatch: 'full'    
}, 
{ path: 'candidates', component: CandidatesComponent },
{ path: 'companies', component:  CompanyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
