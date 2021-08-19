
import { Component, OnInit, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdmindashboardComponent implements OnInit {

  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  
  constructor(
    private router: Router,
    public common_service : CommonService,
    public service : MainService
    ) { }
  
  ngOnInit() {
    this.common_service.check_admin_session_on();
  }

 }
