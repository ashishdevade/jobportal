import { Component, OnInit } from '@angular/core';
import { CommonFunctions } from "../../core/helpers/common.functions";
import { MainService } from "../../core/services/main.service";
import { CommonService } from "../../core/services/common.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public common_params = new CommonFunctions();
	public config_data;
	public current_version = '';

	constructor(
		public common_service:CommonService, 
		public service:MainService,
		) { }

	ngOnInit() {
		this.config_data = JSON.parse(sessionStorage.getItem('system_config'));
		this.service.get_config((config_data) => {
			this.config_data = JSON.parse(config_data);		
			if(Object.keys(this.config_data).length > 0){
				this.current_version = this.config_data.version;
			}
		});
	}

}
