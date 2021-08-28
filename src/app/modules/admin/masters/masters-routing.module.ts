import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllMastersComponent } from './all-masters/all-masters.component'; 

const routes: Routes = [
{
  path: '',
  redirectTo: 's',
  pathMatch: 'full'    
}, 
{ path: 's/:one', component: AllMastersComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
