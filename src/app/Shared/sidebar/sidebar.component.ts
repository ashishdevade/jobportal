import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctions } from 'src/app/core/helpers/common.functions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public common_params = new CommonFunctions();
  public profile_side_menu = [];
  @Input() page_id: any;
  public page_index = 0;
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.account_type == 'Company'){
      this.profile_side_menu = this.common_params.company_profile_settings_list;
    } else if(sessionStorage.account_type == 'Student'){
      this.profile_side_menu = this.common_params.profile_settings_list;
    }
    
    this.profile_side_menu.sort(function(a, b) {
      return a.order - b.order;
    });
    
    this.page_index = this.profile_side_menu.findIndex((obj) => {
      return obj['page_id'] == this.page_id
    });
    
    console.log("this.page_index ", this.page_index);
  }

}
