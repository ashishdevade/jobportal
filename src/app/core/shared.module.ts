import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '../layout/layout.module';

// pipes
import { ToFixedPipe } from 'src/app/core/pipe/to-fixed.pipe';
import { FilterPipe } from 'src/app/core/pipe/filter.pipe';
import { BlankhandlerPipe } from 'src/app/core/pipe/blankhandler.pipe';
import { SafeURLPipe } from 'src/app/core/pipe/safe-url.pipe';
import { NoSanitizePipe } from 'src/app/core/pipe/no-sanatize-html';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
	declarations: [
	ToFixedPipe,
	FilterPipe,
	BlankhandlerPipe,
	SafeURLPipe,
	NoSanitizePipe,
	],
	imports: [
	FormsModule,
	CommonModule,
	LayoutModule,
	AgGridModule.withComponents([]),
	],
	exports: [ FormsModule, LayoutModule,  ToFixedPipe, FilterPipe, BlankhandlerPipe, SafeURLPipe, NoSanitizePipe, AgGridModule ],
	providers: [],
	bootstrap: []
})

export class SharedModules { }