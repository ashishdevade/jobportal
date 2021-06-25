import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { varConstants } from 'src/app/core/helpers/variable.constants';

import { CommonFunctions } from "../../../core/helpers/common.functions";
import { CommonService } from "../../../core/services/common.service";
import { MainService } from "../../../core/services/main.service";
import { SharedService } from "../../../core/services/shared.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public common_params = new CommonFunctions();
  public email_address: any = "";
  public user_password: any = "";
  public show_loader = false;
  
  constructor(
    private router: Router,
    public common_service: CommonService,
    public service: MainService,
    public shared_service : SharedService
    ) { }

  ngOnInit() {
    //  this.common_service.show_toast('s', "Connection missing, Please select a connection .", "");
    //  this.show_loader = true;
    
  }


  onSubmit(isValid: Boolean) {
    console.log("isValid ", isValid);
    if (isValid) {
      this.show_loader = true;
      let temp_pass = this.common_params.generate_random_pass(12);

      this.service.forgot_password(this.email_address, temp_pass).subscribe(response => {
        
        if (response['data'].length > 0) {
          let user_account = response['data'];
          
          this.show_loader = false;
          setTimeout(() => {
            this.common_service.show_toast('s', "A temporary password has been sent you on your mail ID, Use it to login .", "");
            this.common_service.change_route('/user/login');
          }, 400);
          
        } else {
          this.user_password = '';
          this.show_loader = false;
          this.common_service.show_toast('w', "Invalid Email Id, This email ID does not exists .", "");
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', "There was some error, Please try again.", "");
      });
    }
  }

}
