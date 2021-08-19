import { Component, OnInit } from '@angular/core';
import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public common_params = new CommonFunctions();
  
  public manage_user_toggle = false;
  public manage_task_toggle = false;
  constructor(
    public common_service:CommonService, 
    public service:MainService,
    ) { }

  ngOnInit(): void {
  }
  
  expand_collapse_menu(menu_no){
    if(menu_no == 1){
      this.manage_user_toggle = !this.manage_user_toggle;
      this.manage_task_toggle = false;
    }
    
    if(menu_no == 2){
      this.manage_task_toggle = !this.manage_task_toggle;
      this.manage_user_toggle = false;
    }
  }

}
