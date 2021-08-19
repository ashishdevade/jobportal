import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'grid-action-cell-renderer',
  template: `
  <button (click)="edit_function()" title="Edit" class="btn btn-sm btn-outline-info font-size-13px mr-1"><i class="icon-line-awesome-pencil"></i></button>
  <button (click)="delete_function()" title="Delete" class=" mr-1 btn btn-sm btn-outline-danger font-size-13px"><i class="icon-material-outline-delete"></i></button>
  
  `
})
export class GridActionComponent {
  data: any;
  params: any;
  
  constructor() { }

  agInit(params) {
    this.params = params;
    this.data = params.value;
  }

  ngOnInit() {}
  
  edit_function() {
    let rowData = this.params;
    this.params.context.componentParent.edit_function(rowData['data'][rowData['idName']])
  }

  delete_function() {
    let rowData = this.params;
    this.params.context.componentParent.delete_function(rowData['data'][rowData['idName']])
  }
  
  
}

export type CellAction = (params) => void;