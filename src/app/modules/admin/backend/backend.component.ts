import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/core/services/shared.service";

@Component({
  selector: 'app-backend',
  templateUrl: './backend.component.html',
  styleUrls: ['./backend.component.scss']
})
export class BackendComponent implements OnInit {
  public loader_toggle = false;

  constructor(
    public shared_service : SharedService
    ) {
    this.shared_service.loaderValue.subscribe((obj)=>{
      console.log("obj ", obj);
      this.loader_toggle = obj;
    });
    
  }

  ngOnInit(): void {
  }

}
