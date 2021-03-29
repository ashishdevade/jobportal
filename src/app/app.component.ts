import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent  implements OnInit {
	title = '';
	showHeader = false;
	showSidebar = false;
	showFooter = false;
	
	 ngOnInit() {
	 	
	 }
}
