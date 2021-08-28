import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';

import { SharedModules } from 'src/app/core/shared.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { AllMastersComponent } from './all-masters/all-masters.component'; 

@NgModule({
  declarations: [
    AllMastersComponent
  ],
  imports: [
  CommonModule,
  MastersRoutingModule,
  SharedModules,
  NgSelectModule,
  TabsModule.forRoot(),
  ]
})
export class MastersModule { }
