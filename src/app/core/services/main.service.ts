import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CommonFunctions } from "../helpers/common.functions";
import { apiUrl } from '../helpers/apiURL.constants';

@Injectable({
	providedIn: 'root'
})
export class MainService {
	public common_params = new CommonFunctions();
	public config_file_data: any;
	public sys_id = 1;
	public mod_id = 2;

	constructor(private httpclient: HttpClient) {
		this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
	}

	async get_config(callback) {
		let config_call = await fetch(this.common_params.get_current_url() + apiUrl.CONFIG);
		let config_data = await config_call.json();
		if (callback != undefined && callback !== "") {
			let obj_str = JSON.stringify(config_data);
			sessionStorage.setItem('system_config', obj_str);
			callback(obj_str);
		}
	}

	check_login(username, password): Observable<any> {
		let data_object = {
			email: username,
			password: password,
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.LOGIN, data_object); // this.common_params.httpOptions
	}

	registration(firstname, lastname, email_address, re_enter_password, account_type): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			account_type: account_type,
			firstname: firstname,
			lastname: lastname,
			email: email_address,
			password: re_enter_password,
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.REGISTRATION, data_object); // this.common_params.httpOptions
	}

	get_user_profile_settings(type): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			type: type,
			user_id: user_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.PROFILE_SETTING, data_object); // this.common_params.httpOptions
	}

	get_category_list(category_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			category_id: category_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ALL_CATEGORIES, data_object); // this.common_params.httpOptions
	}

	get_subcategory_list(category_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			category_id: category_id

		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_all_subcategories", data_object); // this.common_params.httpOptions
	}

	update_profile_category(dataset): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			category: dataset.category,
			subcategory: dataset.subcategory,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_category", data_object); // this.common_params.httpOptions
	}

	update_profile_expertise(dataset): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			skills: dataset.skills,
			other: dataset.other,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_expertise", data_object); // this.common_params.httpOptions
	}

	update_profile_expertise_level(dataset): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			level: dataset.expertise_level,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + "/user/update_profile_expertise_level", data_object); // this.common_params.httpOptions
	}

	add_update_profile_education(dataset, education_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			school: dataset.school,
			study: dataset.study,
			degree: dataset.degree,
			from_year: dataset.from_year,
			to_year: dataset.to_year,
			description: dataset.description,
			education_id: education_id,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_education", data_object); // this.common_params.httpOptions
	}

	skip_this_step(step_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			step_id: step_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/skip_this_step", data_object); // this.common_params.httpOptions
	}

	delete_education(education_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			education_id: education_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/delete_education", data_object); // this.common_params.httpOptions
	}

	get_education_details(education_id): Observable<any> {
		// this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			education_id: education_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_education_details", data_object); // this.common_params.httpOptions
	}
	
	
	delete_employment(employment_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			employment_id : employment_id,
			user_id : user_id
			 
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/delete_employment", data_object); // this.common_params.httpOptions
	}
	
	get_employment_details(employment_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		
		let data_object = {
			employment_id : employment_id,
			user_id : user_id
			 
		};
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_employment_details", data_object); // this.common_params.httpOptions
	}
	
	get_countries(country_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			country_id : country_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_countries", data_object); // this.common_params.httpOptions
	}
	
	get_calling_code(country_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			country_id : country_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_calling_code", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_employment(dataset, experience_id) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			company_name : dataset.company,
			job_title : dataset.job_title,
			location : dataset.location,
			country : dataset.country,
			from_month : dataset.from_month,
			from_year : dataset.from_year,
			to_month : dataset.to_month,
			to_year : dataset.to_year,
			job_description : dataset.description,
			experience_id : experience_id,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_employment", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_language(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			languages : dataset.languages,
			// experience_id : experience_id,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_language", data_object); // this.common_params.httpOptions
	}
	
	get_language_list(country_id): Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			country_id : country_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/get_language_list", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_hourlyrate(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			hourly_date : dataset.hourly_date,
			service_fees : dataset.service_fees,
			receive_rate : dataset.receive_rate,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_hourlyrate", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_title_overview(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			job_title : dataset.job_title,
			professional_overview : dataset.professional_overview,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_title_overview", data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_location(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			country : dataset.country,
			city : dataset.city,
			street_address : dataset.street_address,
			zipcode : dataset.zipcode,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_location", data_object); // this.common_params.httpOptions
	}
	
	
	add_update_profile_phone(dataset) : Observable<any> {
		this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			country_calling_code : dataset.country_calling_code,
			phone_number : dataset.phone_number,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + "/user/add_update_profile_phone", data_object); // this.common_params.httpOptions
	}
	
	
	
}