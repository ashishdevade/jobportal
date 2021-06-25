import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { varConstants } from 'src/app/core/helpers/variable.constants';

import { CommonFunctions } from "../../../core/helpers/common.functions";
import { CommonService } from "../../../core/services/common.service";
import { MainService } from "../../../core/services/main.service";
import { SharedService } from "../../../core/services/shared.service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public common_params = new CommonFunctions();
	public email_address: any = "";
	public user_password: any = "";
	public show_loader = false;
	className = LoginComponent.name;
	constructor(
		private router: Router,
		public common_service: CommonService,
		public service: MainService,
		public shared_service : SharedService
		) { }

	ngOnInit() {
		//	this.common_service.show_toast('s', "Connection missing, Please select a connection .", "");
		//	this.show_loader = true;
		this.common_service.PrintLogs(varConstants.INFO, this.className, this.ngOnInit.name, "APP INIT");
	}


	onSubmit(isValid: Boolean) {
		console.log("isValid ", isValid);
		if (isValid) {
			this.show_loader = true;
			this.service.check_login(this.email_address, this.user_password).subscribe(response => {
				
				if (response['data'].length > 0) {
					let user_account = response['data'];
					if(user_account[0]['is_registered_complete'] == 1){
						sessionStorage.setItem("is_logged_in", '1');
						sessionStorage.setItem("user_id", user_account[0]['user_account_id']);
						sessionStorage.setItem("user_details", JSON.stringify(user_account[0]));
						sessionStorage.setItem("account_type", user_account[0]['account_type']);
						
						this.show_loader = false;
						// this.common_service.show_toast('s', "Redirecting to dashboard.", "");
						this.common_service.PrintLogs(varConstants.INFO, this.className, this.ngOnInit.name, "Redirecting to dashboard");
						setTimeout(() => {
							this.shared_service.loginValue(user_account);
							let setting_list = [];
							if(sessionStorage.account_type == 'Company'){
								setting_list = this.common_params.company_profile_settings_list;
							} else if(sessionStorage.account_type == 'Student'){
								setting_list = this.common_params.profile_settings_list;
							}
							// let next_page_id = (parseInt(user_account[0]['profile_completed']) + 1);
							
							let link:any = "";
							if(parseInt(user_account[0]['profile_completed']) == 0){
								link = setting_list[0]['link']
							} else {
								let get_profile_screen = setting_list.filter((obj) => {
									return parseInt(obj.page_id) == parseInt(user_account[0]['profile_completed'])
								});
								
								if(get_profile_screen.length > 0){
									let next_page = get_profile_screen[0]['next_page'];
									
									let next_screen = setting_list.filter((obj) => {
										return parseInt(obj.page_id) == next_page
									});
									
									if(next_screen.length > 0){
										link = next_screen[0]['link']
									} else {
										link = '/user/dashboard';
									}
									
								} else {
									link = '/user/dashboard';
								}
							}
							
							/*if (link.length > 0) {*/
								this.common_service.change_route(link);
							/*} else {
								this.common_service.change_route('/user/dashboard');
							}*/

						}, 400);		
					} else {
						sessionStorage.setItem("user_id", user_account[0]['user_account_id']);
						sessionStorage.setItem("user_details", JSON.stringify(user_account[0]));
						this.common_service.change_route('/auth/change-otp/' + this.user_password);
						
					}
					
					this.show_loader = false;
				} else {
					this.user_password = '';
					this.show_loader = false;
					this.common_service.show_toast('w', "Invalid Username & Password, Please try again.", "");
				}
			}, error => {
				this.show_loader = false;
				this.common_service.show_toast('e', "There was some error, Please try again.", "");
			});
		}
	}

}
