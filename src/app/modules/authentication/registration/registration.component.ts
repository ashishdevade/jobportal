import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../core/helpers/common.functions";
import { CommonService } from "../../../core/services/common.service";
import { MainService } from "../../../core/services/main.service";

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

	public common_params = new CommonFunctions();
	public firstname = "";
	public lastname = "";
	public email_address = "";
	public user_password = "";
	public re_enter_password = "";
	public account_type = "Student";
	public show_loader = false;
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }

	ngOnInit() {
	}
	
	
	onSubmit(isValid: Boolean){
		if (isValid){
			if(this.user_password == this.re_enter_password){
				this.show_loader = true;
				
				this.service.registration(this.firstname,this.lastname, this.email_address, this.re_enter_password, this.account_type).subscribe(response => {
					console.log("response ", response );
					if(response['data'] != undefined){
						
						sessionStorage.setItem("is_logged_in", '1');
						sessionStorage.setItem("user_id", response['data']['user_account_id']);
						sessionStorage.setItem("user_details", JSON.stringify(response['data']));
						this.show_loader = false;
						this.common_service.show_toast('s', "Redirecting to dashboard.", "");
						this.common_service.change_route(['/user/dashboard']);
						this.show_loader = false;
					} else {
						this.user_password = '';
						this.re_enter_password = '';
						this.show_loader = false;
						this.common_service.show_toast('w', response['msg'], "");
					}
				}, error=> {
					this.show_loader = false;
					this.common_service.show_toast('e', "There was some error, Please try again.", "");
				});
			} else {
					this.common_service.show_toast('e', "Password Doesnt match.", "");
				
			}
		}
	}

}