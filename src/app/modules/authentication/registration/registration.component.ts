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
	public company_name = "";
	public industry:any = '';
	public other_industry = "";
	public firstname = "";
	public lastname = "";
	public email_address = "";
	public user_password = "";
	public re_enter_password = "";
	public account_type = "Student";
	public show_loader = false;
	public industry_list = [];
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }

	ngOnInit() {
		this.industry = '';
		this.get_industry_list("");
	}
	
	get_industry_list(callback) {
		setTimeout(() => {
			this.service.get_industry_list('', 'Company').subscribe(response => {
				if (response.status == 200) {
					this.industry_list = response['data'];
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
	
	
	onSubmit(isValid: Boolean){
		if (isValid){
			// if(this.user_password == this.re_enter_password){
				this.user_password = this.common_params.generate_random_pass(12);
				this.re_enter_password = this.user_password;
				this.show_loader = true;
				this.service.registration(this.firstname,this.lastname, this.email_address, this.re_enter_password, this.account_type, this.company_name, this.industry, this.other_industry).subscribe(response => {
					console.log("response ", response );
					if(response['data'] != undefined){
						this.show_loader = false;
						this.common_service.show_toast('s', "Thank you for your registration. We have sent a generate password link to your mentioned email id.", "");
						this.common_service.change_route(['/auth/login']);
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
			/*} else {
				this.common_service.show_toast('e', "Password Doesnt match.", "");
				
			}*/
		}
	}
	
	select_industry(){
		if(this.industry !+ -1){
			this.other_industry = '';
		}
	}

}
