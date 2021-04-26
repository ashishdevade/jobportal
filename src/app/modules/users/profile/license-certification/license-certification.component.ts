
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-license-certification',
	templateUrl: './license-certification.component.html',
	styleUrls: ['./license-certification.component.scss']
})
export class LicenseCertificationComponent implements OnInit {
	

	public page_id = 13;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public year_array = [];
	public month_arr = [];
	public license_certificate_id = -1;
	public success_message = "";
	public license_cer_list = [];
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
		this.profile_side_menu = this.common_params.profile_settings_list;	
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
			this.license_cer_list = response['data'];
			this.show_loader = false; 
			console.log(" in get_user_profile_settings ");
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('student_certificate').subscribe(response=> {
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
	
	
	back_to_projects(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}
	
	go_to_language(){
		if(this.license_cer_list.length == 0){
			this.common_service.show_toast('e', 'No Certifications Details added, Please add Certifications by clicking "Add License or Certificates"', "");
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
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_license_certificate(dataset, this.license_certificate_id).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.modalRef.hide();
						this.get_user_profile_settings((response)=>{
							this.license_cer_list = response['data'];
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
	
	add_new_license_certificatte(template: TemplateRef<any>) {
		this.license_certificate_id = -1;
		this.popup_title = "Add License & Certification";
		this.action_button_text = "Save";
		this.success_message = "License & Certification saved successfully.";
		this.form_data.type = "license";
		this.form_data.title = "";
		this.form_data.description = "";
		this.form_data.provider = "";
		this.form_data.link = "";
		this.form_data.date_earned = "";
		this.form_data.date_expirty = "";

		this.modalRef = this.modalService.show( template, this.common_params.modal_config );
	}
	
	edit_license_certificate(template: TemplateRef<any>, license_certificate_id){
		this.license_certificate_id = license_certificate_id;
		this.popup_title = "Edit License & Certification";
		this.action_button_text = "Update";
		this.success_message = "License & Certification updaed successfully.";
		this.show_loader = true;
		
		this.service.get_license_certificate_details(license_certificate_id).subscribe(response=> {
			if(response.status == 200){
				let project_details = response.data[0];
				this.form_data.type = "license";
				this.form_data.title = "";
				this.form_data.description = "";
				this.form_data.provider = "";
				this.form_data.link = "";
				this.form_data.date_earned = "";
				this.form_data.date_expirty = "";
				/*this.form_data.title = project_details.title;
				this.form_data.description = project_details.description;
				this.form_data.link = project_details.link;
				this.form_data.project_duration = [new Date(project_details.project_start_date) , new Date(project_details.project_end_date)];*/
				
				this.show_loader = false;
				this.modalRef = this.modalService.show( template, this.common_params.modal_config );
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});	
		
	}
	
	delete_license_certificate(license_certificate_id){
		if(confirm('Are you sure you want to delete this record ?')){
			this.show_loader = true;
			this.service.delete_license_certificate(license_certificate_id).subscribe(response=> {
				if(response.status == 200){
					this.show_loader = false;
					this.get_user_profile_settings((response)=>{
						this.license_cer_list = response['data'];
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


}
