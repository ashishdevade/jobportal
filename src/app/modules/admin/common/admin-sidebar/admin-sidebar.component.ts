import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  public manage_user_toggle = false;
  public manage_task_toggle = false;
  constructor() { }

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
