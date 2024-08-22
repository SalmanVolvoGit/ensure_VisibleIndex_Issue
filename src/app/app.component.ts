import { Component, OnInit } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { CheckboxComponent } from './checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})



export class AppComponent implements OnInit {
  public columnDefs: ColDef[] = [
    {
      field: 'label',
      headerName: 'Options',
      minWidth: 220,
      wrapText: true,
      cellClass: 'grid-last-column-border',
      cellRenderer: CheckboxComponent
    },
  ];
  readonly defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    resizable: true,
    autoHeight: true,
    cellClass: 'aligning',
    headerClass: 'multiline',
  };
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  gridOptions: GridOptions;

  public rowData: any[] | null = [];
  public themeClass: string = "ag-theme-alphine";
  optionRowData: any[];
  rowIndex: number;

  constructor() { }
  
  ngOnInit(): void {
    this.createDummyData();
    this.gridOptions = {
      rowHeight: 30,
      defaultColDef: this.defaultColDef,
      rowMultiSelectWithClick: false,
      groupSelectsChildren: true,
      suppressRowClickSelection: false,
      rowSelection: 'single',
      alwaysShowHorizontalScroll: false,
      suppressAggFuncInHeader: true,
      enableBrowserTooltips: true,
      // immutableData: true,
      context: {
        check: (params: any) => this.updateCheck(params)
      },
      onGridReady: (params: GridReadyEvent) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.setHeaderHeight(30);
        this.gridApi.setFloatingFiltersHeight(30);
        params.api.sizeColumnsToFit();
      },
    };
  }

  createDummyData(): void {
    this.optionRowData = [];
    for (let i = 0; i < 500; i++) {
      this.optionRowData.push({ label: `Record ${i + 1}`, code: i + 1, type: 'Option', checked: false, packageSelected: false });
    }
    console.log(this.optionRowData);
  }  

  updateCheck(params: any): any {
    if ( params.data.type === 'Option') {
       const rowIndex = this.optionRowData.findIndex(x => x.code === params.data.code);
      this.optionRowData[rowIndex] = params.data;
      this.gridApi.ensureIndexVisible(rowIndex, 'top');
      this.refreshGrid();
    }
  }

  refreshGrid(): void {
    if (this.gridApi) {
      this.gridApi.setRowData(this.optionRowData);
      this.gridApi.refreshCells({force: true});
    }
}

}

      


