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
  

  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public common_service : CommonService,
    public service : MainService,
    /*  private modalService: BsModalService,*/
    public shared_service : SharedService
    ) {  
    
    this.common_service.check_admin_session_on();
  }

  ngOnInit() {
    
    this.category_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
    this.Industry_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
    this.skill_list = [{"id":"1","name":"test"}, {"id":"2","name":"test 2"}, {"id":"3","name":"test 3"}];
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


}
