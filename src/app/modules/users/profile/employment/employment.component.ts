
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-employment',
	templateUrl: './employment.component.html',
	styleUrls: ['./employment.component.scss']
})
export class EmploymentComponent implements OnInit {

	public page_id = 5;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public year_array = [];
	public month_arr = [];
	public employement_id = -1;
	public success_message = "";
	public employment_list = [];
	public country_list = [];
	public state_list = [];
	public popup_title = "";
	public links:any = {};
	public action_button_text = "";
	
	modalRef: BsModalRef;
	
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
		this.form_data.from_year  = "";
		this.form_data.to_year = "";
		let d = new Date();
		for(let i = d.getFullYear(); i >= (d.getFullYear() - 50); i--){
			this.year_array.push(i);
		}
		
		this.month_arr = this.common_params.month_array;
		
		this.show_loader = true;
		this.get_user_profile_settings((response)=>{
			this.employment_list = response['data'];
			this.show_loader = false; 
			console.log(" in get_user_profile_settings ");
			
			this.get_countries("");
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('employment').subscribe(response=> {
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
	
	get_countries(callback){
		this.show_loader = true;
		console.log(" in get_countries ");
		this.service.get_countries(-1).subscribe(response=> {
			if(response.status == 200){
				this.country_list = response.data;
			} 
			this.show_loader = false;
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	get_states(country_id, callback){
		this.show_loader = true;
		this.service.get_states(country_id).subscribe(response=> {
			if(response.status == 200){
				this.state_list = response.data;
			} 
			this.show_loader = false;
			
			if(callback != "" && callback != undefined){
				callback(response);
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	get_state($event){
		this.form_data.country_name = $event.name;
		this.form_data.country_id = $event.id;
		this.get_states($event.id, (res)=>{})
	}
	
	state_select($event){
		this.form_data.state_name  =  $event.name;
		this.form_data.state_id  =  $event.id;
	}
	
	back_to_education(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}
	
	go_to_languages(){
		if(this.employment_list.length == 0){
			this.common_service.show_toast('e', 'No Employment Details added, Please add employment by clicking "Add Employment"', "");
		} else {
			this.common_service.change_route(this.links.next_link);
		}
		
	}
	
	skip_steps(){
		this.show_loader = true; 
		this.service.skip_this_step(this.page_id).subscribe(response=> {
			if(response.status == 200){
				this.show_loader = false;
				this.common_service.change_route(this.links.next_link);
				
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid && this.isYearValuesCorrect()){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_employment(dataset, this.employement_id).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.modalRef.hide();
						this.get_user_profile_settings((response)=>{
							this.employment_list = response['data'];
							this.show_loader = false; 
						})
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
	
	add_new_employment(template: TemplateRef<any>) {
		this.employement_id = -1;
		this.popup_title = "Add Employment";
		this.action_button_text = "Save";
		this.success_message = "Employment saved successfully.";
		this.form_data.company = "";
		this.form_data.job_title = "";
		this.form_data.location = "";
		this.form_data.country = "";
		this.form_data.from_month = "";
		this.form_data.from_year = "";
		this.form_data.to_month = "";
		this.form_data.to_year = "";
		this.form_data.description = "";
		this.modalRef = this.modalService.show( template, this.common_params.modal_config );
	}
	
	edit_employment(template: TemplateRef<any>, employement_id){
		this.employement_id = employement_id;
		this.popup_title = "Edit Employment";
		this.action_button_text = "Update";
		this.success_message = "Employment updaed successfully.";
		this.show_loader = true;
		
		this.service.get_employment_details(employement_id).subscribe(response=> {
			if(response.status == 200){
				let employment_details = response.data[0];
				this.form_data.company = employment_details.company_name;
				this.form_data.job_title = employment_details.job_title;
				/* this.form_data.country = employment_details.country;*/
				
				this.form_data.country = employment_details.country;
				this.form_data.country_id = employment_details.country_id;
				this.form_data.country_name = employment_details.country;
				this.form_data.state_id = employment_details.state_id;
				this.form_data.state = employment_details.state;
				this.form_data.state_name = employment_details.state;
				
				this.form_data.location = employment_details.location;
				this.form_data.zipcode = employment_details.zipcode;
				this.form_data.from_month = employment_details.from_month;
				this.form_data.from_year = employment_details.from_year;
				this.form_data.to_month = employment_details.to_month;
				this.form_data.to_year = employment_details.to_year;
				this.form_data.description = employment_details.job_description;
				
				this.get_states(employment_details.country_id, (res)=>{
					this.show_loader = false;
					this.modalRef = this.modalService.show( template, this.common_params.modal_config );
				})
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});	
		
	}
	
	delete_employment(employement_id){
		if(confirm('Are you sure you want to delete this record ?')){
			this.show_loader = true;
			this.service.delete_employment(employement_id).subscribe(response=> {
				if(response.status == 200){
					this.show_loader = false;
					this.get_user_profile_settings((response)=>{
						this.employment_list = response['data'];
						this.show_loader = false; 
					})
				} else {
					this.show_loader = false;
					//	this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			});
		}
	}

	isYearValuesCorrect(){
		let from_ts = new Date(this.form_data.from_month+this.form_data.from_year);
		let to_ts = new Date(this.form_data.to_month+this.form_data.to_year);

		if(from_ts && to_ts){
			if(from_ts > to_ts){
				this.common_service.show_toast('e', "Job Period From value can't be greater than To value", "");
				return false;	
			}else{
				return true;
			}

		}
	}
}
