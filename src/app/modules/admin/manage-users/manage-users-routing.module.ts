import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company/company.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { EditUsersComponent } from './edit-users/edit-users.component';

const routes: Routes = [
{
  path: '',
  redirectTo: 'candidates',
  pathMatch: 'full'    
}, 
{ path: 'candidates', component: CandidatesComponent },
{ path: 'companies', component:  CompanyComponent },
{ path: 'edit/:one/:two', component:  EditUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageUsersRoutingModule { }
