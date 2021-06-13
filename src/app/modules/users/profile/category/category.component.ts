import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

@Component({
	selector: 'app-category',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

	public page_id = 1;
	public common_params = new CommonFunctions();
	public profile_side_menu = [];
	public category_list = [];
	public show_loader = false;
	public sub_category_list = [];
	public form_data: any = {};
	public links:any = {};
	public lang = {};
	public account_access_type = "";
	public job_profile_list = [];
	public industry_list = [];
	public industry_label = "";

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		this.account_access_type = sessionStorage.account_type;
		if(this.account_access_type == 'Company'){
			this.page_id = 2;
			this.lang['category_title'] = "Job Profile";
			this.lang['subcategory_title'] = "Which Team/Department this role comes under?";
		} else {
			this.lang['category_title'] = "Select a Job Profile you are interested in";
			this.lang['subcategory_title'] = "Select the type of Industry you would like to work in";
		}
		
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.form_data.category = "";
		this.form_data.subcategory = "";
		this.form_data.industry_description = "";

		this.show_loader = true;
		this.get_job_profile(() => {
			this.get_user_profile_settings((response) => {
				if (response.status == 200) {
					if(response.data.length > 0){
						this.form_data.category = response.data[0]['category_id'];
						if(this.account_access_type == 'Student'){
							this.form_data.subcategory = response.data[0]['subcategory_id']
							this.form_data.industry_description = response.data[0]['industry_description']
						} else {
							this.form_data.subcategory = response.data[0]['team_department']
						}
						//	this.get_subcategory_list('');
						this.get_industry_list((res)=>{
							this.show_loader = false;
							if(this.account_access_type == 'Student'){
								this.get_industry_label(this.form_data.subcategory)
							}
						});
					} else {
						this.show_loader = false;
					}
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

	get_user_profile_settings(callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings('category').subscribe(response => {
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
		if (this.form_data.category != "") {
			this.show_loader = true
			this.service.get_subcategory_list(this.form_data.category).subscribe(response => {
				if (response.status == 200) {
					this.sub_category_list = response['data'];
				} else {
					this.show_loader = false;
					this.common_service.show_toast('e', this.common_service.error_message, "");
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
		} else {
			this.sub_category_list = [];
			this.form_data.subcategory = "";
		}

	}*/

	/*get_sub_category() {
		setTimeout(() => {
			this.get_subcategory_list("");
		}, 100)
	}*/

	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_category(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', "Category & subcategory saved successfully.", "");
					this.show_loader = false;

					setTimeout(() => {
						this.common_service.change_route(this.links.next_link);
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
	
	back_to(){
		this.common_service.change_route(this.links.previous_link);
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
}