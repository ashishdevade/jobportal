import { Component, OnInit } from '@angular/core';
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

	constructor(
		public common_service:CommonService, 
		public service:MainService,
		) { }

	ngOnInit() {
	}

}