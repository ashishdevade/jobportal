
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

	public page_id = 4;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
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
	}
	
	back_to_expertise_level(){
		console.log("in here ");
		this.common_service.change_route('user/profile/expertise-level');
	}
	
	skip_steps(){
		this.show_loader = true; 
		setTimeout(()=>{
			this.show_loader = false;
			
		}, 500);
	}
	
	openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template);
	}
	
	onSubmit(isValid: Boolean){
		console.log("isValid ", isValid);
		if (isValid){
			this.show_loader = true;
			let dataset = JSON.parse(JSON.stringify(this.form_data));
			this.service.update_profile_expertise_level(dataset).subscribe(res=> {
				if(res['status'] == 200){
					this.common_service.show_toast('s', "Expertise saved successfully.", "");
					this.show_loader = false;
					
					setTimeout(()=>{
						this.common_service.change_route('user/profile/education');
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
