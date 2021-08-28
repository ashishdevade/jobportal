
import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { GridActionComponent } from '../../common/grid.action';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {


  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public columnDefs = [];
  public user_list:any = [];
  public industry_list:any = [];
  public gridOptions;
  public searchstring = '';
  public register_modal_ref: BsModalRef;
  
  public popup_title = '';
  public action_button_text = '';
  public success_message = '';
  
  @ViewChild('userListGrid', { static: true }) userListGrid: AgGridAngular;
  constructor(
    private router: Router,
    public common_service : CommonService,
    public service : MainService,
    private modalService: BsModalService,
    public shared_service : SharedService
    ) { }
  
  ngOnInit() {
    this.common_service.check_admin_session_on();
    
    this.gridOptions =this.common_params.grid_options();
    this.gridOptions['context']= {
      componentParent: this
    };
    
    this.columnDefs = [
    {headerName: '#', field: 'user_account_id', sortable: true, filter: true, checkboxSelection: false, width: 80},
    {headerName: 'First Name', field: 'first_name', sortable: true, filter: true, checkboxSelection: false},
    {headerName: 'Last Name', field: 'last_name', sortable: true, filter: true, checkboxSelection: false},
    {headerName: 'Email', field: 'email_id', sortable: true, filter: true, checkboxSelection: false},
    /*{headerName: 'Mobile', field: 'Mobile', sortable: true, filter: true, checkboxSelection: false},*/
    {headerName: 'Status', field: 'Active', sortable: true, filter: true, checkboxSelection: false, cellRenderer:this.user_status},
    {headerName: 'Action', field: '', sortable: false, filter: false, checkboxSelection: false, cellRendererFramework: GridActionComponent, cellRendererParams: (params) => { return {idName :  "user_account_id", "RowData": params['data'] } } }
    ];
    
    this.show_loader = true;
    this.get_all_candidate_users('', (response)=>{
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
  
   search_users(){
    this.show_loader = true;
     this.get_all_candidate_users(this.searchstring, (response)=>{
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
  
  get_all_candidate_users(search_string, callback) {
    setTimeout(() => {
      this.service.get_all_candidate_users(search_string).subscribe(response => {
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
  
  public edit_function(user_id){
    let edit_router = '/admin/users/edit/student/' + user_id; 
    this.common_service.change_route(edit_router);
  }
  
  public delete_function(user_id){
    this.common_service.show_sweet_confirm_box(" Are you sure ? " , "You want to delete this user?", ()=>{
      this.show_loader = true;
      this.service.soft_delete_user(user_id).subscribe(response => {
        if (response['status'] ==  200) {
          
          this.common_service.show_toast('s', "User was deleted successfully.", "");
          this.get_all_candidate_users('', (response)=>{
          this.show_loader = false;
            if(response!= undefined && response['data']!= undefined){
              this.user_list = response['data'];
            } else {
              this.common_service.show_toast('i', "No Users Found.", "");
              this.user_list = [];
            }
          }) 
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
 
 quick_register(template: TemplateRef<any>){
   this.popup_title = "Add Candidate User";
   this.action_button_text = "Save";
   this.success_message = "Candidate user added successfully.";
   this.show_loader = true;
   this.form_data.industry = '';
   this.form_data.account_type = 'Student';
   this.common_params.modal_config.class = 'modal-md';
   this.register_modal_ref = this.modalService.show( template, this.common_params.modal_config );
   this.show_loader = false;
 }
 
 on_submit(isValid: Boolean){
   if (isValid){
     this.form_data.user_password = this.common_params.generate_random_pass(12);
     this.form_data.re_enter_password = this.form_data.user_password ;
     this.shared_service.showLoader(true);
     this.service.registration(this.form_data.firstname,this.form_data.lastname, this.form_data.email_address, this.form_data.re_enter_password, this.form_data.account_type, '', '', '').subscribe(response => {
       if(response['data'] != undefined){
         this.shared_service.showLoader(false);
         this.common_service.show_toast('s', "The following user has been registered. We have sent a generate password link to mentioned email id.", "");
         
         this.get_all_candidate_users('', (response)=>{
           setTimeout(()=>{
             this.shared_service.showLoader(false);
           }, 200);
           if(response!= undefined && response['data']!= undefined){
             this.user_list = response['data'];
             this.register_modal_ref.hide();
           } else {
             this.common_service.show_toast('i', "No Users Found.", "");
             this.user_list = [];
             this.register_modal_ref.hide();
           }
         }) 
         
       } else {
         this.form_data.user_password = '';
         this.form_data.re_enter_password = '';
         this.shared_service.showLoader(false);
         this.common_service.show_toast('w', response['msg'], "");
       }
     }, error=> {
       this.shared_service.showLoader(false);
       this.common_service.show_toast('e', "There was some error, Please try again.", "");
     });
     
   }
 }
 
}
