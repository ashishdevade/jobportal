import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { varConstants } from 'src/app/core/helpers/variable.constants';

import { CommonFunctions } from "../../../core/helpers/common.functions";
import { CommonService } from "../../../core/services/common.service";
import { MainService } from "../../../core/services/main.service";
import { SharedService } from "../../../core/services/shared.service";


@Component({
  selector: 'app-change-otp',
  templateUrl: './change-otp.component.html',
  styleUrls: ['./change-otp.component.scss']
})
export class ChangeOtpComponent implements OnInit {

  public common_params = new CommonFunctions();
  public user_otp: any = "";
  public new_password: any = "";
  public re_enter_password: any = "";
  
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
      this.service.change_password(this.user_otp, this.new_password, this.re_enter_password).subscribe(response => {
        
        if (response['data'].length > 0) {
          let user_account = response['data'];
          
          this.show_loader = false;
          setTimeout(() => {
            this.common_service.show_toast('s', "Your password has been changed successfully .", "");
            this.common_service.change_route('/user/login');
          }, 400);
          
        } else {
          
          this.show_loader = false;
          this.common_service.show_toast('w', "Invalid OTP, This OTP does not match with the one sent on mail .", "");
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', "There was some error, Please try again.", "");
      });
    }
  }

}
