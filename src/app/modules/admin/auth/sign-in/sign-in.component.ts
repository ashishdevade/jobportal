import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { varConstants } from 'src/app/core/helpers/variable.constants';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

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

  }


  onSubmit(isValid: Boolean) {
    console.log("isValid ", isValid);
    if (isValid) {
      this.show_loader = true;
      this.service.admin_validate_login(this.email_address, this.user_password).subscribe(response => {
        
        if (response['data'].length > 0) {
          let user_account = response['data'];
         //  if(user_account[0]['is_registered_complete'] == 1){
            sessionStorage.setItem("is_admin_logged_in", '1');
            sessionStorage.setItem("admin_id", user_account[0]['user_account_id']);
            sessionStorage.setItem("admin_details", JSON.stringify(user_account[0]));
            sessionStorage.setItem("account_type", user_account[0]['account_type']);
            this.show_loader = false;
        
            setTimeout(() => {
              this.shared_service.loginValue(user_account);
              let link = '/admin/dashboard';
              this.common_service.change_route(link);
            }, 400);    
         /* } else {
            sessionStorage.setItem("user_id", user_account[0]['user_account_id']);
            sessionStorage.setItem("user_details", JSON.stringify(user_account[0]));
            this.common_service.change_route('/auth/change-otp/' + this.user_password);
            
          }*/
          this.show_loader = false;
        } else {
          this.user_password = '';
          this.show_loader = false;
          this.common_service.show_toast('w', "Invalid Username & Password, Please try again.", "");
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', "There was some error, Please try again.", "");
      });
    }
  }
}
