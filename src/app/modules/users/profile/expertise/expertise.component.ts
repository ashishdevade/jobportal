import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

@Component({
	selector: 'app-expertise',
	templateUrl: './expertise.component.html',
	styleUrls: ['./expertise.component.scss']
})
export class ExpertiseComponent implements OnInit {

	public page_id = 2;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public autocompleteItems = ['Item1', 'item2', 'item3'];
	public items = [
	{display: 'Pizza', value: 1},
	{display: 'Pasta', value: 2},
	{display: 'Parmesan', value: 3},
	];
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }
	
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.profile_settings_list;	
		this.show_loader = false;
		this.get_user_profile_settings((response_data)=>{
			this.form_data.skills = response_data['data'][0]['skills'];
			console.log("this.form_data.skills ", this.form_data.skills);
			this.show_loader = false;
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('expertise').subscribe(response=> {
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
	
	back_to_category(){
		console.log("in here ");
		this.common_service.change_route('user/profile/category');
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_expertise(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', "Expertise saved successfully.", "");
					this.show_loader = false;
					
					setTimeout(()=>{
						this.common_service.change_route('user/profile/expertise-level');
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
