import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable,  Subject, BehaviorSubject } from 'rxjs';
import { CommonFunctions } from "../helpers/common.functions";

@Injectable({
	providedIn: 'root'
})
export class MainService {
	public common_params = new CommonFunctions();
	public config_file_data:any;
	public sys_id = 1;
	public mod_id = 2;
	
	constructor(private httpclient: HttpClient) { }
	
	async get_config(callback) {
		let config_call = await fetch( this.common_params.get_current_url() +  "/assets/config.json");
		let config_data = await config_call.json();
		if(callback != undefined && callback !== ""){
			let obj_str =  JSON.stringify(config_data);
			sessionStorage.setItem('system_config',obj_str);
			callback(obj_str);
		}
	}
	
	check_login(username, password) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			email: username,
			password: password,
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/validate_login", data_object); // this.common_params.httpOptions
	}
	
	registration(firstname, lastname, email_address, re_enter_password, account_type) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			account_type : account_type,
			firstname : firstname,
			lastname : lastname,
			email : email_address,
			password : re_enter_password,
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/register_user", data_object); // this.common_params.httpOptions
	}
	
	get_user_profile_settings(type): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			type : type,
			user_id : user_id
			
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_user_profile_settings", data_object); // this.common_params.httpOptions
	}
	
	get_category_list(category_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			category_id : category_id
			
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_all_categories", data_object); // this.common_params.httpOptions
	}
	
	get_subcategory_list(category_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			category_id : category_id
			
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_all_subcategories", data_object); // this.common_params.httpOptions
	}
	
	update_profile_category(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			category : dataset.category,
			subcategory : dataset.subcategory,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_category", data_object); // this.common_params.httpOptions
	}
	
	update_profile_expertise(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			skills : dataset.skills,
			other : dataset.other,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_expertise", data_object); // this.common_params.httpOptions
	}
	
	update_profile_expertise_level(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			level : dataset.expertise_level,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_expertise_level", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_education(dataset, education_id) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			school : dataset.school,
			study : dataset.study,
			degree : dataset.degree,
			from_year : dataset.from_year,
			to_year : dataset.to_year,
			description : dataset.description,
			education_id : education_id,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_education", data_object); // this.common_params.httpOptions
	}
	
	skip_this_step(step_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			step_id : step_id,
			user_id : user_id
			 
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/skip_this_step", data_object); // this.common_params.httpOptions
	}
	
	delete_education(education_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			education_id : education_id,
			user_id : user_id
			 
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/delete_education", data_object); // this.common_params.httpOptions
	}
	
	get_education_details(education_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			education_id : education_id,
			user_id : user_id
			 
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_education_details", data_object); // this.common_params.httpOptions
	}
	
}