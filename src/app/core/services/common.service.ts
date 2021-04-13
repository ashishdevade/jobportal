import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctions } from "../helpers/common.functions";
import { varConstants } from '../helpers/variable.constants';

@Injectable({
	providedIn: 'root'
})


export class CommonService {
	public common_params = new CommonFunctions();
	public default_toast_time = 3500;
	public default_loading_time = 2000;
	public error_message = "We have encountered a technical problem, Please try again later or contact us for assistance.";
	isSystemLogEnabled: boolean = false;

	constructor(
		private ActivatedRouter: ActivatedRoute,
		private route: Router,
		private httpclient: HttpClient,
		private toastr: ToastrService,
	) {
		if (JSON.parse(sessionStorage.getItem("system_config"))) {
			this.isSystemLogEnabled = JSON.parse(sessionStorage.getItem("system_config"))["is_system_log_enabled"];
		}
	}

	change_route(router_link) {
		this.route.navigateByUrl(router_link);
	}

	check_session_on() {
		let check_session = this.common_params.check_session();
		if (check_session != false) {
			this.show_toast('i', "Your session has expired, Please re-login!", "");
			this.change_route(check_session);
		}
	}

	signout() {
		sessionStorage.removeItem("is_logged_in");
		sessionStorage.removeItem("user_id");
		sessionStorage.removeItem("user_details");
		this.show_toast('w', "Your session has been terminated!", "");

		setTimeout(() => {
			this.change_route(this.common_params.login_paqge_link);
		}, 100);
	}

	show_toast(type, msg, timeout) {
		if (timeout == "") {
			timeout = this.default_toast_time
		}
		let ToastConfig = {
			closeButton: true,
			positionClass: 'toast-bottom-right',
			timeOut: timeout,
			preventDuplicates: true,
		}

		if (type == "s") {
			this.toastr.success(msg, undefined, ToastConfig);
		} else if (type == "w") {
			this.toastr.warning(msg, undefined, ToastConfig);
		} else if (type == "i") {
			this.toastr.info(msg, undefined, ToastConfig);
		} else if (type == "d" || type == "e") {
			this.toastr.error(msg, undefined, ToastConfig);
		}
	}

	//This will print the logs
	PrintLogs(logType, className?, methodName?, logMessage?, desc?: any) {
		if (!desc) {
			desc = '';
		}
		if (!logMessage) {
			logMessage = '';
		}
		if (!methodName) {
			methodName = '';
		}
		if (!className) {
			className = '';
		}
		//DEBUG - for printing general data
		//ERROR - for printing error data
		//INFO - for printing logged info
		if (this.isSystemLogEnabled) {
			let currentTimeStamp = new Date().toLocaleString();
			switch (logType) {
				case varConstants.INFO:
					console.info(logType + " | " + currentTimeStamp + " | " + className + " | " + methodName + " | ", logMessage, desc);
					break;
				case varConstants.ERROR:
					console.error(logType + " | " + currentTimeStamp + " | " + className + " | " + methodName + " | ", logMessage, desc);
					break;
				case varConstants.LOG:
					console.log(logType + " | " + currentTimeStamp + " | " + className + " | " + methodName + " | ", logMessage, desc);
					break;
				default:
					console.log(logType + " | " + currentTimeStamp + " | " + className + " | " + methodName + " | ", logMessage, desc);
					break;
			}
		}
	}
}