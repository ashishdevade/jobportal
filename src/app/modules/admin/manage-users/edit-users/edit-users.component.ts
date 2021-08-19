import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  public account_type = '';
  public user_id = '';
  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public password_form_data:any = {};
  public industry_list:any = [];
  public country_list = [];
  public state_list = [];
  public job_profile_list = [];
  public city_list = [];
  public success_message = 'User Details Updated Successfully';
  public expertise_level = [];
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public common_service : CommonService,
    public service : MainService,
    public shared_service : SharedService
    ) {  }
  
  ngOnInit() {
    this.common_service.check_admin_session_on();
    this.account_type = this.ActivatedRoute.snapshot.paramMap.get('one');
    this.user_id = this.ActivatedRoute.snapshot.paramMap.get('two');
    // if(this.account_type== 'company'){
      this.expertise_level = this.common_params.expertise_level;  
      this.get_user_profile_settings("review",  (response) => {
        if(response['data']['user_account_data'].length > 0){
          this.form_data = response['data']['user_account_data'][0];
        }
        
        if(response['data']['category_data'].length > 0){
          
          this.form_data.category_id = response['data']['category_data'][0]['category_id'];
          this.form_data.industry_description = response['data']['category_data'][0]['industry_description'];
          this.form_data.industry_name = response['data']['category_data'][0]['industry_name'];
          this.form_data.profile_name = response['data']['category_data'][0]['profile_name'];
          this.form_data.student_category_id = response['data']['category_data'][0]['student_category_id'];
          this.form_data.subcategory_id = response['data']['category_data'][0]['subcategory_id'];
          this.form_data.team_department = response['data']['category_data'][0]['team_department'];
        }
        
        if(response['data']['expertise_data'].length > 0){
          this.form_data.level = response['data']['expertise_data'][0]['level'];
        }
        
        console.log("this.form_data ", this.form_data);
        
        this.get_countries(()=>{ });
        this.get_states(this.form_data.country_id, (res)=>{
          this.get_cities(this.form_data.state_id, (res)=>{
            this.show_loader = false;
          })
        })
        this.get_industry_list(()=>{
          
        });
        this.get_job_profile(()=>{
          this.show_loader = false;
          
        });  
        
        

      })
      
      //   }
    }
    
    get_job_profile(callback) {
      setTimeout(() => {
        this.service.get_job_profile('').subscribe(response => {
          if (response.status == 200) {
            this.job_profile_list = response['data'];
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
    
    get_industry_list(callback) {
      setTimeout(() => {
        let typeind = '';
        if(this.account_type=="company"){
          typeind = 'Company';
        } else {
          
          typeind = 'Student';
        }
        this.service.get_industry_list('', typeind).subscribe(response => {
          if (response.status == 200) {
            this.industry_list = response['data'];
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
    
    goback(){
      let edit_router = '';
      if(this.account_type== 'company'){
        edit_router = '/admin/users/companies';
      } else {
        edit_router = '/admin/users/candidates';
        
      }
      this.common_service.change_route(edit_router);
    }
    
    get_countries(callback){
      this.show_loader = true;
      this.service.get_countries(-1).subscribe(response=> {
        if(response.status == 200){
          this.country_list = response.data;
        }
        
        if(callback != "" && callback != undefined){
          callback(response);
        } else {
          this.show_loader = false;
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', this.common_service.error_message, "");
      });
    }
    
    
    get_states(country_id, callback){
      this.show_loader = true;
      this.service.get_states(country_id).subscribe(response=> {
        if(response.status == 200){
          this.state_list = response.data;
        } 
        
        if(callback != "" && callback != undefined){
          callback(response);
        } else {
          this.show_loader = false;
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', this.common_service.error_message, "");
      });
    }
    
    
    get_state($event){
      this.form_data.country_name = $event.name;
      this.form_data.country_id = $event.id;
      this.get_states($event.id, (res)=>{
        this.show_loader = false
      })
    }
    
    state_select($event){
      this.form_data.state_name  =  $event.name;
      this.form_data.state_id  =  $event.id;
      this.get_cities($event.id, (res)=>{
        this.show_loader = false
      })
    }
    
    get_cities(state_id, callback){
      this.show_loader = true;
      this.service.get_cities(state_id).subscribe(response=> {
        if(response.status == 200){
          this.city_list = response.data;
        } 
        this.show_loader = false;
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', this.common_service.error_message, "");
      });
    }
    
    city_select($event){
      this.form_data.city_name  =  $event.name;
      this.form_data.city_id  =  $event.id;
    }
    
    get_user_profile_settings(type, callback) {
      this.service.get_user_profile(type, this.user_id).subscribe(response => {
        if (response.status == 200) {
          if (callback != "" && callback != undefined) {
            callback(response);
          } else {
            this.show_loader = false;
          }
        } else {
          this.show_loader = false;
        }
      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', this.common_service.error_message, "");

      });
    }
    
    on_submit(isValid: Boolean){
      console.log("isValid ", isValid);
      if (isValid){
        this.show_loader = true;
        let dataset = JSON.parse(JSON.stringify(this.form_data));
        this.service.update_admin_user_edit(this.user_id, this.account_type, dataset).subscribe(res=> {
          if(res['status'] == 200){
            this.common_service.show_toast('s', this.success_message, "");
            this.show_loader = false;
            setTimeout(()=>{
              this.goback()
            });
            
          } else {
            this.common_service.show_toast('e', this.common_service.error_message, "");
            this.show_loader = false;
          }
          
        }, error => {
          this.show_loader = false;
          this.common_service.show_toast('e', this.common_service.error_message, "");
          
        });
      }
    }
    
    on_password_submit(isValid: Boolean) {
      console.log("isValid ", isValid);
      if (isValid) {
        this.show_loader = true;
        if(this.password_form_data.new_password == this.password_form_data.re_enter_password){
          this.service.admin_user_change_password(this.user_id, this.password_form_data.re_enter_password).subscribe(response => {
            if (response['status'] ==  200) {
              this.show_loader = false;
              this.common_service.show_toast('s', "This user password has been changed successfully.", "");
              setTimeout(() => {
                this.password_form_data = {};
              }, 400);
            } else {
              this.show_loader = false;
              this.common_service.show_toast('w', "New password and re-enter password didnt match.", "");
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
