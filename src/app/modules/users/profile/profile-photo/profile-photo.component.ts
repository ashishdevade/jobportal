
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-profile-photo',
	templateUrl: './profile-photo.component.html',
	styleUrls: ['./profile-photo.component.scss']
})
export class ProfilePhotoComponent implements OnInit {

	public page_id = 9;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public popup_title = "";
	public action_button_text = "";
	public success_message = "Profile Picture Saved Successfully";
	modalRef: BsModalRef;
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		private modalService: BsModalService
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.profile_settings_list;
		
		this.popup_title = "Add profile photo";
		this.action_button_text	 = "Save";
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('employment').subscribe(response=> {
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
	
	
	skip_steps(){
		this.show_loader = true; 
		this.service.skip_this_step(this.page_id).subscribe(response=> {
			if(response.status == 200){
				this.show_loader = false;
				this.common_service.change_route('user/profile/location');
				
			} else {
				this.show_loader = false;
				//	this.common_service.show_toast('e', this.common_service.error_message, "");
			}
		}, error => {
			this.show_loader = false;
			this.common_service.show_toast('e', this.common_service.error_message, "");
			
		});
	}
	
	add_new_photo(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show( template, this.common_params.modal_config );
	}
	
	back_to_titleoverview(){
		console.log("in here ");
		this.common_service.change_route('user/profile/title-overview');
	}
	
	go_to_location(){
		if(this.form_data.photo == ""){
			this.common_service.show_toast('e', 'No Profile Photo added, Please add employment by clicking "Add Prfofile Photo"', "");
		} else {
			this.common_service.change_route('user/profile/location');
		}
		
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.add_update_profile_photo(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					
					setTimeout(()=>{
						this.show_loader = false;
						this.modalRef.hide();
						
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
