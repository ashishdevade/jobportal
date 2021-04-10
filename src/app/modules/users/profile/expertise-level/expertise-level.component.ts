import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


@Component({
	selector: 'app-expertise-level',
	templateUrl: './expertise-level.component.html',
	styleUrls: ['./expertise-level.component.scss']
})
export class ExpertiseLevelComponent implements OnInit {

	public page_id = 3;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public autocompleteItems = ['Item1', 'item2', 'item3'];
	public expertise_level = [
	{ value: 1, heading: 'Entry level',description : "I am relatively new to this field"},
	{value: 2, heading: 'Intermediate', description : "I have substantial experience in this field"},
	{value: 3, heading: 'Expert', description : "I have comprehensive and deep expertise in this field"},
	];
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.profile_settings_list;	
		this.form_data.expertise_level = this.expertise_level[0]['value'];
		this.show_loader = true;
		this.get_user_profile_settings((response)=>{
			this.form_data.expertise_level = response['data'][0]['level'];
			this.show_loader = false; 
		})
	}
	
	select_level(items_value){
		this.form_data.expertise_level = items_value;
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('expertise_level').subscribe(response=> {
				if(response.status == 200){
					if(callback != "" && callback != undefined){
						callback(response);
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
					//	this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			});
		}, 50);
	}
	
	back_to_expertise(){
		console.log("in here ");
		this.common_service.change_route('user/profile/expertise');
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_expertise_level(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', "Expertise saved successfully.", "");
					this.show_loader = false;
					
					setTimeout(()=>{
						this.common_service.change_route('user/profile/education');
					}, 200);
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

}
