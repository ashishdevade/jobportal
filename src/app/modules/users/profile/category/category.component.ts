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

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		if(sessionStorage.account_type == 'Company'){
			this.page_id = 2;
		}
		
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.form_data.category = "";
		this.form_data.subcategory = "";

		this.show_loader = true;
		this.get_category_list(() => {
			this.get_user_profile_settings((response) => {
				if (response.status == 200) {
					if(response.data.length > 0){
						this.form_data.category = response.data[0]['category_id']
						this.form_data.subcategory = response.data[0]['subcategory_id']
						this.get_subcategory_list('');
					} else {
						this.show_loader = false;
					}
				} 
			});
		});
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

	get_category_list(callback) {
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

	}

	get_sub_category() {
		setTimeout(() => {
			this.get_subcategory_list("");
		}, 100)
	}

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
}