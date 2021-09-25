import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd  } from '@angular/router';
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
	public hide_top_optios = false
	
	public account_type = '';
	
	public items: string[] = [
	'The first choice!',
	'And another choice for you.',
	'but wait! A third!'
	];

	constructor(
		private router: Router,
		private ActivatedRoute: ActivatedRoute,
		public common_service:CommonService, 
		public service:MainService,
		public shared_service : SharedService
		) {
		this.router.events.subscribe((ev) => {
			if (ev instanceof NavigationEnd) {
				let href_var = (location.href.split('#')[1]);
				if(href_var.indexOf('admin') !== -1){
					this.hide_top_optios = false;
				} else {
					this.hide_top_optios = true;
				}
				
				this.header_flag = (sessionStorage.is_logged_in!= undefined ) ? sessionStorage.is_logged_in : 0; 
				
				if(this.header_flag == '1'){
					this.account_type = sessionStorage.account_type
				}
			}
		});
		
		this.shared_service.loginValueData.subscribe((obj)=>{
			this.header_open_toggle = false;
			this.user_account_data = obj;
			this.preview_image =  this.common_params.application_path + this.common_params.default_image;
			if(this.user_account_data.length > 0){
				if(this.user_account_data[0]['profile_photo']!= '' && this.user_account_data[0]['profile_photo']!= null ){
					this.preview_image = this.service_url + '/' + this.user_account_data[0]['profile_photo'];
				}
			}
			this.header_flag = sessionStorage.is_logged_in;
			
			if(this.header_flag == '1'){
				this.account_type = sessionStorage.account_type
			}
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
	
	onHidden(): void {
		console.log('Dropdown is hidden');
	}
	onShown(): void {
		console.log('Dropdown is shown');
	}
	isOpenChange(): void {
		console.log('Dropdown state is changed');
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
