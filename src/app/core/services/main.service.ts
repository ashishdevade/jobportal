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
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			type: type,
			user_id: user_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.PROFILE_SETTING, data_object); // this.common_params.httpOptions
	}

	get_category_list(category_id): Observable<any> {
		let data_object = {
			category_id: category_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ALL_CATEGORIES, data_object); // this.common_params.httpOptions
	}

	get_subcategory_list(category_id): Observable<any> {
		let data_object = {
			category_id: category_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ALL_SUB_CATEGORIES, data_object); // this.common_params.httpOptions
	}

	update_profile_category(dataset): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			category: dataset.category,
			subcategory: dataset.subcategory,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_CATEGORIES, data_object); // this.common_params.httpOptions
	}

	update_profile_expertise(dataset): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			skills: (dataset.skills),
			other: dataset.other,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_EXPERTISE, data_object); // this.common_params.httpOptions
	}

	update_profile_expertise_level(dataset): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			level: dataset.expertise_level,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_EXPERTISE_LEVEL, data_object); // this.common_params.httpOptions
	}

	add_update_profile_education(dataset, education_id): Observable<any> {
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

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_EDU, data_object); // this.common_params.httpOptions
	}

	skip_this_step(step_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			step_id: step_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.SKIP_THIS_STEP, data_object); // this.common_params.httpOptions
	}

	delete_education(education_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			education_id: education_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.DELETE_EDU, data_object); // this.common_params.httpOptions
	}

	get_education_details(education_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			education_id: education_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.EDU_DETAILS, data_object); // this.common_params.httpOptions
	}


	delete_employment(employment_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			employment_id: employment_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.DELETE_EMP, data_object); // this.common_params.httpOptions
	}

	get_employment_details(employment_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			employment_id: employment_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.EMP_DETAILS, data_object); // this.common_params.httpOptions
	}

	get_countries(country_id): Observable<any> {
		let data_object = {
			country_id: country_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.GET_COUNTRIES, data_object); // this.common_params.httpOptions
	}
	
	get_states(country_id): Observable<any> {
		let data_object = {
			country_id: country_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.GET_STATES, data_object); // this.common_params.httpOptions
	}

	get_calling_code(country_id): Observable<any> {
		let data_object = {
			country_id: country_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.CALLING_CODE, data_object); // this.common_params.httpOptions
	}

	add_update_profile_employment(dataset, experience_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			company_name: dataset.company,
			job_title: dataset.job_title,
			location: dataset.location,
			country: dataset.country,
			from_month: dataset.from_month,
			from_year: dataset.from_year,
			to_month: dataset.to_month,
			to_year: dataset.to_year,
			job_description: dataset.description,
			experience_id: experience_id,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_EMP, data_object); // this.common_params.httpOptions
	}

	add_update_profile_language(dataset): Observable<any> {
		this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			languages: dataset.languages,
			// experience_id : experience_id,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_LANG, data_object); // this.common_params.httpOptions
	}

	get_language_list(country_id): Observable<any> {
		this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let data_object = {
			country_id: country_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.GET_LANG_LIST, data_object); // this.common_params.httpOptions
	}

	add_update_profile_hourlyrate(dataset): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			hourly_date: dataset.hourly_date,
			salary_expectation: dataset.salary_expectation,
			service_fees: dataset.service_fees,
			receive_rate: dataset.receive_rate,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_RATE, data_object); // this.common_params.httpOptions
	}

	add_update_profile_title_overview(dataset): Observable<any> {
		this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			job_title: dataset.job_title,
			professional_overview: dataset.professional_overview,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_TITLE, data_object); // this.common_params.httpOptions
	}

	add_update_profile_location(dataset): Observable<any> {
		this.config_file_data = JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			country_id: dataset.country_id,
			country: dataset.country_name,
			state_id: dataset.state_id,
			state: dataset.state_name,
			city: dataset.city,
			street_address: dataset.street_address,
			zipcode: dataset.zipcode,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_LOC, data_object); // this.common_params.httpOptions
	}


	add_update_profile_phone(dataset): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			country_calling_code: dataset.country_calling_code,
			phone_number: dataset.phone_number,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_PHONE, data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_photo(form_object) : Observable<any> {
		// 	this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		/*let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			profile_photo : photo_string,
			user_id : user_id
		};*/
		
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_PHOTO, form_object); // this.common_params.httpOptions
	}
	
	update_profile_job_type(dataset) : Observable<any> {
		// 	this.config_file_data =  JSON.parse(sessionStorage.getItem('system_config'));
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			job_type : dataset.job_type,
			user_id : user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.UPDATE_PROFILE_JOB_TYPE, data_object); // this.common_params.httpOptions
	}
	
	delete_project(project_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			project_id: project_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.DELETE_PROFILE_PROJECTS, data_object); // this.common_params.httpOptions
	}

	get_project_details(project_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			project_id: project_id,
			user_id: user_id

		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.GET_PROJECT_DETAILS, data_object); // this.common_params.httpOptions
	}
	
	add_update_profile_project(dataset, project_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			title : dataset.title,
			description : dataset.description,
			link : dataset.link,
			project_duration : dataset.project_duration,
			project_id: project_id,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ADD_UPDATE_PROFILE_PROJECT, data_object); // this.common_params.httpOptions
	}
	
	
	delete_license_certificate(lic_certificate_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			lic_certificate_id: lic_certificate_id,
			user_id: user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.DELETE_LICENSE_CERTIFICATE, data_object); // this.common_params.httpOptions
	}

	get_license_certificate_details(lic_certificate_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];

		let data_object = {
			lic_certificate_id: lic_certificate_id,
			user_id: user_id
		};
		
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.GET_LICENSE_CERTIFICATE_DETAILS, data_object); // this.common_params.httpOptions
	}
	
	add_update_license_certificate(dataset, lic_certificate_id): Observable<any> {
		let user_id = JSON.parse(sessionStorage.user_details)['user_account_id'];
		let data_object = {
			type:  dataset.type,
			title:  dataset.title,
			description:  dataset.description,
			provider:  dataset.provider,
			link:  dataset.link,
			date_earned:  dataset.date_earned,
			date_expirty:  dataset.date_expirty,
			lic_certificate_id: lic_certificate_id,
			user_id: user_id
		};

		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ADD_UPDATE_LICENSE_CERTIFICATE, data_object); // this.common_params.httpOptions
	}
	
	
	get_skills(skill_id): Observable<any> {
		let data_object = {
			skill_id: skill_id
		};
		return this.httpclient.post(this.config_file_data.service_url + apiUrl.ALL_SKILLS, data_object); // this.common_params.httpOptions
	}
	
}