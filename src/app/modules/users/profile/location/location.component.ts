
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


@Component({
	selector: 'app-location',
	templateUrl: './location.component.html',
	styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

	public page_id = 10;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public success_message = "Location saved successfully.";
	public links:any = {};
	public country_list = [];
	public state_list = [];
	public city_list = [];
	public header_card_title = 'Location'; 
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();	
		
		if(sessionStorage.account_type == 'Company'){
			this.header_card_title = "Company Location";
			this.page_id = 10;
		}
		
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		this.get_countries("");
		this.form_data.country = [];
		this.form_data.city = "";
		this.form_data.street_address = "";
		this.form_data.zipcode = "";
		
		
		
		this.get_user_profile_settings((response)=>{
			if(response['data'].length > 0){
				this.form_data.country = response['data'][0]['country'];
				this.form_data.country_id = response['data'][0]['country_id'];
				this.form_data.country_name = response['data'][0]['country'];
				
				this.form_data.state_id = response['data'][0]['state_id'];
				this.form_data.state = response['data'][0]['state'];
				this.form_data.state_name = response['data'][0]['state'];
				
				this.form_data.city_id = response['data'][0]['city_id'];
				this.form_data.city = response['data'][0]['city'];
				this.form_data.city_name = response['data'][0]['city'];
				
				this.form_data.street_address = response['data'][0]['street_address'];
				this.form_data.zipcode = response['data'][0]['zipcode'];
				
				this.get_states(this.form_data.country_id, (res)=>{
					this.get_cities(this.form_data.state_id, (res)=>{
						this.show_loader = false;
					})
				})
			}
		});
	}
	
	get_countries(callback){
		this.show_loader = true;
		this.service.get_countries(-1).subscribe(response=> {
			if(response.status == 200){
				this.country_list = response.data;
			}
			
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
	
	
	get_states(country_id, callback){
		this.show_loader = true;
		this.service.get_states(country_id).subscribe(response=> {
			if(response.status == 200){
				this.state_list = response.data;
			} 
			
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
		this.get_states($event.id, (res)=>{
			this.show_loader = false
		})
	}
	
	state_select($event){
		this.form_data.state_name  =  $event.name;
		this.form_data.state_id  =  $event.id;
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
		this.form_data.city_name  =  $event.name;
		this.form_data.city_id  =  $event.id;
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('location').subscribe(response=> {
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
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_location(dataset).subscribe(res=> {
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
	
	back_to_title_overview(){
		this.common_service.change_route(this.links.previous_link);
	}

}
