import { HttpHeaders } from '@angular/common/http';

export class CommonFunctions {
	public login_paqge_link = '/auth/login';
	public href: any = window.location.href;
	public application_path = this.get_current_url();
	public email_valid_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
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
	
	
	public proficiency_list  = [
	{"name":"Basic", "desc":"I write in this language decently"},
	{"name":"Conversational", "desc":"I write and speak this language well"},
	{"name":"Fluent", "desc":"I write and speak this language almost perfectly"},
	{"name":"Native", "desc":"I write and speak this language perfectly, including colloquialisms"},
	];
	
	
	public profile_settings_list = [
	{"page_id" :"1", "name" : "Category ", "link":"user/profile/category", "order" : "1", "previous_page" : "0", "next_page" : "14" },
	{"page_id" : "14", "name" : "Job Type", "link":"user/profile/job-type", "order" : "2", "previous_page" : "1", "next_page" : "2" },
	{"page_id" :"2", "name" : "Expertise", "link":"user/profile/expertise", "order" : "3", "previous_page" : "14", "next_page" : "3" },
	{"page_id" :"3", "name" : "Expertise Level", "link":"user/profile/expertise-level", "order" : "4", "previous_page" : "3", "next_page" : "4" },
	{"page_id" :"4", "name" : "Education", "link":"user/profile/education", "order" : "5", "previous_page" : "3", "next_page" : "5" },
	{"page_id" :"5", "name" : "Employment", "link":"user/profile/employment", "order" : "6", "previous_page" : "4", "next_page" : "12" },
	{"page_id" : "12", "name" : "Projects", "link":"user/profile/projects", "order" : "7", "previous_page" : "5", "next_page" : "13" },
	{"page_id" : "13", "name" : "License & Certification", "link":"user/profile/license-certification", "order" : "8", "previous_page" : "12", "next_page" : "6" },
	{"page_id" :"6", "name" : "Languages", "link":"user/profile/languages", "order" : "9", "previous_page" : "13", "next_page" : "7" },
	{"page_id" :"7", "name" : "Hourly Rate", "link":"user/profile/hourly-rate", "order" : "10", "previous_page" : "6", "next_page" : "8" },
	{"page_id" :"8", "name" : "Title & Overview", "link":"user/profile/title-overview", "order" : "11", "previous_page" : "7", "next_page" : "9" },
	{"page_id" :"9", "name" : "Profile Photo", "link":"user/profile/photo", "order" : "12", "previous_page" : "8", "next_page" : "10" },
	{"page_id" : "10", "name" : "Location", "link":"user/profile/location", "order" : "13", "previous_page" : "9", "next_page" : "11" },
	{"page_id" : "11", "name" : "Phone", "link":"user/profile/phone", "order" : "14", "previous_page" : "10", "next_page" : "0" }
	]
	
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
		
		let cpage_index = this.profile_settings_list.findIndex((obj) => {
			return obj['page_id'] == current_page_id
		});
	 
		if(cpage_index !== -1){
			let previous_page_id = this.profile_settings_list[cpage_index]['previous_page'];
			if(previous_page_id != '0'){
				let ppage_index = 	this.profile_settings_list.findIndex((obj)=>{
					return (obj.page_id) ==previous_page_id
				})
				
				previous_page_link = this.profile_settings_list[ppage_index]['link'];
				
			}
			
			let next_page_id = this.profile_settings_list[cpage_index]['next_page'];
			if(next_page_id != '0'){
				let npage_index = 	this.profile_settings_list.findIndex((obj)=>{
					return (obj.page_id) ==next_page_id
				})
				
				next_page_link = this.profile_settings_list[npage_index]['link'];
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
}