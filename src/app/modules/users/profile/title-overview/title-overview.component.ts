
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "../../../../core/helpers/common.functions";
import { CommonService } from "../../../../core/services/common.service";
import { MainService } from "../../../../core/services/main.service";


@Component({
	selector: 'app-title-overview',
	templateUrl: './title-overview.component.html',
	styleUrls: ['./title-overview.component.scss']
})
export class TitleOverviewComponent implements OnInit {

	public page_id = 8;
	public common_params = new CommonFunctions();
	public show_loader = false;
	public form_data:any = {};
	public profile_side_menu = [];
	public links:any = {};
	
	public main_heading = "";
	public sub_heading = "";
	public sub_description = "";
	public title_input = "";
	public description_input = "";
	public title_placeholder = "";
	public desc_placeholder = "";
	public access_type = "";
	public success_message = "";
	
	constructor(
		private router: Router,
		public common_service : CommonService,
		public service : MainService,
		) { }
	
	ngOnInit() {
		this.common_service.check_session_on();
		this.profile_side_menu = this.common_params.get_profile_menu_accees_based();	
		this.access_type = sessionStorage.account_type;
		if(this.access_type == 'Company'){
			this.page_id = 8;
			this.main_heading = "Job Title & Description";
			this.sub_heading = "Add details about the job and suitable candidate requirements";
			this.sub_description = "Write a great job description, add your requiremnts overview, mention candidate skillset and experience.";
			this.title_input = "Job Title";
			this.description_input = "Job Description";
			this.title_placeholder = "Example: Writer";
			this.desc_placeholder = "Highlight all the important requirement, experience and skillset. This is one of the first things candidate will see in the job posting.";
			
			this.success_message = "Job Title & Description saved successfully.";
		} else {
			this.main_heading = "Title & Overview";
			this.sub_heading = "Add about your job role and responsibilities";
			this.sub_description = "Write a great profile, add your professional overview, mention your skills, experience and interests .";
			this.title_input = "Title";
			this.description_input = "Professional Overview";
			this.title_placeholder = "Example: Writing";
			this.desc_placeholder = "Highlight your top skills, experience, and interests. This is one of the first things clients will see on your profile.";
			
			this.success_message = "Title & Overview saved successfully.";
		}
		
		
		this.links =  this.common_params.get_profile_previous_next_page(this.page_id)
		if(this.links.next_link== ""){
			this.links.next_link = "user/profile/review";
		}
		
		this.form_data.job_title = "";
		this.form_data.professional_overview = "";
		this.get_user_profile_settings((response)=>{
			if(response['data'].length > 0){
				this.form_data.job_title = response['data'][0]['job_title'];
				this.form_data.professional_overview = response['data'][0]['professional_overview'];
			}
		});
	}
	
	get_user_profile_settings(callback){
		setTimeout(() => {
			this.service.get_user_profile_settings('title-overview').subscribe(response=> {
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
			this.service.add_update_profile_title_overview(dataset).subscribe(res=> {
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
	
	back_to_hr_rate(){
		console.log("in here ");
		this.common_service.change_route(this.links.previous_link);
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

}
