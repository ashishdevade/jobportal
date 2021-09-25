
import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GridActionComponent } from 'src/app/modules/admin/common/grid.action';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.scss']
})
export class JobListingComponent implements OnInit {

  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public columnDefs = [];
  public user_list:any = [];
  public gridOptions;
  public searchstring = '';
  @ViewChild('userListGrid', { static: true }) userListGrid: AgGridAngular;
  constructor(
    private router: Router,
    public common_service : CommonService,
    public service : MainService,
    private modalService: BsModalService,
    public shared_service : SharedService
    ) { }
  
  ngOnInit() {
    this.common_service.check_session_on();
    
    this.gridOptions =this.common_params.grid_options();
    this.gridOptions['context']= {
      componentParent: this
    };
    
    this.columnDefs = [
      { headerName: '#', field: 'id', sortable: true, filter: true, checkboxSelection: false, width: 80},
      { headerName: 'Title', field: 'job_title', sortable: true, filter: true, checkboxSelection: false},
      { headerName: 'Category', field: 'category_name', sortable: true, filter: true, checkboxSelection: false },
      { headerName: 'profile', field: 'profile_name', sortable: true, filter: true, checkboxSelection: false },
      { headerName: 'Project Length', field: 'project_length', sortable: true, filter: true, checkboxSelection: false },
      { headerName: 'Expert', field: 'expert_level', sortable: true, filter: true, checkboxSelection: false, cellRenderer: this.expert_level },
      { headerName: 'Rate Type', field: 'rate_type', sortable: true, filter: true, checkboxSelection: false},
      { headerName: 'Posted Date', field: 'date_created', sortable: true, filter: true, checkboxSelection: false },
      { headerName: 'Status', field: 'job_status', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},
      { headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return { idName:  "id", "RowData": params['data'] } } }
    ];
    
    this.show_loader = true;
    this.get_all_job_posting('', (response)=>{
      setTimeout(() => {
        this.show_loader = false;
      }, 200);
      if (response != undefined && response['data'] != undefined) {
        this.user_list = response['data'];
      } else {
        this.common_service.show_toast('i', "No Jobs Found.", "");
        this.user_list = [];
      }
    });
  }
  
  get_all_job_posting(search_string, callback) {
      this.service.get_job_posting(search_string, '', 'h').subscribe(response => {
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
  }
  
  public add_new_job_posting(){
    let edit_router = '/jobs/posting';
    this.common_service.change_route(edit_router);
  }
  
  public edit_function(id){
    let edit_router = '/jobs/posting/' + id;
    this.common_service.change_route(edit_router);
  }
  
  expert_level(params){
    let status = '';
    if (params['data']['expert_level'] == '1') {
      status = 'Entry Level';
    } else if (params['data']['expert_level'] == '2') {
      status = 'Intermediate';
    } else if (params['data']['expert_level'] == '3') {
      status = 'Expert';
    }  
    return status;
  }
  
  user_status(params) {
    let status = '';
    if(params['data']['job_status']  == '1'){
      status = '<span class="badge  badge-warning p-1 badge-custom">Draft</span>';
    } else if (params['data']['job_status'] == '2') {
      status = '<span class="badge  badge-success p-1 badge-custom">Active</span>';
    } else if (params['data']['job_status'] == '3') {
      status = '<span class="badge  badge-secondary p-1 badge-custom">Inactive</span>';
    } else if (params['data']['job_status'] == '4') {
      status = '<span class="badge  badge-danger p-1 badge-custom">Closed</span>';
    } 
    return status;
  } 
  
  search_users(){
    this.show_loader = true;
     this.get_all_job_posting(this.searchstring, (response)=>{
      setTimeout(()=>{
        this.show_loader = false;
      }, 200);
      if(response!= undefined && response['data']!= undefined){
        this.user_list = response['data'];
      } else {
        this.common_service.show_toast('i', "No Users Found.", "");
        this.user_list = [];
      }
    }) 
  }
  
   public delete_function(id){
    this.common_service.show_sweet_confirm_box(" Are you sure ? " , "You want to delete this job posting?", ()=>{
      this.show_loader = true;
      this.service.delete_job_posting(id).subscribe(response => {
        if (response['status'] ==  200) {
          
          this.common_service.show_toast('s', "User was deleted successfully.", "");
          this.get_all_job_posting('', (response) => {
            setTimeout(() => {
              this.show_loader = false;
            }, 200);
            if (response != undefined && response['data'] != undefined) {
              this.user_list = response['data'];
            } else {
              this.common_service.show_toast('i', "No Jobs Found.", "");
              this.user_list = [];
            }
          });
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

}
