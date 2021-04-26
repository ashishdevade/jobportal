import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss']
})
export class JobTypeComponent implements OnInit {

	public page_id = 14;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data: any = {};
	public profile_side_menu = [];
	public links:any = {};
	public autocompleteItems = ['Item1', 'item2', 'item3'];
	public job_type = [
		{ value: 1, heading: 'Part Time', description: "I am looking for part time job" },
		{ value: 2, heading: 'Full Time', description: "I am looking for full time job" },
		{ value: 3, heading: 'Intern', description: "Here to learn by work and while having fun in the process" },
		{ value: 4, heading: 'Contract', description: "I am looking for some long term contracts" },
		{ value: 5, heading: 'Freelance', description: "Anything to work on that fits my criteria as freelancer" },
	];

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
	) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.profile_settings_list;
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.form_data.job_type = this.job_type[0]['value'];
		this.show_loader = true;
		this.get_user_profile_settings((response) => {
			this.form_data.job_type = parseInt(response['data'][0]['job_type']);
			this.show_loader = false;
		})
	}

	select_level(items_value) {
		this.form_data.job_type = items_value;
	}

	get_user_profile_settings(callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings('job_type').subscribe(response => {
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

	back_to_expertise() {
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}

	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_job_type(dataset).subscribe(res => {
				if (res['status'] == 200) {
					this.common_service.show_toast('s', "Job Type saved successfully.", "");
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
