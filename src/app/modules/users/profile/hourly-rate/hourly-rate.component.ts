
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-hourly-rate',
	templateUrl: './hourly-rate.component.html',
	styleUrls: ['./hourly-rate.component.scss']
})
export class HourlyRateComponent implements OnInit {

	public page_id = 7;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public success_message = "Hourly Rate saved successfully.";
	public default_rate = "";
	public links:any = {};
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		private modalService: BsModalService
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.profile_settings_list;	
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.default_rate = this.common_params.default_service_rate_per;
		
		this.form_data.hourly_date = "";
		this.form_data.service_fees = "0.00";
		this.form_data.receive_rate = "0.00";
		this.get_user_profile_settings((response)=>{
			if(response['data'].length > 0){
				this.form_data.hourly_date = response['data'][0]['hourly_rate'];
				this.form_data.service_fees = response['data'][0]['service_fees'];
				this.form_data.receive_rate = response['data'][0]['receive_rate'];
			}
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('hourly-rate').subscribe(response=> {
				if(response.status == 200){
					if(callback != "" && callback != undefined){
						callback(response);
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			});
		}, 50);
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_hourlyrate(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					this.show_loader = false;
					this.common_service.change_route(this.links.next_link);
					
				} else {
					this.common_service.show_toast('e', this.common_service.error_message, "");
					this.show_loader = false;
				}
				
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			});
		}
	}
	
	back_to_lang(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}
	
	calculate_hourly_rate(){
		let service_fees = Math.round((this.form_data.hourly_date - (this.form_data.hourly_date * parseFloat(this.default_rate)))/100 )
		this.form_data.service_fees = (service_fees).toFixed(2);
		this.form_data.receive_rate = (parseFloat(this.form_data.hourly_date) + (service_fees));
		
	}

}
