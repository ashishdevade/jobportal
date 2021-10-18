import { Component, OnInit, TemplateRef, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CommonFunctions } from "src/app/core/helpers/common.functions";
import { CommonService } from "src/app/core/services/common.service";
import { MainService } from "src/app/core/services/main.service";
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss']
})

export class JobPostionComponent implements OnInit {

  public job_id:any = '';
  public common_params = new CommonFunctions();
  public show_loader = false;
  public form_data:any = {};
  public password_form_data:any = {};
  public success_message = '';
  public candidate_required_list:any = [];
  public candidate_type_list : any = [];
  public job_category_list:any = [];
  public skills_list:any = [];
  public country_list:any = [];
  public job_profile_list: any;
  public industry_list: any;
  public  candidate_language_list: any;
  state_list: any;
  city_list: any;
  expertise_level:any
  public project_length_list = [];
  public question_list = [];
  public company_details:any = {};
  
  constructor(
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    public common_service : CommonService,
    public service : MainService,
    public shared_service : SharedService
    ) {  }
  
  ngOnInit() {
    this.common_service.check_session_on();
    this.job_id = this.ActivatedRoute.snapshot.paramMap.get('one');
    this.expertise_level = this.common_params.expertise_level;
    this.project_length_list = this.common_params.project_length;
    this.company_details = JSON.parse(sessionStorage.user_details);
    this.candidate_type_list = this.common_params.candidate_type;
    for(var i = 1; i <= 100; i++){
      this.candidate_required_list.push( { "key" : i, "value" : i } );
    }
  
    this.show_loader = true;
    this.get_language_list(()=>{
      
    });
    this.get_countries(() => {

    });
    
    this.get_skills(() => {

    });
    
    this.get_category_list(() => {

    });
    
    this.get_industry_list((response) => {
      let d = response.data.filter((obj)=>{
        return obj.id == this.company_details.industry
      });
      
      if (d.length > 0){
        this.form_data.industry = d[0]['id'];
        this.form_data.industry_name = d[0]['name'];
      }
      
      this.get_job_profile(() => {
        this.show_loader = false;

      });
    });
    
    if (this.job_id == null) {
      this.success_message = 'Job Posting Added Successfully';
      this.form_data.candidate_required_id = 1;
      this.form_data.candidate_type = '2';
      this.form_data.rate_type = 'hourly';
      this.form_data.project_status = '1';
      this.form_data.project_type  = '1';
      this.form_data.category_id = '';
      this.form_data.profile_id = 0;
      
      this.form_data.other_industry = this.company_details.industry;
      this.form_data.minimum_hours_from_candidate = 20;
      this.form_data.job_country_id = this.company_details['country_id'];
      this.form_data.job_country_name = this.company_details['country'];
      this.form_data.job_country = this.company_details['country'];
      this.form_data.project_length = this.project_length_list[0]['value'];
      this.form_data.expert_level = this.expertise_level[0]['value']
      this.form_data.status = 1;
      this.form_data.job_preference = 'Remote';
      this.form_data.department = '';
      this.form_data.hourly_rate_from = 5;
      this.form_data.hourly_rate_to = 200;
      this.form_data.question_list = [];
      this.form_data.skill_expertise_list = [];
      this.add_more_rows();
      this.add_more_skills();
    } else {
      this.success_message = 'Job Posting Updated Successfully';
      this.get_all_job_posting(this.job_id, (response) => {
        setTimeout(() => {
          this.show_loader = false;
        }, 200);
        if (response != undefined && response['data'] != undefined) {
          this.form_data = response['data'][0];
          this.form_data.job_desc = this.form_data.job_description,
          
				
        this.form_data.candidate_req_details = this.form_data.candidate_required_description
				this.form_data.expert_level = this.form_data.expert_level
          this.form_data.job_country = this.form_data.location_country;
				this.form_data.job_country_id = this.form_data.location_country_id
				this.form_data.job_country_name = this.form_data.location_country
				this.form_data.category_id = this.form_data.category
				this.form_data.profile_id = this.form_data.job_profile_id
				this.form_data.industry = this.form_data.industry_id
				this.form_data.skills = this.form_data.skills_list
				this.form_data.rate_type = this.form_data.rate_type
				this.form_data.hourly_rate_from = this.form_data.hourly_rate_from
				this.form_data.hourly_rate_to = this.form_data.hourly_rate_to
				this.form_data.fixed_rate = this.form_data.fixed_rate
				this.form_data.project_type = this.form_data.project_type
				this.form_data.project_status = this.form_data.project_status
				this.form_data.project_length = this.form_data.project_length
				this.form_data.candidate_type = this.form_data.candidate_required_type
				this.form_data.candidate_required_id = this.form_data.total_candidate_required
				this.form_data.minimum_hours_from_candidate = this.form_data.minimum_hours_from_candidate
        this.form_data.candidate_country = this.form_data.candidate_country_name;
        this.form_data.candidate_state = this.form_data.candidate_state_name;
        this.form_data.candidate_city = this.form_data.candidate_city_name;
          this.form_data.candidate_country_id = (this.form_data.candidate_country_id != null) ? this.form_data.candidate_country_id : 0
				this.form_data.candidate_country_name = this.form_data.candidate_country_name
				this.form_data.candidate_state_name = this.form_data.candidate_state_name
          this.form_data.candidate_state_id = (this.form_data.candidate_state_id != null) ? this.form_data.candidate_state_id : 0
          this.form_data.candidate_city_id = (this.form_data.candidate_city_id != null) ? this.form_data.candidate_city_id : 0
				this.form_data.candidate_city_name = this.form_data.candidate_city_name
          this.form_data.candidate_language = this.form_data.candidate_language
          this.form_data.department = this.form_data.department
          this.form_data.job_preference = this.form_data.job_preference
				this.form_data.status = parseInt(this.form_data.job_status)
       
          console.log("this.form_data ", this.form_data);
        } else {
          this.common_service.show_toast('i', "No Jobs Found.", "");
          this.form_data = {};
        }
      });
    }
  }
  
  get_all_job_posting(job_id , callback) {
    this.service.get_job_posting('', job_id, 'd').subscribe(response => {
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
  
  get_skills(callback) {
    this.show_loader = true;
    console.log(" in get_skills ");
    this.service.get_skills(-1).subscribe(response => {
      if (response.status == 200) {
        this.skills_list = response.data;
      }

      if (callback != "" && callback != undefined) {
        callback(response);
      } else {
        this.show_loader = false;
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
  }

  
  add_more_rows() {
    this.form_data.question_list.push({
      "question": "",
      "mandatory": "1",
    });
  }
  
  remove_row(index){
    this.form_data.question_list.splice(index, 1);
  }
  
  add_more_skills() {
    this.form_data.skill_expertise_list.push({
      "headinng": "",
      "multiple_hastags": "",
    });
  }

  remove_skills(index) {
    this.form_data.skill_expertise_list.splice(index, 1);
  }
  
  get_category_list(callback) {
    setTimeout(() => {
      this.service.get_category_list('').subscribe(response => {
        if (response.status == 200) {
          this.job_category_list = response['data'];
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
   
  get_language_list(callback) {
    this.show_loader = true;
    console.log(" in get_language_list ");
    this.service.get_language_list(-1).subscribe(response => {
      if (response.status == 200) {
        this.candidate_language_list = response.data;
      }

      if (callback != "" && callback != undefined) {
        callback()
      } else {
        this.show_loader = false;
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
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
  
  get_industry_list(callback) {
    setTimeout(() => {
     let  typeind = 'Company';
      this.service.get_industry_list('', typeind).subscribe(response => {
        if (response.status == 200) {
          this.industry_list = response['data'];
          if (callback != "" && callback != undefined) {
            callback(response)
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
  
  get_countries(callback) {
    this.show_loader = true;
    this.service.get_countries(-1).subscribe(response => {
      if (response.status == 200) {
        this.country_list = response.data;
      }

      if (callback != "" && callback != undefined) {
        callback(response);
      } else {
        this.show_loader = false;
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
  }
  
  get_states(country_id, callback) {
    this.show_loader = true;
    console.log(" in get_states ");
    this.service.get_states(country_id).subscribe(response => {
      if (response.status == 200) {
        this.state_list = response.data;
      }

      if (callback != "" && callback != undefined) {
        callback(response);
      } else {
        this.show_loader = false;
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
  }

  get_cities(state_id, callback) {
    this.show_loader = true;
    this.service.get_cities(state_id).subscribe(response => {
      if (response.status == 200) {
        this.city_list = response.data;
      }

      if (callback != "" && callback != undefined) {
        callback(response);
      } else {
        this.show_loader = false;
      }
    }, error => {
      this.show_loader = false;
      this.common_service.show_toast('e', this.common_service.error_message, "");
    });
  }
  
  get_state($event) {
    this.form_data.candidate_country_name = $event.name;
    this.form_data.candidate_country_id = $event.id;
    this.get_states($event.id, (res) => {
      this.show_loader = false;
    })
  }

  state_select($event) {
    this.form_data.candidate_state_name = $event.name;
    this.form_data.candidate_state_id = $event.id;
    this.get_cities($event.id, (res) => {
      this.show_loader = false
    })
  }
  
  city_select($event) {
    this.form_data.candidate_city_name = $event.name;
    this.form_data.candidate_city_id = $event.id;
  }
  
  select_skills($event) {
    this.form_data.skill_name = $event.name;
    this.form_data.skill_id = $event.id;
  }
  
  select_industry($event) {
    this.form_data.industry_name = $event.name;
    this.form_data.industry_id = $event.id;
  }
  
  goback(){
    let edit_router = 'jobs/listing';
    this.common_service.change_route(edit_router);
  }
  
  on_submit(isValid: Boolean) {
    console.log("isValid ", isValid);
    if (isValid) {
      let dataset = JSON.parse(JSON.stringify(this.form_data));
      this.show_loader = true;
      this.service.add_update_job_posting(dataset, this.job_id).subscribe(res => {
        if (res['status'] == 200) {
          this.common_service.show_toast('s', this.success_message, "");
          this.show_loader = false;
          setTimeout(() => {
            this.goback()
          }, 1000);

        } else {
          this.common_service.show_toast('e', "one " + this.common_service.error_message, "");
          this.show_loader = false;
        }

      }, error => {
        this.show_loader = false;
        this.common_service.show_toast('e', "two " + this.common_service.error_message, "");

      });
   
    }
  }

}
 