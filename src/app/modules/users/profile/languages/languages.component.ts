
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-languages',
	templateUrl: './languages.component.html',
	styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

	public page_id = 6;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public proficiency_list  = [];
	public success_message = "Languages saved successfully.";
	public links:any = {};
	public language_list = [];
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		private modalService: BsModalService
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();	
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.form_data.languages = [{
			"names":this.common_params.default_language,
			"proficiency":"",
		}];
		this.show_loader = true;
		this.proficiency_list  = this.common_params.proficiency_list;
		this.get_user_profile_settings((response)=>{
			if(response['data'].length > 0){
				this.form_data.languages = [];
				for(let ldata of response['data']){
					this.form_data.languages.push({
						"names":ldata.language_name,
						"proficiency":ldata.proficiency,
					});
				}
			}
			// this.language_data = ;
			this.show_loader = false; 
			console.log(" in get_user_profile_settings ");
			this.get_language_list("");
			
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('language').subscribe(response=> {
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
	
	get_language_list(callback){
		this.show_loader = true;
		console.log(" in get_language_list ");
		this.service.get_language_list(-1).subscribe(response=> {
			if(response.status == 200){
				this.language_list = response.data;
			} 
			this.show_loader = false;
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_language(dataset).subscribe(res=> {
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
	
	back_to_employment(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}
	
	add_more_language(){
		this.form_data.languages.push({
			"names":"",
			"proficiency":"",
		})
	}
	
	delete_language(index){
		this.form_data.languages.splice(index, 1);
	}

}
