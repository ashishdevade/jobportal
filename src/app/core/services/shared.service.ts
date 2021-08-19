import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	private user_data = new BehaviorSubject([]);
	private loader = new BehaviorSubject(false);
	
	loginValueData = this.user_data.asObservable();
	loaderValue = this.loader.asObservable();
	
	constructor() { }
	
	loginValue(cart_arr) {
		this.user_data.next(cart_arr);
	}
	
	showLoader(loading_value) {
		this.loader.next(loading_value);
	}
}