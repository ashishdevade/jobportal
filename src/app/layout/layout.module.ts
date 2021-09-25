import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [ HeaderComponent, FooterComponent ],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})

export class LayoutModule { }
