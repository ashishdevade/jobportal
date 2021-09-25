import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";
import { SharedService } from "../../../../core/services/shared.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

	public page_id = 11;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public profile_side_menu = [];
	public links:any = {};
	// public success_message = "Phone saved successfully.";
	public preview_profile_photo = "";
	public user_account_data = [];
	public category_data = [];
	public expertise_data = [];
	public education_data = [];
	public experience_data = [];
	public languages_data = [];
	public project_data = [];
	public expertise_level = [];
	public certificate_data = [];
	public account_access_type = "";
	public current_expertise = "";
	public country_list = [];
	public state_list = [];
	public city_list = [];
	public service_url = '';
	public lic_certi_current_selected_file:any;
	public subcategory_list = [];
	public category_list = [];
	public proficiency_list  = [];
	public language_list = [];
	public skills_list = [];
	public calling_code_list= [];
	public location_preference = [];
	public timeline_hiring = [];
	public to_week_array = [];
	public job_type = [];
	public job_profile_list = [];
	public industry_list = [];
	public jd_current_selected_file:any;
	public jd_fileChangedEvent = '';
	public industry_label = '';
	public jd_upload_file:any;
	
	
	public imageChangedEvent: any = '';
	public imageCrioppedChangedEvent: any = '';
	public croppedImage: any = '';
	public fileToReturn:any;
	
	
	public education_id = -1;
	public education_success_message = "";
	public education_popup_title = "";
	public education_action_button_text = "";
	
	public employement_id = -1;
	public employement_success_message = "";
	public employement_popup_title = "";
	public employement_action_button_text = "";
	
	public project_id = -1;
	public project_success_message = "";
	public project_popup_title = "";
	public project_action_button_text = "";
	
	
	public lic_cer_id = -1;
	public lic_cer_success_message = "";
	public lic_cer_popup_title = "";
	public lic_cer_action_button_text = "";
	
	public title_success_message = "";
	public title_popup_title = "";
	public title_action_button_text = "";
	
	public category_success_message = "";
	public category_popup_title = "";
	public category_action_button_text = "";
	
	public language_success_message = "";
	public language_popup_title = "";
	public language_action_button_text = "";
	
	public hourly_success_message = "";
	public hourly_popup_title = "";
	public hourly_action_button_text = "";
	
	public expertise_success_message = "";
	public expertise_popup_title = "";
	public expertise_action_button_text = "";
	
	public profile_photo_success_message = "";
	public profile_photo_popup_title = "";
	public profile_photo_action_button_text = "";
	
	public location_success_message = "";
	public location_popup_title = "";
	public location_action_button_text = "";
	
	public job_preference_success_message = "";
	public job_preference_popup_title = "";
	public job_preference_action_button_text = "";
	
	public timeline_hiring_success_message = "";
	public timeline_hiring_popup_title = "";
	public timeline_hiring_action_button_text = "";
	
	public job_type_success_message = "";
	public job_type_popup_title = "";
	public job_type_action_button_text = "";
	
	public from_year_array = [];
	public to_year_array = [];
	public month_arr = [];
	
	public education_form_data:any = {};
	public employment_form_data:any = {};
	public project_form_data:any = {};
	public lic_cer_form_data:any = {};
	public title_form_data:any = {};
	public category_form_data:any = {};
	public language_form_data:any = {};
	public hourly_form_data:any = {};
	public expertise_form_data:any = {};
	public location_form_data:any = {};
	public job_preference_form_data:any = {};
	public timeline_hiring_form_data:any = {};
	public job_type_form_data:any = {};
	
	education_modalRef: BsModalRef;
	employement_modalRef: BsModalRef;
	title_modalRef: BsModalRef;
	expertise_modalRef: BsModalRef;
	license_modalRef: BsModalRef;
	languages_modalRef: BsModalRef;
	projects_modalRef: BsModalRef;
	hourly_modalRef: BsModalRef;
	category_modalRef: BsModalRef;
	profile_photo_modalRef: BsModalRef;
	location_modalRef: BsModalRef;
	job_preference_modalRef: BsModalRef;
	timeline_hiring_modalRef: BsModalRef;
	job_type_modalRef: BsModalRef;
	
	public Editor = ClassicEditor;
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		private modalService: BsModalService,
		public shared_service : SharedService,
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();	
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id);
		this.preview_profile_photo = this.common_params.default_image;
		this.account_access_type = sessionStorage.account_type;
		this.expertise_level = this.common_params.expertise_level;
		this.proficiency_list  = this.common_params.proficiency_list;
		this.location_preference = this.common_params.location_preference;
		this.timeline_hiring = this.common_params.timeline_hiring;
		this.job_type = this.common_params.job_type;
		
		
		let d = new Date();
		for (let i = d.getFullYear(); i >= (d.getFullYear() - 50); i--) {
			this.from_year_array.push(i);
		}

		for (let i = (d.getFullYear() + 10); i >= (d.getFullYear() - 50); i--) {
			this.to_year_array.push(i);
		} 
		
		this.to_week_array = this.common_params.timeline_hiring_weekly_list;
		this.month_arr = this.common_params.month_array;
		
		this.show_loader = true;
		this.service_url = JSON.parse(sessionStorage.system_config)['service_url'];
		this.get_user_profile_settings('review', (response) => {
			console.log("response ", response['data']);
			this.user_account_data = response['data']['user_account_data'];
			this.category_data = response['data']['category_data'];
			this.education_data = response['data']['education_data'];
			this.certificate_data = response['data']['certificate_data'];
			this.languages_data = response['data']['languages_data'];
			this.expertise_data = response['data']['expertise_data'];
			this.experience_data = response['data']['experience_data'];
			this.project_data = response['data']['project_data'];
			
			let filter_expertise = this.expertise_level.filter((res)=>{
				return res.value == this.expertise_data[0]['level'];
			})
			this.current_expertise = filter_expertise[0]['heading'];
			
			if(this.account_access_type == 'Student'){
				if(this.user_account_data[0]['profile_photo']!='' && this.user_account_data[0]['profile_photo'] != null ){
					this.preview_profile_photo = this.service_url + '/' + this.user_account_data[0]['profile_photo'];
				}
				
				this.expertise_data[0]['skills_arr'] = JSON.parse(this.expertise_data[0]['skills']);
				
			} 
			this.additional_user_parameter();
			
			this.show_loader = false;
			
			this.get_countries("");
		})
	}
	
	additional_user_parameter(){
		if(this.account_access_type == 'Company'){
			let location_res = this.location_preference.filter((res)=>{
				return res.value == this.user_account_data[0]['location_preference'];
			});			
			
			this.user_account_data[0]['location_preference_label'] = location_res[0]['heading'];
			
			let timeline_hiring_res = this.timeline_hiring.filter((res)=>{
				return res.value == this.user_account_data[0]['timeline_hiring'];
			});			
			
			this.user_account_data[0]['timeline_hiring_label'] = timeline_hiring_res[0]['heading'];
			
			let weekly_arr_res = this.to_week_array.filter((res)=>{
				return res.value == this.user_account_data[0]['timeline_hiring_weeks'];
			});
			
			this.user_account_data[0]['timeline_hiring_week_label'] = weekly_arr_res[0]['heading'];
			
		}
		
		let job_type_res = this.job_type.filter((res)=>{
			return res.value == this.user_account_data[0]['job_type'];
		});			
		
		this.user_account_data[0]['job_type_label'] = job_type_res[0]['heading'];
		
		if(this.user_account_data[0]['uploaded_jd']!= '' && this.user_account_data[0]['uploaded_jd']!= null){
			this.user_account_data[0]['uploaded_jd'] =  this.service_url + '/' + this.user_account_data[0]['uploaded_jd'];;
		}	
		
		console.log("this.user_account_data ", this.user_account_data[0]);
	}
	
	isYearValuesCorrect(called_from){
		if(called_from == "education"){
			if(this.education_form_data.from_year && this.education_form_data.to_year){
				if(this.education_form_data.from_year > this.education_form_data.to_year){
					this.common_service.show_toast('e', "Education Period From Year value can't be greater than To Year value", "");
					return false;	
				}else{
					return true;
				}
			}
			
		} 
		
		if(called_from == "employment") {
			let from_ts = new Date(this.employment_form_data.from_month + this.employment_form_data.from_year);
			let to_ts = new Date(this.employment_form_data.to_month + this.employment_form_data.to_year);

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
	
	get_countries(callback){
		this.show_loader = true;
		console.log(" in get_countries ");
		this.service.get_countries(-1).subscribe(response=> {
			if(response.status == 200){
				this.country_list = response.data;
			} 
			
			if (callback!= '' && callback!= undefined) {
				callback(response);
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	get_user_profile_settings(type, callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings(type).subscribe(response => {
				if (response.status == 200) {
					if (callback != "" && callback != undefined) {
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
	
	edit_education(template: TemplateRef<any>, education_id) {
		this.education_id = education_id;
		this.education_popup_title = "Edit Education";
		this.education_action_button_text = "Update";
		this.education_success_message = "Education updaed successfully.";
		this.show_loader = true;
		this.service.get_education_details(education_id).subscribe(response=> {
			if(response.status == 200){
				let education_details = response.data[0];
				this.education_form_data.school = education_details.school;
				this.education_form_data.study = education_details.study;
				this.education_form_data.degree = education_details.degree;
				this.education_form_data.from_year = education_details.from_year;
				this.education_form_data.to_year = education_details.to_year;
				this.education_form_data.description = education_details.description;

				this.show_loader = false;
				this.education_modalRef = this.modalService.show(template, this.common_params.modal_config );
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");

		});

	}

	delete_education(education_id) {
		if (confirm('Are you sure you want to delete this record ?')) {
			this.show_loader = true;
			this.service.delete_education(education_id).subscribe(response => {
				if (response.status == 200) {
					this.show_loader = false;
					this.get_user_profile_settings("education",  (response) => {
						this.education_data = response['data'];
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
	
	onEducationSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid && this.isYearValuesCorrect('education')) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.education_form_data));
			this.service.add_update_profile_education(dataset, this.education_id).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', this.education_success_message, "");

					setTimeout(() => {
						this.show_loader = false;
						this.education_modalRef.hide();
						this.get_user_profile_settings("education", (response) => {
							this.education_data = response['data'];
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
	
	
	employment_onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid && this.isYearValuesCorrect('employment')){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.employment_form_data));
			this.service.add_update_profile_employment(dataset, this.employement_id).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.employement_success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.employement_modalRef.hide();
						this.get_user_profile_settings("employment", (response)=>{
							this.experience_data = response['data'];
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
	
	edit_employment(template: TemplateRef<any>, employement_id){
		this.employement_id = employement_id;
		this.employement_popup_title = "Edit Employment";
		this.employement_action_button_text = "Update";
		this.employement_success_message = "Employment updaed successfully.";
		this.show_loader = true;
		
		this.service.get_employment_details(employement_id).subscribe(response=> {
			if(response.status == 200){
				let employment_details = response.data[0];
				this.employment_form_data.company = employment_details.company_name;
				this.employment_form_data.job_title = employment_details.job_title;
				this.employment_form_data.location = employment_details.location;
				this.employment_form_data.location_id = employment_details.location_id;
				/* this.form_data.country = employment_details.country;*/
				
				this.employment_form_data.country = employment_details.country;
				this.employment_form_data.country_id = employment_details.country_id;
				this.employment_form_data.country_name = employment_details.country;
				this.employment_form_data.state_id = employment_details.state_id;
				this.employment_form_data.state = employment_details.state;
				this.employment_form_data.state_name = employment_details.state;
				
				this.employment_form_data.from_month = employment_details.from_month;
				this.employment_form_data.from_year = employment_details.from_year;
				this.employment_form_data.to_month = employment_details.to_month;
				this.employment_form_data.to_year = employment_details.to_year;
				this.employment_form_data.currently = (employment_details.currently == 'true');
				this.employment_form_data.description = employment_details.job_description;
				
				this.get_states(employment_details.country_id, (res)=>{
					this.get_cities(employment_details.state_id, (res)=>{
						this.show_loader = false;
						this.employement_modalRef = this.modalService.show( template, this.common_params.modal_config );
					})
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
					this.get_user_profile_settings("employment", (response)=>{
						this.experience_data = response['data'];
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
	
	onProjectSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.project_form_data));
			this.service.add_update_profile_project(dataset, this.project_id).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.project_success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.projects_modalRef.hide();
						this.get_user_profile_settings("projects", (response)=>{
							this.project_data = response['data'];
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
	
	
	edit_project(template: TemplateRef<any>, project_id){
		this.project_id = project_id;
		this.project_popup_title = "Edit Project";
		this.project_action_button_text = "Update";
		this.project_success_message = "Project updaed successfully.";
		this.show_loader = true;
		
		this.service.get_project_details(project_id).subscribe(response=> {
			if(response.status == 200){
				let project_details = response.data[0];
				this.project_form_data.title = project_details.title;
				this.project_form_data.description = project_details.description;
				this.project_form_data.link = project_details.link;
				this.project_form_data.project_duration = [new Date(project_details.project_start_date) , new Date(project_details.project_end_date)];
				
				this.show_loader = false;
				this.projects_modalRef = this.modalService.show( template, this.common_params.modal_config );
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});	
		
	}
	
	delete_project(project_id){
		if(confirm('Are you sure you want to delete this record ?')){
			this.show_loader = true;
			this.service.delete_project(project_id).subscribe(response=> {
				if(response.status == 200){
					this.show_loader = false;
					this.get_user_profile_settings("projects", (response)=>{
						this.project_data = response['data'];
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
	
	isSelectedDatesCorrect(){
		if((this.lic_cer_form_data.date_earned <= this.lic_cer_form_data.date_expirty)){
			return true;
		}
		else{
			this.common_service.show_toast('e', "Date Expiry can't be a lesser than Date Earned", "");
			return false;
		}
	}
	
	
	on_lic_cer_Submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid && this.isSelectedDatesCorrect()){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.lic_cer_form_data));
			
			var form_obj = new FormData();
			let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
			form_obj.append('user_id', user_id);
			form_obj.append('license_certificate_id', this.lic_cer_id.toString());
			
			if(this.lic_certi_current_selected_file!= undefined && this.lic_certi_current_selected_file!= ""){
				form_obj.append('license_document', this.lic_certi_current_selected_file, this.lic_certi_current_selected_file.name);
			}
			
			form_obj.append('type', dataset.type);
			form_obj.append('title', dataset.title);
			form_obj.append('description', dataset.description);
			form_obj.append('provider', dataset.provider);
			form_obj.append('link', dataset.link);
			form_obj.append('date_earned', dataset.date_earned);
			form_obj.append('date_expirty', dataset.date_expirty);
			
			this.service.add_update_license_certificate(form_obj, this.lic_cer_id).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.lic_cer_success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.license_modalRef.hide();
						this.get_user_profile_settings("student_certificate",(response)=>{
							this.certificate_data = response['data'];
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
	edit_license_certificate(template: TemplateRef<any>, lic_cer_id){
		this.lic_cer_id = lic_cer_id;
		this.lic_cer_popup_title = "Edit License & Certification";
		this.lic_cer_action_button_text = "Update";
		this.lic_cer_success_message = "License & Certification updaed successfully.";
		this.show_loader = true;
		
		this.service.get_license_certificate_details(lic_cer_id).subscribe(response=> {
			if(response.status == 200){
				let project_details = response.data[0];
				this.lic_cer_form_data.type = project_details.type;
				this.lic_cer_form_data.title = project_details.certificate_name;
				this.lic_cer_form_data.description = project_details.description;
				this.lic_cer_form_data.provider = project_details.provider;
				this.lic_cer_form_data.link = project_details.certificate_link;
				this.lic_cer_form_data.date_earned = new Date(project_details.date_earned);
				this.lic_cer_form_data.date_expirty = new Date(project_details.date_ended);
				this.lic_cer_form_data.uploaded_document = this.service_url + '/' + project_details['uploaded_document'];;
				
				this.show_loader = false;
				this.license_modalRef = this.modalService.show( template, this.common_params.modal_config );
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});	
	}
	
	delete_license_certificate(lic_cer_id){
		if(confirm('Are you sure you want to delete this record ?')){
			this.show_loader = true;
			this.service.delete_license_certificate(lic_cer_id).subscribe(response=> {
				if(response.status == 200){
					this.show_loader = false;
					this.get_user_profile_settings("student_certificate", (response)=>{
						this.certificate_data = response['data'];
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
	
	jdfileChangeEvent(event: any): void {
		this.jd_fileChangedEvent = event;
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			this.jd_current_selected_file = event.target.files[0];
			reader.onload = (event) => { 
				this.jd_upload_file = event.target.result;
			}
		}
	}
	
	remove_document(){
		if(confirm('Are you sure you want to delete this job description file ?')){
			this.show_loader = true; 
			this.service.remove_job_description().subscribe(response=> {
				if(response.status == 200){
					this.show_loader = false;
					this.get_user_profile_settings("user-account", (response)=>{
						this.common_service.show_toast('s', "Job Description deleted successfully", "");
						this.user_account_data = response['data'];
						this.show_loader = false; 
						this.additional_user_parameter();
					})
					
				} else {
					this.show_loader = false;
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			});
		}
	}	
	
	edit_title_overview(template: TemplateRef<any>){
		this.title_popup_title = "Edit Title & overview";
		this.title_action_button_text = "Update";
		this.title_success_message = "Title & overview updaed successfully.";
		this.show_loader = true;
		this.title_form_data.uploaded_jd = "";
		
		this.get_user_profile_settings("title-overview", (response)=>{
			if(response['data'].length > 0){
				this.title_form_data.job_title = response['data'][0]['job_title'];
				if(response['data'][0]['uploaded_jd']!= null && response['data'][0]['uploaded_jd']!= ''){
					this.title_form_data.uploaded_jd = this.service_url + '/' + response['data'][0]['uploaded_jd'];;
				}
				this.title_modalRef = this.modalService.show( template, this.common_params.modal_config );
				setTimeout(()=>{
					this.Editor = ClassicEditor;
					this.title_form_data.professional_overview = response['data'][0]['professional_overview']
					console.log(this.title_form_data.professional_overview);
				}, 250);
				this.show_loader = false;
			} else {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
				
			}
		});
	}
	
	on_title_Submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.title_form_data));
			let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
			
			var form_obj = new FormData();
			form_obj.append('user_id', user_id);
			if(this.jd_current_selected_file!= undefined && this.jd_current_selected_file!= ""){
				form_obj.append('uploaded_jd', this.jd_current_selected_file, this.jd_current_selected_file.name);
			}
			
			form_obj.append('job_title', this.title_form_data.job_title);
			form_obj.append('professional_overview', this.title_form_data.professional_overview);
			
			this.service.add_update_profile_title_overview(form_obj).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.title_success_message, "");
					this.get_user_profile_settings("user-account", (response)=>{
						this.user_account_data = response['data'];
						if(this.user_account_data[0]['uploaded_jd']!= null && this.user_account_data[0]['uploaded_jd']!= ''){
							this.user_account_data[0].uploaded_jd = this.service_url + '/' + this.user_account_data[0]['uploaded_jd'];;
						}
						
						this.show_loader = false; 
						this.title_modalRef.hide();
						this.shared_service.loginValue(this.user_account_data);
						this.additional_user_parameter();
					})
					
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
	
	get_industry_label(value){
		if(value!= ''){
			let filtered_index = this.industry_list.findIndex((res)=>{
				return res['id'] == value
			})
			
			if(filtered_index !== -1){
				this.industry_label = this.industry_list[filtered_index]['name'];
			}
		} 
	}
	
	edit_category(template: TemplateRef<any>){
		this.category_popup_title = "Edit Job profile & industry";
		this.category_action_button_text = "Update";
		this.category_success_message = "Job profile & industry updaed successfully.";
		this.show_loader = true;
		
		this.get_job_profile(() => {
			this.get_user_profile_settings('category', (response) => {
				if (response.status == 200) {
					this.category_form_data.category = response.data[0]['category_id']
					if(this.account_access_type == 'Student'){
						this.category_form_data.subcategory = response.data[0]['subcategory_id'];
						this.category_form_data.industry_description = response.data[0]['industry_description']
					}  else if(this.account_access_type == 'Company'){ 
						this.category_form_data.subcategory = response.data[0]['team_department'];
					}
					this.get_industry_list(()=>{
						this.show_loader = false;
						if(this.account_access_type == 'Student'){
							this.get_industry_label(this.category_form_data.subcategory)
						}
						this.category_modalRef = this.modalService.show( template, this.common_params.modal_config );
					});
				}
			});
		});
	}
	
	get_job_profile(callback) {
		setTimeout(() => {
			this.service.get_job_profile('').subscribe(response => {
				if (response.status == 200) {
					this.job_profile_list = response['data'];
					if (callback != "" && callback != undefined) {
						callback()
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
					this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
			});
		}, 50);
	}
	
	get_industry_list(callback) {
		setTimeout(() => {
			this.service.get_industry_list('', 'Student').subscribe(response => {
				if (response.status == 200) {
					this.industry_list = response['data'];
					
					if (callback != "" && callback != undefined) {
						callback()
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
					this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");
			});
		}, 50);
	}
	
	/*get_category_list(callback) {
		setTimeout(() => {
			this.service.get_category_list('').subscribe(response => {
				if (response.status == 200) {
					this.category_list = response['data'];
					if (callback != "" && callback != undefined) {
						callback()
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
					this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");

			});
		}, 50);
	}


	get_subcategory_list(callback) {
		if (this.category_form_data.category != "") {
			this.show_loader = true
			this.service.get_subcategory_list(this.category_form_data.category).subscribe(response => {
				if (response.status == 200) {
					this.subcategory_list = response['data'];
					if (callback != "" && callback != undefined) {
						callback()
					} else {
						this.show_loader = false;
					}
				} else {
					this.show_loader = false;
					this.common_service.show_toast('e', this.common_service.error_message, "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");

			});
		} else {
			this.subcategory_list = [];
			this.category_form_data.subcategory = "";
		}
	}

	get_sub_category() {
		setTimeout(() => {
			this.get_subcategory_list("");
		}, 100)
	}*/
	
	on_category_Submit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.category_form_data));
			this.service.update_profile_category(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', "Category & subcategory saved successfully.", "");
					this.get_user_profile_settings("category", (response)=>{
						this.category_data = response['data'];
						this.show_loader = false; 
						this.category_modalRef.hide();
					})
					
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
	
	get_language_list(callback){
		this.show_loader = true;
		console.log(" in get_language_list ");
		this.service.get_language_list(-1).subscribe(response=> {
			if(response.status == 200){
				this.language_list = response.data;
			} 
			
			if (callback != "" && callback != undefined) {
				callback()
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	add_more_language(){
		this.language_form_data.languages.push({
			"names":"",
			"proficiency":"",
		})
	}
	
	card_delete_language(index){
		this.languages_data.splice(index, 1);
		this.language_success_message = "languages updaed successfully.";
		this.language_form_data.languages = [];
		for(let ldata of this.languages_data){
			this.language_form_data.languages.push({
				"names":ldata.language_name,
				"proficiency":ldata.proficiency,
			});
		}
		
		this.on_language_Submit(true);
	}
	
	form_delete_language(index){
		this.language_form_data.languages.splice(index, 1);
	}
	
	edit_language(template: TemplateRef<any>){
		this.language_popup_title = "Edit languages";
		this.language_action_button_text = "Update";
		this.language_success_message = "languages updaed successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("language", (response)=>{
			if(response['data'].length > 0){
				this.language_form_data.languages = [];
				for(let ldata of response['data']){
					this.language_form_data.languages.push({
						"names":ldata.language_name,
						"proficiency":ldata.proficiency,
					});
				}
			}
			// this.language_data = ;
			this.get_language_list( ()=> {
				this.show_loader = false; 
				this.languages_modalRef = this.modalService.show( template, this.common_params.modal_config );
			});
			
		});
	}
	
	on_language_Submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.language_form_data));
			this.service.add_update_profile_language(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.language_success_message, "");
					this.get_user_profile_settings("language", (response)=>{
						this.languages_data = response['data'];
						this.show_loader = false; 
						if(this.languages_modalRef!= undefined){
							this.languages_modalRef.hide();
						}
					})
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
	
	edit_hourly_rate(template: TemplateRef<any>){
		if(this.account_access_type == 'Student'){
			this.hourly_popup_title = "Edit Salary Expectations";
		} else if(this.account_access_type == 'Company'){
			this.hourly_popup_title = "Edit Proposed Salary";
		}
		this.hourly_action_button_text = "Update";
		this.hourly_success_message = "Expected Salary updaed successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("hourly-rate", (response)=>{
			if(response['data'].length > 0){
				this.hourly_form_data.hourly_date  = response['data'][0]['hourly_rate'];
				this.hourly_form_data.salary_expectation  = response['data'][0]['salary_expectation'];				
				this.hourly_form_data.service_fees = response['data'][0]['service_fees'];
				this.hourly_form_data.receive_rate = response['data'][0]['receive_rate'];
				this.hourly_form_data.job_type     = response['data'][0]['job_type'];
				this.show_loader = false;
				this.hourly_modalRef = this.modalService.show( template, this.common_params.modal_config );
			}
		});
	}
	
	on_hourly_rate_submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.hourly_form_data));
			this.service.add_update_profile_hourlyrate(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.hourly_success_message, "");
					this.show_loader = false;
					this.get_user_profile_settings("user-account", (response)=>{
						this.user_account_data = response['data'];
						this.show_loader = false; 
						this.hourly_modalRef.hide();
						this.shared_service.loginValue(this.user_account_data);
						this.additional_user_parameter();
					})
					
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
	
	get_skills(callback){
		this.show_loader = true;
		console.log(" in get_skills ");
		this.service.get_skills(-1).subscribe(response=> {
			if(response.status == 200){
				this.skills_list = response.data;
			} 
			
			if (callback != "" && callback != undefined) {
				callback(response);
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	select_level(items_value) {
		this.expertise_form_data.expertise_level = items_value;
	}
	
	
	edit_expertise(template: TemplateRef<any>){
		this.expertise_popup_title = "Edit Expertise";
		this.expertise_action_button_text = "Update";
		this.expertise_success_message = "Expertise &  Expertise Level updaed successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("expertise", (response_data)=>{
			if(response_data['data'].length > 0){
				this.expertise_form_data.skills = JSON.parse(response_data['data'][0]['skills']);
				this.expertise_form_data.other = response_data['data'][0]['others'];
				this.expertise_form_data.expertise_level = response_data['data'][0]['level'];
				this.get_skills(()=>{
					this.show_loader = false;
					this.expertise_modalRef = this.modalService.show( template, this.common_params.modal_config );
					
				})
			}
		});
	}
	
	
	on_expertise_submit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.expertise_form_data));
			this.service.update_profile_expertise(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.service.update_profile_expertise_level(dataset).subscribe(res => {
						if (res['status'] == 200) {
							this.common_service.show_toast('s', this.expertise_success_message, "");
							this.get_user_profile_settings("expertise", (response)=>{
								this.expertise_data = response['data'];
								let filter_expertise = this.expertise_level.filter((res)=>{
									return res.value == this.expertise_data[0]['level'];
								})
								this.current_expertise = filter_expertise[0]['heading'];
								console.log("this.expertise_data", this.expertise_data);
								this.expertise_data[0]['skills_arr'] = JSON.parse(this.expertise_data[0]['skills']);
								this.show_loader = false; 
								this.expertise_modalRef.hide();
							})
						} else {
							this.common_service.show_toast('e', this.common_service.error_message, "");
							this.show_loader = false;
						}

					}, error => {
						this.show_loader = false;
						this.common_service.show_toast('e', this.common_service.error_message, "");

					});
					
					
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
	
	
	fileChangeEvent(event: any): void {
		
		this.imageChangedEvent = event;
		
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			let current_selected_file = event.target.files[0];
			reader.onload = (event) => { 
				let upload_file = event.target.result;
			}
		}
		
	}
	
	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
		
		this.imageCrioppedChangedEvent = event;
		this.fileToReturn = this.base64ToFile(
			event.base64,
			this.imageChangedEvent.target.files[0].name,
			)
		
		
		// console.log("FILE OBJ --> ",this.fileToReturn);
		return this.fileToReturn;
	}
	
	base64ToFile(data, filename) {
		const arr = data.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		
		return new File([u8arr], filename, { type: mime });
	}
	
	imageLoaded() {
	}
	
	cropperReady() {
	}
	
	loadImageFailed() {
		this.croppedImage = '';
	}
	
	edit_profile_photo(template: TemplateRef<any>){
		this.profile_photo_popup_title = "Edit Profile Photo";
		this.profile_photo_action_button_text = "Update";
		this.profile_photo_success_message = "Profile Photo updaed successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("profile-photo", (response)=>{
			if(response['data'].length > 0){
				this.preview_profile_photo = this.service_url + '/' + response['data'][0]['profile_photo'];
				this.show_loader = false;
				this.profile_photo_modalRef = this.modalService.show( template, this.common_params.modal_config );
			}
		});
	}
	
	
	on_profile_photo_submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			var form_obj = new FormData();
			let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
			form_obj.append('user_id', user_id);
			
			if(this.fileToReturn!= undefined && this.fileToReturn!= ""){
				form_obj.append('profile_picture', this.fileToReturn,this.fileToReturn.name);
			}
			
			this.service.add_update_profile_photo(form_obj).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.profile_photo_success_message, "");
					this.preview_profile_photo = this.service_url + "/" +res['data']['profile_photo'];
					let user_account:any = this.user_account_data;
					user_account.profile_photo = res['data']['profile_photo'];
					
					this.get_user_profile_settings('user-account', (response)=>{
						this.shared_service.loginValue(response['data']);
						setTimeout(()=>{
							this.show_loader = false;
							this.profile_photo_modalRef.hide();
							this.additional_user_parameter();
							
						}, 200);
					});
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
	
	get_states(country_id, callback){
		this.show_loader = true;
		console.log(" in get_states ");
		this.service.get_states(country_id).subscribe(response=> {
			if(response.status == 200){
				this.state_list = response.data;
			} 
			
			if (callback != "" && callback != undefined) {
				callback(response);
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	get_cities(state_id, callback){
		this.show_loader = true;
		this.service.get_cities(state_id).subscribe(response=> {
			if(response.status == 200){
				this.city_list = response.data;
			} 
			
			if (callback != "" && callback != undefined) {
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
		this.location_form_data.country_name = $event.name;
		this.location_form_data.country_id = $event.id;
		this.get_states($event.id, (res)=>{
			this.show_loader = false;
		})
	}
	
	state_select($event){
		this.location_form_data.state_name  =  $event.name;
		this.location_form_data.state_id  =  $event.id;
		this.get_cities($event.id, (res)=>{
			this.show_loader = false
		})
	}
	
	
	get_prefered_state($event){
		this.job_preference_form_data.country_name = $event.name;
		this.job_preference_form_data.country_id = $event.id;
		this.get_states($event.id, (res)=>{
			this.show_loader = false;
		})
	}
	
	prefered_state_select($event){
		this.job_preference_form_data.state_name  =  $event.name;
		this.job_preference_form_data.state_id  =  $event.id;
	}
	
	get_employment_state($event){
		this.employment_form_data.country_name = $event.name;
		this.employment_form_data.country_id = $event.id;
		this.get_states($event.id, (res)=>{
			this.show_loader = false;
		})
	}
	
	employment_state_select($event){
		this.employment_form_data.state_name  =  $event.name;
		this.employment_form_data.state_id  =  $event.id;
	}
	
	city_select($event){
		this.location_form_data.city_name  =  $event.name;
		this.location_form_data.city_id  =  $event.id;
	}
	
	preference_city_select($event){
		this.job_preference_form_data.location_preference_name  =  $event.name;
		this.job_preference_form_data.location_preference_id  =  $event.id;
	}
	
	get_calling_code(callback){
		this.show_loader = true;
		console.log(" in get_calling_code ");
		this.service.get_calling_code(-1).subscribe(response=> {
			if(response.status == 200){
				this.calling_code_list = response.data;
			} 
			
			if (callback != "" && callback != undefined) {
				callback(response);
			} else {
				this.show_loader = false;
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	code_select($event){
		this.location_form_data.country_calling_id  =  $event.id;
		this.location_form_data.country_calling_code  =  $event.calling_code;
	}
	
	edit_location_phone(template: TemplateRef<any>){
		if(this.account_access_type == 'Student'){
			this.location_popup_title = "Edit Location & Phone";
		} else if(this.account_access_type == 'Company'){
			this.location_popup_title = "Edit Company Location";
			
		}
		this.location_action_button_text = "Update";
		this.location_success_message = "Location & Phone updaed successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("location", (response)=>{
			if(response['data'].length > 0){
				this.location_form_data.country = response['data'][0]['country'];
				this.location_form_data.country_id = response['data'][0]['country_id'];
				this.location_form_data.country_name = response['data'][0]['country'];
				
				this.location_form_data.state_id = response['data'][0]['state_id'];
				this.location_form_data.state = response['data'][0]['state'];
				this.location_form_data.state_name = response['data'][0]['state'];
				
				this.location_form_data.city_id = response['data'][0]['city_id'];
				this.location_form_data.city = response['data'][0]['city'];
				
				this.location_form_data.street_address = response['data'][0]['street_address'];
				this.location_form_data.zipcode = response['data'][0]['zipcode'];
				
				this.location_form_data.country_calling_code = this.user_account_data[0]['country_calling_code'];
				this.location_form_data.country_calling_id = this.user_account_data[0]['country_calling_id'];
				this.location_form_data.phone_number = this.user_account_data[0]['phone_number'];
				
				this.get_states(this.location_form_data.country_id, (res)=>{
					this.get_cities(this.location_form_data.state_id, (res)=>{
						this.get_calling_code(()=>{
							this.show_loader = false;
							this.location_modalRef = this.modalService.show( template, this.common_params.modal_config );
						});
					})
					
				})
			}
		}); 
	}
	
	on_location_submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.location_form_data));
			console.log("dataset ", dataset);
			this.service.add_update_profile_location(dataset).subscribe(res=> {
				if(res['status'] == 200){
					if(this.account_access_type == 'Student'){
						this.service.add_update_profile_phone(dataset).subscribe(res=> {
							if(res['status'] == 200){
								this.common_service.show_toast('s', this.location_success_message, "");
								
								this.get_user_profile_settings("user-account", (response)=>{
									this.user_account_data = response['data'];
									this.show_loader = false; 
									if(this.location_modalRef!= undefined){
										this.location_modalRef.hide();
									}
									this.shared_service.loginValue(this.user_account_data);
									this.additional_user_parameter();
								})
							} else {
								this.common_service.show_toast('e', this.common_service.error_message, "");
								this.show_loader = false;
							}
							
						}, error => {
							this.show_loader = false;
							this.common_service.show_toast('e', this.common_service.error_message, "");
							
						});
						
					} else {
						this.common_service.show_toast('s', this.location_success_message, "");
						
						this.get_user_profile_settings("user-account", (response)=>{
							this.user_account_data = response['data'];
							this.show_loader = false; 
							if(this.location_modalRef!= undefined){
								this.location_modalRef.hide();
							}
							this.shared_service.loginValue(this.user_account_data);
							this.additional_user_parameter();
						})
						
					}
					
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
	
	select_level_job_preference(items_value) {
		this.job_preference_form_data.location_preference = items_value;
	}
	
	edit_job_preference(template: TemplateRef<any>){
		this.job_preference_popup_title = "Edit Job location preference";
		this.job_preference_action_button_text = "Update";
		this.job_preference_success_message = "job Location Preference saved successfully.";
		this.show_loader = true;
		this.city_list = [];
		
		this.get_user_profile_settings("location-preference", (response)=>{
			if(response['data'].length > 0){
				/*this.job_preference_form_data.location_preference = response['data'][0]['location_preference'];
				this.job_preference_form_data.prefered_location_name = response['data'][0]['location_preference_name'];*/
				
				this.job_preference_form_data.location_preference = response['data'][0]['location_preference'];
				this.job_preference_form_data.prefered_country_id = response['data'][0]['prefered_country_id'];
				this.job_preference_form_data.prefered_country = response['data'][0]['prefered_country'];
				this.job_preference_form_data.prefered_state_id = response['data'][0]['prefered_state_id'];
				this.job_preference_form_data.prefered_state = response['data'][0]['prefered_state'];
				this.job_preference_form_data.location_preference_name = response['data'][0]['location_preference_name'];
				this.job_preference_form_data.location_preference_id = response['data'][0]['location_preference_id'];
				
				this.get_countries((country_response)=>{
					this.get_states(this.job_preference_form_data.prefered_country_id, (res)=>{
						this.get_cities(this.job_preference_form_data.prefered_state_id, (res)=>{
							this.show_loader = false;
						})
					})
				});
				
				this.show_loader = false;
				this.job_preference_modalRef = this.modalService.show( template, this.common_params.modal_config );
			}
		});
	}
	
	on_job_preference_rate_submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.job_preference_form_data));
			this.service.update_profile_job_location_preference(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', this.job_preference_success_message, "");
					this.get_user_profile_settings('user-account', (response)=>{
						this.shared_service.loginValue(response['data']);
						this.user_account_data = response['data'];
						
						this.additional_user_parameter(); 	
						setTimeout(()=>{
							this.show_loader = false;
							this.job_preference_modalRef.hide();
							
						}, 200);
					});
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
	
	select_level_timeline_hiring(items_value) {
		this.timeline_hiring_form_data.timeline_hiring = items_value;
	}


	edit_timeline_hiring(template: TemplateRef<any>){
		this.timeline_hiring_popup_title = "Edit Timeline for Hiring";
		this.timeline_hiring_action_button_text = "Update";
		this.timeline_hiring_success_message = "Timeline for Hiring saved successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("timeline-hiring", (response)=>{
			if(response['data'].length > 0){
				this.timeline_hiring_form_data.timeline_hiring = response['data'][0]['timeline_hiring'];
				this.timeline_hiring_form_data.timeline_hiring_weeks = response['data'][0]['timeline_hiring_weeks'];
				
				this.show_loader = false;
				this.timeline_hiring_modalRef = this.modalService.show( template, this.common_params.modal_config );
			}
		});
	}
	
	on_timeline_hiring_rate_submit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.timeline_hiring_form_data));
			this.service.update_profile_job_timeline_hiring(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', this.timeline_hiring_success_message, "");
					this.get_user_profile_settings('user-account', (response)=>{
						this.shared_service.loginValue(response['data']);
						this.user_account_data = response['data'];
						this.additional_user_parameter(); 	
						
						setTimeout(()=>{
							this.show_loader = false;
							this.timeline_hiring_modalRef.hide();
							
						}, 200);
					});
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
	
	select_level_job_type(items_value) {
		this.job_type_form_data.job_type = items_value;
	}
	
	edit_job_type(template: TemplateRef<any>){
		this.job_type_popup_title = "Edit Job Type";
		this.job_type_action_button_text = "Update";
		this.job_type_success_message = "Job Type saved successfully.";
		this.show_loader = true;
		
		this.get_user_profile_settings("job_type", (response)=>{
			if(response['data'].length > 0){
				this.job_type_form_data.job_type = parseInt(response['data'][0]['job_type']);
				this.show_loader = false;
				this.job_type_modalRef = this.modalService.show( template, this.common_params.modal_config );
			}
		});
	}
	
	on_job_type_rate_submit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.job_type_form_data));
			this.service.update_profile_job_type(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', "Job Type saved successfully.", "");
					this.get_user_profile_settings('user-account', (response)=>{
						this.shared_service.loginValue(response['data']);
						this.user_account_data = response['data'];
						this.additional_user_parameter(); 	
						
						setTimeout(()=>{
							this.show_loader = false;
							this.job_type_modalRef.hide();
							
						}, 200);
					});
					
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
	
	finish_review(){
		this.common_service.change_route("/user/dashboard");
	}

}