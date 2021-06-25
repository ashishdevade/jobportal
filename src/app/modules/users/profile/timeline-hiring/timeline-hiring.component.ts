import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


@Component({
	selector: 'app-timeline-hiring',
	templateUrl: './timeline-hiring.component.html',
	styleUrls: ['./timeline-hiring.component.scss']
})
export class TimelineHiringComponent implements OnInit {
	
	public page_id = 16;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data: any = {};
	public profile_side_menu = [];
	public links:any = {};
	public timeline_hiring = [];
	public to_week_array = [];

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		if(sessionStorage.account_type == 'Company'){
			this.page_id = 16;
		}
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id);
		this.timeline_hiring = this.common_params.timeline_hiring;
		
		/*for (let i = 1; i <= 52; i++) {
			this.to_week_array.push(i);
		}*/
		
		this.to_week_array = this.common_params.timeline_hiring_weekly_list;
		
		this.form_data.timeline_hiring = this.timeline_hiring[0]['value'];
		this.form_data.timeline_hiring_weeks = "";
		this.show_loader = true;
		this.get_user_profile_settings((response) => {
			this.show_loader = false;
			if(response['status'] == 200){
				if(response.data.length > 0){
					this.form_data.timeline_hiring = response['data'][0]['timeline_hiring'];
					this.form_data.timeline_hiring_weeks = response['data'][0]['timeline_hiring_weeks'];
				}
			}
		})
		
		
	}

	select_level(items_value) {
		this.form_data.timeline_hiring = items_value;
	}

	get_user_profile_settings(callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings('timeline-hiring').subscribe(response => {
				if (callback!= '' && callback!= undefined) {
					callback(response);
				} else {
					this.show_loader = false;
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', this.common_service.error_message, "");

			});
		}, 50);
	}

	back_to_expertise() {
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}

	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_job_timeline_hiring(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', "Job Location Preference saved successfully.", "");
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


}
