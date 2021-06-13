import { Component, OnInit } from '@angular/core';
import { CommonFunctions } from "../../core/helpers/common.functions";
import { MainService } from "../../core/services/main.service";
import { CommonService } from "../../core/services/common.service";
import { SharedService } from "../../core/services/shared.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	public common_params = new CommonFunctions();
	public config_data;
	public current_version = '';
	public header_open_toggle = false;
	public header_flag;	
	public preview_image = "";
	public user_account_data = [];
	public service_url = "";

	constructor(
		public common_service:CommonService, 
		public service:MainService,
		public shared_service : SharedService
		) {
		
		this.shared_service.loginValueData.subscribe((obj)=>{
			this.header_open_toggle = false;
			this.user_account_data = obj;
			console.log("this.common_params.application_path ", this.common_params.application_path);
			this.preview_image =  this.common_params.application_path + this.common_params.default_image;
			if(this.user_account_data.length > 0){
				if(this.user_account_data[0]['profile_photo']!= '' && this.user_account_data[0]['profile_photo']!= null ){
					this.preview_image = this.service_url + '/' + this.user_account_data[0]['profile_photo'];
				}
			}
			this.header_flag = sessionStorage.is_logged_in;
		});
		
	}

	ngOnInit() {
		this.config_data = JSON.parse(sessionStorage.getItem('system_config'));
		this.preview_image =  this.common_params.application_path + this.common_params.default_image;
		this.service.get_config((config_data) => {
			this.config_data = JSON.parse(config_data);		
			this.service_url = this.config_data['service_url'];
			if(Object.keys(this.config_data).length > 0){
				this.current_version = this.config_data.version;
			}
			
			if(this.header_flag == '1'){
				this.get_user_profile_settings("user-account", (response)=>{
					this.user_account_data = response['data'];
					if(this.user_account_data.length > 0){
						if(this.user_account_data[0]['profile_photo']!= '' && this.user_account_data[0]['profile_photo']!= null ){
							this.preview_image = this.service_url + '/' + this.user_account_data[0]['profile_photo'];
						}
					}
				})
			}
		});
		
	}
	
	get_user_profile_settings(type, callback) {
		setTimeout(() => {
			this.service.get_user_profile_settings(type).subscribe(response => {
				if (response.status == 200) {
					if (callback != "" && callback != undefined) {
						callback(response);
					} 
				} 
			}, error => {
				this.common_service.show_toast('e', this.common_service.error_message, "");

			});
		}, 50);
	}

}
