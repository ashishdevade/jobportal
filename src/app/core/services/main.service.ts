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
	
}