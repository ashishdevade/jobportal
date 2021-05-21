
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";
import { SharedService } from "../../../../core/services/shared.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
	public links:any = {};
	public success_message = "Profile Picture Saved Successfully";
	modalRef: BsModalRef;
	imageChangedEvent: any = '';
	imageCrioppedChangedEvent: any = '';
	croppedImage: any = '';
	public preview_profile_photo:any = '';
	public service_url = '';
	fileToReturn:any;
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		private modalService: BsModalService,
		public shared_service : SharedService
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		
		this.popup_title = "Add profile photo";
		this.action_button_text	 = "Save";
		this.service_url = JSON.parse(sessionStorage.system_config)['service_url'];
		
		this.show_loader = true;
		this.get_user_profile_settings('profile-photo', (response)=>{
			this.preview_profile_photo = this.service_url + '/' + response['data'][0]['profile_photo'];
			this.show_loader = false; 
			
		});
	}
	

	fileChangeEvent(event: any): void {
		
		this.imageChangedEvent = event;
		
		if (event.target.files && event.target.files[0]) {
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			let current_selected_file = event.target.files[0];
			reader.onload = (event) => { 
				let upload_file = event.target.result;
			}
		}
		
	}
	
	imageCropped(event: ImageCroppedEvent) {
		this.croppedImage = event.base64;
		
		this.imageCrioppedChangedEvent = event;
		this.fileToReturn = this.base64ToFile(
			event.base64,
			this.imageChangedEvent.target.files[0].name,
			)
		
		
		// console.log("FILE OBJ --> ",this.fileToReturn);
		return this.fileToReturn;
	}
	
	base64ToFile(data, filename) {
		const arr = data.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		let u8arr = new Uint8Array(n);
		
		while(n--){
			u8arr[n] = bstr.charCodeAt(n);
		}
		
		return new File([u8arr], filename, { type: mime });
	}
	
	imageLoaded() {
	}
	
	cropperReady() {
	}
	
	loadImageFailed() {
		this.croppedImage = '';
	}
	
	imageFile(event: ImageData){
		console.log("IMAGE FIEevent--",event)
	}
	get_user_profile_settings(type, callback){
		setTimeout(() => {
			this.service.get_user_profile_settings(type).subscribe(response=> {
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
				this.common_service.change_route(this.links.next_link);
				
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
		
		this.common_service.change_route(this.links.previous_link);
	}
	
	go_to_location(){
		if(this.form_data.photo == ""){
			this.common_service.show_toast('e', 'No Profile Photo added, Please add employment by clicking "Add Prfofile Photo"', "");
		} else {
			this.common_service.change_route(this.links.next_link);
		}
		
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			var form_obj = new FormData();
			let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
			form_obj.append('user_id', user_id);
			
			if(this.fileToReturn!= undefined && this.fileToReturn!= ""){
				form_obj.append('profile_picture', this.fileToReturn,this.fileToReturn.name);
			}
			
			this.service.add_update_profile_photo(form_obj).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', this.success_message, "");
					this.preview_profile_photo = this.service_url + "/" +res['data']['profile_photo'];
					this.get_user_profile_settings('user-account', (response)=>{
						this.shared_service.loginValue(response['data']);
						
						setTimeout(()=>{
							this.show_loader = false;
							this.modalRef.hide();
							
						}, 200);
					});
					
					// this.common_service.change_route(this.links.next_link);
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
