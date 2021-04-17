import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { varConstants } from 'src/app/core/helpers/variable.constants';

import { CommonFunctions } from "../../../core/helpers/common.functions";
import { CommonService } from "../../../core/services/common.service";
import { MainService } from "../../../core/services/main.service";

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
				console.log("response ", response);
				if (response['data'].length > 0) {
					sessionStorage.setItem("is_logged_in", '1');
					sessionStorage.setItem("user_id", response['data'][0]['user_account_id']);
					sessionStorage.setItem("user_details", JSON.stringify(response['data'][0]));
					this.show_loader = false;
					// this.common_service.show_toast('s', "Redirecting to dashboard.", "");
					this.common_service.PrintLogs(varConstants.INFO, this.className, this.ngOnInit.name, "Redirecting to dashboard");
					setTimeout(() => {

						let new_page_id = (parseInt(response['data'][0]['profile_completed']) + 1);
						console.log("new_page_id ", new_page_id);
						let profile_page = this.common_params.profile_settings_list.filter((obj) => {
							return parseInt(obj.page_id) == new_page_id
						});
						console.log("profile_page ", profile_page);
						if (profile_page.length > 0) {
							this.common_service.change_route(profile_page[0]['link']);
						} else {
							this.common_service.change_route('/user/dashboard');
						}

					}, 400);
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
