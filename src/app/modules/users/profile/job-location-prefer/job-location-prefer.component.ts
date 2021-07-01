import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

@Component({
	selector: 'app-job-location-prefer',
	templateUrl: './job-location-prefer.component.html',
	styleUrls: ['./job-location-prefer.component.scss']
})
export class JobLocationPreferComponent implements OnInit {
	public page_id = 15;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data: any = {};
	public profile_side_menu = [];
	public links:any = {};
	public location_preference = [];
	public country_list = [];
	public state_list = [];
	public city_list = [];

	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		) { }

	ngOnInit() {
		// this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		if(sessionStorage.account_type == 'Company'){
			this.page_id = 15;
		}
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id);
		this.location_preference = this.common_params.location_preference;
		this.form_data.location_preference = this.location_preference[0]['value'];
		this.show_loader = true;
		this.get_user_profile_settings((response) => {
			
			this.show_loader = false;
			if(response['status'] == 200){
				if(response.data.length > 0){
					this.form_data.location_preference = response['data'][0]['location_preference'];
					this.form_data.prefered_country_id = response['data'][0]['prefered_country_id'];
					this.form_data.prefered_country = response['data'][0]['prefered_country'];
					this.form_data.prefered_state_id = response['data'][0]['prefered_state_id'];
					this.form_data.prefered_state = response['data'][0]['prefered_state'];
					this.form_data.location_preference_name = response['data'][0]['location_preference_name'];
					this.form_data.location_preference_id = response['data'][0]['location_preference_id'];
					/*this.form_data.prefered_street_address = response['data'][0]['prefered_street_address'];
					this.form_data.prefered_zipcode = response['data'][0]['prefered_zipcode'];*/
					this.get_countries((country_response)=>{
						this.get_states(this.form_data.prefered_country_id, (res)=>{
							this.get_cities(this.form_data.prefered_state_id, (res)=>{
								this.show_loader = false;
							})
						})
					});
				}
			}
		})
	}

	select_level(items_value) {
		this.form_data.location_preference = items_value;
	}

	get_user_profile_settings(callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings('location-preference').subscribe(response => {
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
	
	get_countries(callback){
		this.show_loader = true;
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
	
	
	get_states(country_id, callback){
		this.show_loader = true;
		this.service.get_states(country_id).subscribe(response=> {
			if(response.status == 200){
				this.state_list = response.data;
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
	
	get_state($event){
		this.form_data.prefered_country = $event.name;
		this.form_data.prefered_country_id = $event.id;
		
		this.get_states($event.id, (res)=>{
			this.show_loader = false;
		})
	}
	
	state_select($event){
		this.form_data.prefered_state  =  $event.name;
		this.form_data.prefered_state_id  =  $event.id;
		this.get_cities($event.id, (res)=>{
			this.show_loader = false
		})
	}
	
	get_cities(state_id, callback){
		this.show_loader = true;
		this.service.get_cities(state_id).subscribe(response=> {
			if(response.status == 200){
				this.city_list = response.data;
			} 
			this.show_loader = false;
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
		});
	}
	
	city_select($event){
		this.form_data.location_preference_name  =  $event.name;
		this.form_data.location_preference_id  =  $event.id;
	}

	back_to_expertise() {
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
	}

	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			console.log("form_data ", this.form_data);
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_job_location_preference(dataset).subscribe(res => {
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
