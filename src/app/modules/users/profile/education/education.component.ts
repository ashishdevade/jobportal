
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';


@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
	@ViewChild('educationform') educationform: any;
	public page_id = 4;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data: any = {};
	public profile_side_menu = [];
	public from_year_array = [];
	public to_year_array = [];
	public education_id = -1;
	public success_message = "";
	public education_list = [];
	public popup_title = "";
	public action_button_text = "";
	public links:any = {};

	modalRef: BsModalRef;

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		private modalService: BsModalService
	) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id);
		this.form_data.from_year = "";
		this.form_data.to_year = "";
		let d = new Date();
		for (let i = d.getFullYear(); i >= (d.getFullYear() - 50); i--) {
			this.from_year_array.push(i);
		}

		for (let i = (d.getFullYear() + 10); i >= (d.getFullYear() - 50); i--) {
			this.to_year_array.push(i);
		}

		this.show_loader = true;
		this.get_user_profile_settings((response) => {
			this.education_list = response['data'];
			this.show_loader = false;
		})
	}

	get_user_profile_settings(callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings('education').subscribe(response => {
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

	back_to_expertise_level() {
		this.common_service.change_route(this.links.previous_link);
	}

	go_to_exployment() {
		if (this.education_list.length == 0) {
			this.common_service.show_toast('e', 'No Education Details added, Please add education by clicking "Add Education"', "");

		} else {
			this.common_service.change_route(this.links.next_link);
		}

	}
	
	/*skip_steps(){
		this.show_loader = true; 
		this.service.skip_this_step(this.page_id).subscribe(response=> {
			if(response.status == 200){
				this.show_loader = false;
				this.common_service.change_route('user/profile/employment');

			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");

		});
	}*/

	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid && this.isYearValuesCorrect()) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_education(dataset, this.education_id).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', this.success_message, "");

					setTimeout(() => {
						this.show_loader = false;
						this.modalRef.hide();
						this.get_user_profile_settings((response) => {
							this.education_list = response['data'];
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

	add_new_education(template: TemplateRef<any>) {
		this.education_id = -1;
		this.form_data.school = "";
		this.form_data.study = "";
		this.form_data.degree = "";
		this.form_data.from_year = "";
		this.form_data.to_year = "";
		this.form_data.description = "";
		this.popup_title = "Add Education";
		this.action_button_text = "Save";
		this.success_message = "Education saved successfully.";
		this.modalRef = this.modalService.show(template,this.common_params.modal_config );
	}

	edit_education(template: TemplateRef<any>, education_id) {
		this.education_id = education_id;
		this.popup_title = "Edit Education";
		this.action_button_text = "Update";
		this.success_message = "Education updaed successfully.";
		this.show_loader = true;
		this.service.get_education_details(education_id).subscribe(response=> {
			if(response.status == 200){
				let education_details = response.data[0];
				this.form_data.school = education_details.school;
				this.form_data.study = education_details.study;
				this.form_data.degree = education_details.degree;
				this.form_data.from_year = education_details.from_year;
				this.form_data.to_year = education_details.to_year;
				this.form_data.description = education_details.description;

				this.show_loader = false;
				this.modalRef = this.modalService.show(template, this.common_params.modal_config );
			} else {
				this.show_loader = false;
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
					this.get_user_profile_settings((response) => {
						this.education_list = response['data'];
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
		if(this.form_data.from_year && this.form_data.to_year){
			if(this.form_data.from_year > this.form_data.to_year){
				this.common_service.show_toast('e', "Education Period From Year value can't be greater than To Year value", "");
				return false;	
			}else{
				return true;
			}
		}
	}
}
