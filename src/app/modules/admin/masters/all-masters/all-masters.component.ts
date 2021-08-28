import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute , NavigationEnd } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GridActionComponent } from '../../common/grid.action';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-all-masters',
  templateUrl: './all-masters.component.html',
  styleUrls: ['./all-masters.component.scss']
})
export class AllMastersComponent implements OnInit {

  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public columnDefs = [];
  public screen:any = '';
  public gridOptions;
  public searchstring = '';
  public popup_title = '';
  public action_button_text = '';
  public success_message = '';
  public register_modal_ref: BsModalRef;
  
  public list_data:any = [];
  public category_list:any = [];
  
  public page_heading = '';
  public breadcrumb_heading = '';
  public grid_heading = '';
  public master_id:any = -1;
  public access_type_list = [{"id":"Company", "name":"Company"}, {"id":"Student", "name":"Student"}]
  
  @ViewChild('job_type_template') add_edit_model: TemplateRef<any>;
  
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public common_service : CommonService,
    public service : MainService,
    private modalService: BsModalService,
    public shared_service : SharedService
    ) {  
    
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.list_data = [];
        this.common_service.check_admin_session_on();
        this.screen = this.ActivatedRoute.snapshot.paramMap.get('one');
        
        this.gridOptions =this.common_params.grid_options();
        this.gridOptions['context']= {
          componentParent: this
        };
        
        this.gridOptions.api;
        this.columnDefs = [];
        
        if( this.screen == 'job-profile'){
          this.page_heading = 'Job Profile';
          this.breadcrumb_heading = 'Manage Job Profile';
          this.grid_heading  = 'Job Profile list';
          
          setTimeout(()=>{
            this.columnDefs = [
            {headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
            {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: false},
            /* {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},*/
            {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "id", "RowData": params['data'] } } }
            ];
          }, 300);
          
        } else if( this.screen == 'job-category'){
          this.page_heading = 'Job Category';
          this.breadcrumb_heading = 'Manage Job Category';
          this.grid_heading  = 'Job Category list';
          setTimeout(()=>{
            this.columnDefs = [
            {headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
            {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: false},
            /* {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},*/
            {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "id", "RowData": params['data'] } } }
            ];
          }, 300);
        } else if( this.screen == 'job-subcategory'){
          this.page_heading = 'Job Subcategory';
          this.breadcrumb_heading = 'Manage Job Subcategory';
          this.grid_heading  = 'Job Subcategory list';
          setTimeout(()=>{
            this.columnDefs = [
            {headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
            {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: false},
            {headerName: 'Category', field: 'category', sortable: true, filter: true, checkboxSelection: false},
            /* {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},*/
            {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "id", "RowData": params['data'] } } }
            ];
          }, 300);
          
        } else if( this.screen == 'industries'){
          this.page_heading = 'Job Industries';
          this.breadcrumb_heading = 'Manage Job Industries';
          this.grid_heading  = 'Job Industries list';
          setTimeout(()=>{
            
            this.columnDefs = [
            {headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
            {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: false},
            /* {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},*/
            {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "id", "RowData": params['data'] } } }
            ];
            
          }, 300);
        } else if( this.screen == 'skills'){
          this.page_heading = 'Job Skills';
          this.breadcrumb_heading = 'Manage Job Skills';
          this.grid_heading  = 'Job Skills list';
          setTimeout(()=>{
            
            this.columnDefs = [
            {headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
            {headerName: 'Name', field: 'name', sortable: true, filter: true, checkboxSelection: false},
            {headerName: 'Category', field: 'category', sortable: true, filter: true, checkboxSelection: false},
            /* {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},*/
            {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "id", "RowData": params['data'] } } }
            ];
            
          }, 300);
        }
        
        this.show_loader = true;
        this.get_all_masters_data(this.screen, '', (response)=>{
          setTimeout(()=>{
            this.show_loader = false;
          }, 200);
          if(response!= undefined && response['data']!= undefined){
            this.list_data = response['data'];
          } else {
            this.common_service.show_toast('i', "No Users Found.", "");
            this.list_data = [];
          }
        }) 
      }
    });
}

ngOnInit() {
}


select_access_type($event){
  console.log("$event ", $event);
  this.form_data.access_type = $event.id
}  


select_category($event){
  this.form_data.category_name = $event.name;
  this.form_data.category_id = $event.id;
}

search_users(){
  this.show_loader = true;
  this.get_all_masters_data(this.screen, this.searchstring, (response)=>{
    setTimeout(()=>{
      this.show_loader = false;
    }, 200);
    if(response!= undefined && response['data']!= undefined){
      this.list_data = response['data'];
    } else {
      this.common_service.show_toast('i', "No Users Found.", "");
      this.list_data = [];
    }
  }) 
}

get_all_masters_data(screen, search_string, callback) {
  setTimeout(() => {
    this.service.get_all_masters_data(screen, search_string, '').subscribe(response => {
      if (response.status == 200) {
        if (callback != "" && callback != undefined) {
          callback(response);
        } else {
          this.show_loader = false;
        }
      } else {
        this.show_loader = false;
        //  this.common_service.show_toast('e', this.common_service.error_message, "");
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");

    });
  }, 50);
}

user_status(params) {
  let status = '';
  if(params['data']['status']  == true){
    status = '<span class="badge  badge-success p-1 badge-custom">Active</span>';
  } else {
    status = '<span class="text-white badge  badge-secondary p-1 badge-custom">Inactive</span>';
  }    
  return status;
} 

add_master(){
  this.action_button_text = "Save";
  
  if( this.screen == 'job-profile'){
    this.popup_title = "Add Job Profile";
    this.success_message = "Job Profile added successfully.";
  } else if( this.screen == 'job-category'){
    this.popup_title = "Add Job Category";
    this.success_message = "Job Category added successfully.";
  } else if( this.screen == 'job-subcategory'){
    this.popup_title = "Add Job Subcategory";
    this.success_message = "Job Subcategory added successfully.";
    
    this.service.get_all_masters_data('job-category', '', '').subscribe(category_data=> {
      this.category_list = category_data['data']
      this.show_loader = false;
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
    
  } else if( this.screen == 'industries'){
    this.popup_title = "Add Job Industries";
    this.success_message = "Job Industries added successfully.";
  } else if( this.screen == 'skills'){
    this.popup_title = "Add Job Skills";
    this.success_message = "Job Skills added successfully.";
    
    this.service.get_all_masters_data('skills-category', '', '').subscribe(skills_category_data=> {
      this.category_list = skills_category_data['data'];
      this.show_loader = false;
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
    
  }
  this.master_id = -1;
  this.show_loader = true;
  this.form_data.name = '';
  this.form_data.id = '';
  if( this.screen == 'job-subcategory' || this.screen == 'skills'){
    this.form_data.category_name = '';
    this.form_data.category_id = '';
  } 
  
  if( this.screen == 'industries'){
    this.form_data.access_type = '';
  }
  
  this.register_modal_ref = this.modalService.show( this.add_edit_model, this.common_params.modal_config );
  this.show_loader = false;
}

public edit_function(master_id){
  this.action_button_text = "Update";
  
  if( this.screen == 'job-profile'){
    this.popup_title = "Edit Job Profile";
    this.success_message = "Job Profile updated successfully.";
  } else if( this.screen == 'job-category'){
    this.popup_title = "Edit Job Category";
    this.success_message = "Job Category updated successfully.";
  } else if( this.screen == 'job-subcategory'){
    this.popup_title = "Edit Job Subcategory";
    this.success_message = "Job Subcategory updated successfully.";
    
    this.service.get_all_masters_data('job-category', '', '').subscribe(category_data=> {
      this.category_list = category_data['data']
      this.show_loader = false;
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
    
  } else if( this.screen == 'industries'){
    this.popup_title = "Edit Job Industries";
    this.success_message = "Job Industries updated successfully.";
  } else if( this.screen == 'skills'){
    this.popup_title = "Edit Job Skills";
    this.success_message = "Job Skills updated successfully.";
    this.service.get_all_masters_data('skills-category', '', '').subscribe(skills_category_data=> {
      this.category_list = skills_category_data['data'];
      this.show_loader = false;
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
  }
  
  this.master_id = master_id;
  this.show_loader = true;
  this.service.get_all_masters_data(this.screen, '', this.master_id).subscribe(response=> {
    if(response.status == 200){
      let master_data = response.data[0];
      this.form_data.name = master_data.name;
      this.form_data.id = master_data.id;
      if( this.screen == 'job-subcategory' || this.screen == 'skills'){
        this.form_data.category_name = master_data.category;
        this.form_data.category_id = master_data.category_id;
      } 
      
      if( this.screen == 'industries'){
        this.form_data.access_type = master_data.access_type;
      }
      
      this.register_modal_ref = this.modalService.show( this.add_edit_model, this.common_params.modal_config );
      this.show_loader = false;
    } else {
      this.show_loader = false;
      
    }
  }, error => {
    this.show_loader = false;
    this.common_service.show_toast('e', this.common_service.error_message, "");

  });
}

public delete_function(master_id){
  this.common_service.show_sweet_confirm_box(" Are you sure ? " , "You want to delete this user?", ()=>{
    this.show_loader = true;
    this.service.delete_master_data(this.screen, master_id).subscribe(response => {
      if (response['status'] ==  200) {
        
        this.common_service.show_toast('s', "User was deleted successfully.", "");
        this.get_all_masters_data(this.screen, '', (response)=>{
          this.show_loader = false;
          if(response!= undefined && response['data']!= undefined){
            this.list_data = response['data'];
          } else {
            this.common_service.show_toast('i', "No Users Found.", "");
            this.list_data = [];
          }
        }) 
        this.register_modal_ref.hide();
      } else {
        this.show_loader = false;
        this.common_service.show_toast('e', "There was some error, Please try again.", "");
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', "There was some error, Please try again.", "");
    });
  }, "")
}

on_submit(isValid: Boolean){
  console.log("isValid ", isValid);
  if (isValid){
    this.shared_service.showLoader(true);

    let dataset = JSON.parse(JSON.stringify(this.form_data));
    this.service.add_update_master_data(this.screen, this.master_id, dataset).subscribe(res=> {
      if(res['status'] == 200){
        this.common_service.show_toast('s', this.success_message, "");
        this.show_loader = false;
        this.get_all_masters_data(this.screen, '', (response)=>{
          this.shared_service.showLoader(false);
          this.register_modal_ref.hide();
          if(response!= undefined && response['data']!= undefined){
            this.list_data = response['data'];
          } else {
            this.common_service.show_toast('i', "No Users Found.", "");
            this.list_data = [];
          }
        }) 
      } else {
        this.common_service.show_toast('e', this.common_service.error_message, "");
        this.shared_service.showLoader(false);
      }
      
    }, error => {
      this.shared_service.showLoader(false);
      this.common_service.show_toast('e', this.common_service.error_message, "");
      
    });
  }
}

}
