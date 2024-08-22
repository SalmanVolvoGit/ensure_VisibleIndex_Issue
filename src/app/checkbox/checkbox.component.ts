import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  changeSelection(params: any, event: any): boolean {
    // console.log(params.value);
    event.originalEvent.stopPropagation();
    // Send Message back to the grid.
    this.params.context.check(this.params);
    return false;
  }

  refresh(): boolean {
    return false;
  }

}
