import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class SharedService {

	private user_data = new BehaviorSubject([]);
	
	loginValueData = this.user_data.asObservable();
	
	constructor() { }
	
	loginValue(cart_arr) {
		this.user_data.next(cart_arr);
	}
}