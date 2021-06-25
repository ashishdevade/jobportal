import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from "src/app/core/services/common.service";
import { CommonFunctions } from 'src/app/core/helpers/common.functions';
import { MainService } from "src/app/core/services/main.service";

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
  public completed_pages_id = 0;
  public completed_page_order:any = 0;
  constructor(
    public common_service : CommonService,
    public service: MainService,
    ) { }

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
    
    this.get_user_profile_settings((response) => {
      if(response['status'] == 200){
        if(response.data.length > 0){
          this.completed_pages_id = response.data[0]['profile_completed'];
          
          let index = this.profile_side_menu.findIndex((pobj)=>{
            return pobj.page_id == this.completed_pages_id
          })
          if(index!== -1){
            this.completed_page_order = this.profile_side_menu[index]['order'];
          }
        }
      }
    })
  }
  
  navigate_sections(row_data, i, items_link){
    console.log("items_link ", items_link);
    if(this.completed_page_order > i){
      this.common_service.change_route(items_link);
    }
  }
  
  get_user_profile_settings(callback) {
    setTimeout(() => {
      this.service.get_user_profile_settings('user-account').subscribe(response => {
        if (callback!= '' && callback!= undefined) {
          callback(response);
        } 
      }, error => {
        this.common_service.show_toast('e', this.common_service.error_message, "");

      });
    }, 50);
  }

}
