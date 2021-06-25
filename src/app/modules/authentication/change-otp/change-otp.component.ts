import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  public temp_password = '';
  public user_details = [];
  public show_loader = false;

  constructor(
    private router: Router,
    public ActivatedRoute: ActivatedRoute,
    public common_service: CommonService,
    public service: MainService,
    public shared_service : SharedService
    ) { }

  ngOnInit() {
    this.temp_password  =  this.ActivatedRoute.snapshot.paramMap.get('one');
    if(this.temp_password != null){
      this.show_loader = true;
      this.validate_password(this.temp_password, (response) => {
        this.show_loader = false;
      })
    } else {
      this.common_service.show_toast('w', "Access restricted", "");
      
      this.common_service.change_route('/auth/login');
    }
  }

  validate_password(value, callback) {
    setTimeout(() => {
      this.service.validate_password(value).subscribe(response => {
        if (response.status == 200) {
          this.user_details = response['data'];
          sessionStorage.setItem("user_details", JSON.stringify(this.user_details[0]));
          if (callback != "" && callback != undefined) {
            callback()
          } else {
            this.show_loader = false;
          }
        } else {
          this.show_loader = false;
          this.common_service.show_toast('e', this.common_service.error_message, "");
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', this.common_service.error_message, "");
      });
    }, 50);
  }

  onSubmit(isValid: Boolean) {
    console.log("isValid ", isValid);
    if (isValid) {
      this.show_loader = true;
      if(this.re_enter_password == this.new_password){
        this.user_otp = this.temp_password;
        this.service.change_password(this.user_otp, this.re_enter_password).subscribe(response => {
          
          if (response['data'].length > 0) {
            let user_account = response['data'];
            
            this.show_loader = false;
            setTimeout(() => {
              this.common_service.show_toast('s', "Your password has been changed successfully, please login to continue.", "");
              this.common_service.change_route('/auth/login');
            }, 400);
            
          } else {
            this.show_loader = false;
            this.common_service.show_toast('w', "Invalid OTP, This OTP does not match with the one sent on mail .", "");
          }
        }, error => {
          this.show_loader = false;
          this.common_service.show_toast('e', "There was some error, Please try again.", "");
        });
        
      } else {
        this.show_loader = false;
        this.common_service.show_toast('w', "Password doesnt match, please check.", "");
      }
    }
  }

}
