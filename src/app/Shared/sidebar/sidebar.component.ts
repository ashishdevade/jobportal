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
  constructor() { }

  ngOnInit(): void {
    this.profile_side_menu = this.common_params.profile_settings_list;
  }

}
