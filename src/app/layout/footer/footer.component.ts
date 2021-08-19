import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
import { CommonFunctions } from "../../core/helpers/common.functions";
import { MainService } from "../../core/services/main.service";
import { CommonService } from "../../core/services/common.service";

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	public common_params = new CommonFunctions();
	public hide_front_options = false;
	constructor(
		private router: Router,
		private ActivatedRoute: ActivatedRoute,
		public common_service:CommonService, 
		public service:MainService,
		) { 
		
		this.router.events.subscribe((ev) => {
			if (ev instanceof NavigationEnd) {
				let href_var = (location.href.split('#')[1]);
				if(href_var.indexOf('admin') !== -1){
					this.hide_front_options = false;
				} else {
					this.hide_front_options = true;
				}
			}
		});
	}

	ngOnInit() {
	}

}