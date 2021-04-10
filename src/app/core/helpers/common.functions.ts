import { HttpHeaders } from '@angular/common/http';

export class CommonFunctions {
	public login_paqge_link = '/auth/login';
	public href: any = window.location.href;
	public application_path = this.get_current_url();
	public email_valid_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
	public page_limit_list  = [
	{"key":"10", "value":"10"},
	{"key":"20", "value":"20"},
	{"key":"30", "value":"30"},
	{"key":"50", "value":"50"},
	{"key":"100", "value":"100"},
	];
	
	public profile_settings_list = [
	{"page_id":"1", "name": "Category ", "link":"user/profile/category"},
	{"page_id":"2", "name": "Expertise", "link":"user/profile/expertise"},
	{"page_id":"3", "name": "Expertise Level", "link":"user/profile/expertise-level"},
	{"page_id":"4", "name": "Education", "link":"user/profile/education"},
	{"page_id":"5", "name": "Employment", "link":"user/profile/employment"},
	{"page_id":"6", "name": "Languages", "link":"user/profile/category"},
	{"page_id":"7", "name": "Hourly Rate", "link":"user/profile/category"},
	{"page_id":"8", "name": "Title & Overview", "link":"user/profile/category"},
	{"page_id":"9", "name": "Profile Photo", "link":"user/profile/category"},
	{"page_id":"10", "name": "Location", "link":"user/profile/category"},
	{"page_id":"11", "name": "Phone", "link":"user/profile/category"},
	]
	
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