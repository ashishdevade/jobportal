import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute , NavigationEnd } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public category_list = [];
  public Industry_list = [];
  public skill_list = [];
  public account_access_type = "";
  public thumbnail_image = '';
  public max = 5;
  public rate = 4;
  public service_url = "";
  public isReadonly = true;
  public config_data = '';
  public job_profile_list:any = [];
  

  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public common_service : CommonService,
    public service : MainService,
    /*  private modalService: BsModalService,*/
    public shared_service : SharedService
    ) {  
    
    this.common_service.check_session_on();
  }

  ngOnInit() {
    this.account_access_type = sessionStorage.account_type;
    this.category_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
    this.Industry_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
    this.skill_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
    this.config_data = JSON.parse(sessionStorage.getItem('system_config'));
    this.service_url = this.config_data['service_url'];
    this.thumbnail_image = this.common_params.application_path + '/' + this.common_params.default_image;
    this.form_data.job_profile = 1;
    this.get_job_profile(() => {
    });
  }
  
  select_job_profile(id) {
    this.form_data.job_profile = id;
  }
  
  get_category($event){
    this.form_data.country_name = $event.name;
    this.form_data.country_id = $event.id;
    
  }
  
  get_industry($event){
    this.form_data.country_name = $event.name;
    this.form_data.country_id = $event.id;
    
  }
  
  get_skills($event){
    this.form_data.country_name = $event.name;
    this.form_data.country_id = $event.id;
    
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


}
