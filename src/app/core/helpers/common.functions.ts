import { HttpHeaders } from '@angular/common/http';
import {GridOptions, Module, AllCommunityModules} from "@ag-grid-community/all-modules";
/*import { AngularEditorConfig } from '@kolkov/angular-editor';*/

export class CommonFunctions {
	public gridOptions: GridOptions;
	public gridApi:any;
	public grid_params:any;
	
	
	public login_paqge_link = '/auth/login';
	public admin_login_paqge_link = '/admin/auth/login';
	public href: any = window.location.href;
	public application_path = this.get_current_url();
	public email_valid_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	public default_image = "/assets/images/user-avatar-placeholder.png";
	
	public default_language = "English";
	public default_service_rate_per = "20";
	
	public page_limit_list  = [
	{"key":"10", "value":"10"},
	{"key":"20", "value":"20"},
	{"key":"30", "value":"30"},
	{"key":"50", "value":"50"},
	{"key":"100", "value":"100"},
	];
	
	public month_array  = [
	{"key":"1", "value":"January"},
	{"key":"2", "value":"February"},
	{"key":"3", "value":"March"},
	{"key":"4", "value":"April"},
	{"key":"5", "value":"May"},
	{"key":"6", "value":"June"},
	{"key":"7", "value":"July"},
	{"key":"8", "value":"August"},
	{"key":"9", "value":"September"},
	{"key":"10", "value":"October"},
	{"key":"11", "value":"November"},
	{"key":"12", "value":"December"},
	];
	
	public expertise_level = [
	{ value: 1, heading: 'Entry level', description: "College Graduate (0-2 years of experience)" },
	{ value: 2, heading: 'Intermediate', description: "3-5 years of experience" },
	{ value: 3, heading: 'Expert', description: "Comprehensive experience in the field" },
	];
	
	public location_preference = [
	{ value: 1, heading: 'Remote Job', description: "Work from which ever locaiton you like" },
	{ value: 2, heading: 'On Site', description: "Move/ Shift to the actual work site" },
	];
	
	public proficiency_list  = [
	{"name":"Basic", "desc":"I write in this language decently"},
	{"name":"Conversational", "desc":"I write and speak this language well"},
	{"name":"Fluent", "desc":"I write and speak this language almost perfectly"},
	{"name":"Native", "desc":"I write and speak this language perfectly, including colloquialisms"},
	];
	
	public profile_settings_list = [
	{"page_id" :"1", "name" : "Job Category ", "link":"user/profile/category", "order" : "1", "previous_page" : "0", "next_page" : "14" },
	{"page_id" : "14", "name" : "Job Type", "link":"user/profile/job-type", "order" : "2", "previous_page" : "1", "next_page" : "2" },
	{"page_id" :"2", "name" : "Expertise", "link":"user/profile/expertise", "order" : "3", "previous_page" : "14", "next_page" : "3" },
	{"page_id" :"3", "name" : "Expertise Level", "link":"user/profile/expertise-level", "order" : "4", "previous_page" : "2", "next_page" : "4" },
	{"page_id" :"4", "name" : "Education", "link":"user/profile/education", "order" : "5", "previous_page" : "3", "next_page" : "5" },
	{"page_id" :"5", "name" : "Employment", "link":"user/profile/employment", "order" : "6", "previous_page" : "4", "next_page" : "12" },
	{"page_id" : "12", "name" : "Projects", "link":"user/profile/projects", "order" : "7", "previous_page" : "5", "next_page" : "13" },
	{"page_id" : "13", "name" : "License & Certification", "link":"user/profile/license-certification", "order" : "8", "previous_page" : "12", "next_page" : "8" },
	{"page_id" :"8", "name" : "Title & Overview", "link":"user/profile/title-overview", "order" : "9", "previous_page" : "13", "next_page" : "7" },
	{"page_id" :"7", "name" : "Pay", "link":"user/profile/hourly-rate", "order" : "10", "previous_page" : "8", "next_page" : "6" },
	{"page_id" :"6", "name" : "Languages", "link":"user/profile/languages", "order" : "11", "previous_page" : "7", "next_page" : "10" },
	{"page_id" : "10", "name" : "Location", "link":"user/profile/location", "order" : "12", "previous_page" : "6", "next_page" : "9" },
	{"page_id" :"9", "name" : "Profile Photo", "link":"user/profile/photo", "order" : "13", "previous_page" : "10", "next_page" : "11" },
	{"page_id" : "11", "name" : "Phone", "link":"user/profile/phone", "order" : "14", "previous_page" : "9", "next_page" : "0" }
	]
	
	public company_profile_settings_list = [
	{"page_id" : "10", "name" : "Company Location", "link":"user/profile/location", "order" : "1", "previous_page" : "0", "next_page" : "1" },
	{"page_id" :"1", "name" : "Job Category ", "link":"user/profile/category", "order" : "2", "previous_page" : "10", "next_page" : "3" },
	{"page_id" :"3", "name" : "Expertise Level", "link":"user/profile/expertise-level", "order" : "3", "previous_page" : "1", "next_page" : "0" },
	/*{"page_id" : "14", "name" : "Job Type", "link":"user/profile/job-type", "order" : "4", "previous_page" : "3", "next_page" : "7" },
	{"page_id" :"7", "name" : "Pay", "link":"user/profile/hourly-rate", "order" : "5", "previous_page" : "14", "next_page" : "15" },
	{"page_id" : "15", "name" : "Job Location Preference", "link":"user/profile/job-location-preference", "order" : "6", "previous_page" : "7", "next_page" : "16" },
	{"page_id" : "16", "name" : "Timeline For Hiring", "link":"user/profile/timeline-hiring", "order" : "7", "previous_page" : "15", "next_page" : "8" },
	{"page_id" :"8", "name" : "Job Title & Description", "link":"user/profile/title-overview", "order" : "8", "previous_page" : "16", "next_page" : "0" },*/
	]
	
	public timeline_hiring = [
	{ value: 1, heading: 'Immediate', description: "Work from which ever location you like" },
	{ value: 2, heading: 'Within a time range', description: "Move/ Shift to the actual work site" },
	];
	
	public timeline_hiring_weekly_list = [
	{ value: "1 - 4", heading: '1 - 4 weeks' },
	{ value: "5 - 8", heading: '5 - 8 weeks' },
	{ value: "9 - 12", heading: '9 - 12 weeks' },
	{ value: "13 - 16", heading: '13 - 16 weeks' },
	{ value: "17 - 20", heading: '17 - 20 weeks' },
	{ value: "21 - 24", heading: '21 - 24 weeks' },
	{ value: "25 - 28", heading: '25 - 28 weeks' },
	{ value: "29 - 32", heading: '29 - 32 weeks' },
	{ value: "33 - 36", heading: '33 - 36 weeks' },
	{ value: "37 - 40", heading: '37 - 40 weeks' },
	{ value: "41 - 44", heading: '41 - 44 weeks' },
	{ value: "45 - 48", heading: '45 - 48 weeks' },
	{ value: "49 - 52", heading: '49 - 52 weeks' },
	];
	
	public job_type = [
	{ value: 1, heading: 'Part-Time', description: "I am looking for a part-time job" },
	{ value: 2, heading: 'Full-Time', description: "I am looking for a full time job" },
	{ value: 3, heading: 'Intern', description: "I am looking for an internship opportunity" },
	{ value: 4, heading: 'Contract', description: "I am looking for a contract role" },
	{ value: 5, heading: 'Freelance', description: "I am looking for a freelance project that fits my criteria" },
	];
	
	public modal_config = {
		class: 'modal-lg',
		backdrop: true,
		ignoreBackdropClick: true,
		keyboard  : false,
	};
	
	public default_size = 10;
	
	public httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Cache-Control':  'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
			'Pragma': 'no-cache',
			'Expires': '0'
		})
	}
	
	public get_profile_menu_accees_based(){
		let setting_list = [];
		if(sessionStorage.account_type == 'Company'){
			setting_list = this.company_profile_settings_list;
			
		} else if(sessionStorage.account_type == 'Student'){
			setting_list = this.profile_settings_list;
		}
		
		return setting_list;
	}
	
	
	public get_current_url() {
		let temp: any = this.href.substring(0, this.href.lastIndexOf('/'));
		if (temp.lastIndexOf('#') != '-1') {
			temp = temp.substring(0, temp.lastIndexOf('#'));
		}
		
		let preg_match_replace:any = "";
		if(location.protocol == "http:"){
			preg_match_replace = /^http\:\/\//;
		} else if(location.protocol == "https:"){
			preg_match_replace= /^https\:\/\//;
		}
		
		let sanitized = temp.replace(preg_match_replace, '').replace(/\/+/g, '/').replace(/\/+$/, '');
		temp = (window.location.protocol + '//' + sanitized);

		return temp;
	}
	
	public get_profile_previous_next_page(current_page_id){
		var previous_page_link = "";
		var next_page_link = "";
		
		let access_url = this.get_profile_menu_accees_based();
		
		let cpage_index = access_url.findIndex((obj) => {
			return obj['page_id'] == current_page_id
		});
		
		if(cpage_index !== -1){
			let previous_page_id = access_url[cpage_index]['previous_page'];
			if(previous_page_id != '0'){
				let ppage_index = 	access_url.findIndex((obj)=>{
					return (obj.page_id) ==previous_page_id
				})
				
				previous_page_link = access_url[ppage_index]['link'];
				
			}
			
			let next_page_id = access_url[cpage_index]['next_page'];
			if(next_page_id != '0'){
				let npage_index = 	access_url.findIndex((obj)=>{
					return (obj.page_id) ==next_page_id
				})
				
				next_page_link = access_url[npage_index]['link'];
			}
		}  
		
		return { "previous_link" : previous_page_link, "next_link" : next_page_link }
		
	}
	
	public get_random_no(){
		return Math.floor(Math.random()*100) + 1
	}
	
	public json_to_query_string(data){
		let new_data = Object.keys(data).map(function(k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}).join('&')
		return new_data; 
	}
	
	public prepare_form_data(data){
		let body = new FormData();
		for(let key in data){
			body.append(key, data[key]);
		}
		return body;
	}
	
	public deepcopy(o) {
		var output, v, key;
		output = Array.isArray(o) ? [] : {};
		for (key in o) {
			v = o[key];
			output[key] = (typeof v === "object") ? this.deepcopy(v) : v;
		}
		return output;
	}
	
	public check_session(){
		if(sessionStorage.getItem("is_logged_in") == null || sessionStorage.getItem("is_logged_in") == '0'){
			return this.login_paqge_link;
		} else {
			if(sessionStorage.getItem('system_config') == null || sessionStorage.getItem('system_config') == undefined){
				return this.login_paqge_link;
			} else {
				return false;
			}
		}
	}
	
	public check_admin_session(){
		if(sessionStorage.getItem("is_admin_logged_in") == null || sessionStorage.getItem("is_admin_logged_in") == '0'){
			return this.admin_login_paqge_link;
		} else {
			if(sessionStorage.getItem('system_config') == null || sessionStorage.getItem('system_config') == undefined){
				return this.admin_login_paqge_link;
			} else {
				return false;
			}
		}
	}
	
	
	
	public get_session_data(parameter_name = null, do_deserilze){
		let data:any;
		if(sessionStorage !=  null  || sessionStorage.getItem('system_config') != undefined){
			if(do_deserilze == 1){
				if(sessionStorage[parameter_name] != undefined) {
					data = JSON.parse(sessionStorage[parameter_name]);
				}
			} else {
				data = sessionStorage[parameter_name];
			}
		} 
		return data;
	}
	
	public generate_random_pass(length) {
		var result           = '';
		var characters       = '@ABCDEFGHIJ@KLMNOPQRS@TUVWXYZ0123456789@abcdefghij@klmnopqrs@tuvwxyz@0123456789@';
		var charactersLength = characters.length;
		for ( var i = 0; i < length; i++ ) {
			result += characters.charAt(Math.floor(Math.random() *  charactersLength));
		}
		return result;
	}
 
 		public grid_options(){
		this.gridOptions =   <GridOptions>{
			defaultColDef:{
				editable: false,
				enableRowGroup:true,
				enablePivot:true,
				enableValue:true,
				sortable:true,
				resizable: true,
				filter: true
			},
			rowHeight: 40, 
			pagination: false,
			paginationPageSize: this.default_size,
			onGridReady: () => {
				this.gridOptions.api.sizeColumnsToFit();
			},
		};
		
		return this.gridOptions;
	}
	
	onGridReady(params) {
		this.grid_params = params;
		this.gridApi = params.api;
		let gridColumnApi = params.columnApi;
		this.gridApi.setDomLayout('autoHeight');
	}
	
	on_page_size_change(newPageSize) {
		this.gridOptions.api.paginationSetPageSize(Number(newPageSize));
	}
	
	onAgGridSearch() {
		this.gridOptions.api.setQuickFilter((<HTMLInputElement>document.getElementById("search_grid")).value);
	}

}