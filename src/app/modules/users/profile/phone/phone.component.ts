
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

@Component({
	selector: 'app-phone',
	templateUrl: './phone.component.html',
	styleUrls: ['./phone.component.scss']
})
export class PhoneComponent implements OnInit {

	public page_id = 11;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public calling_code_list= [];
	public links:any = {};
	public success_message = "Phone saved successfully.";
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();	
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		
		if(this.links.next_link== ""){
			this.links.next_link = "user/profile/review";
		}
		
		this.get_calling_code("");
		this.get_user_profile_settings((response)=>{
			if(response['data'].length > 0){
				this.form_data.country_calling_code = response['data'][0]['country_calling_code'];
				this.form_data.country_calling_id = response['data'][0]['country_calling_id'];
				this.form_data.phone_number = response['data'][0]['phone_number'];				
			}
		});
	}
	
	get_calling_code(callback){
		this.show_loader = true;
		console.log(" in get_calling_code ");
		this.service.get_calling_code(-1).subscribe(response=> {
			if(response.status == 200){
				this.calling_code_list = response.data;
			} 
			this.show_loader = false;
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('phone').subscribe(response=> {
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
			this.service.add_update_profile_phone(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					this.show_loader = false;
					this.common_service.change_route("user/profile/review");
					
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
	
	back_to_location(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}
	
	code_select($event){
		this.form_data.country_calling_id  =  $event.id;
		this.form_data.country_calling_code  =  $event.calling_code;
	}

}
