import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PagedList } from 'src/app/network/model/page_list.model';
import { IllegalDropRecordModel } from 'src/app/view-model/illegal-drop-record.model';
import { TableModel } from 'src/app/view-model/table.model';
import { IllegalDropRecordBusiness } from './illegal-drop-record.business';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-illegal-drop-record',
  templateUrl: './illegal-drop-record.component.html',
  styleUrls: ['./illegal-drop-record.component.less'],
  providers: [IllegalDropRecordBusiness, DatePipe],
})
export class IllegalDropRecordComponent implements OnInit {
  show = false;

  columns: TableModel[] = [
    {
      columnDef: 'ImageUrl',
      header: '图片',
      cell: (element: IllegalDropRecordModel) =>
        `<img src=${element.ImageUrl}/>`,
      style: {},
      cls: ['pic'],
    },
    {
      columnDef: 'ResourceName',
      header: '资源名称',
      cell: (element: IllegalDropRecordModel) => `${element.ResourceName}`,
    },
    {
      columnDef: 'StationName',
      header: '投放点',
      cell: (element: IllegalDropRecordModel) => `${element.StationName}`,
    },
    {
      columnDef: 'CountyName',
      header: '街道',
      cell: (element: IllegalDropRecordModel) => `${element.CountyName}`,
    },
    {
      columnDef: 'CommitteeName',
      header: '居委会',
      cell: (element: IllegalDropRecordModel) => `${element.CommitteeName}`,
    },

    {
      columnDef: 'EventTime',
      header: '上报时间',
      cell: (element: IllegalDropRecordModel) => `${element.EventTime}`,
    },
    {
      columnDef: 'Operation',
      header: '操作',
      cell: (element: IllegalDropRecordModel) => `
      <i class='howell-icon-video '/>
      <i class='howell-icon-picturedownload'/>
      <i class='howell-icon-videodownload'/>
      `,
    },
  ];
  displayedColumns: string[] = this.columns.map((column) => column.columnDef);
  pagedList: PagedList<IllegalDropRecordModel> = new PagedList();

  dataSource: IllegalDropRecordModel[] = [];

  pageIndex = 1;
  pageSize = 9;

  constructor(
    private _business: IllegalDropRecordBusiness,
    private _sanitizer: DomSanitizer
  ) {
    this.pagedList.Data = [];
    this.dataSource = this.pagedList.Data;

    this._business._dataStream.subscribe(
      (res: PagedList<IllegalDropRecordModel>) => {
        this.dataSource = res.Data;
        this.pagedList = res;
      }
    );
  }

  ngOnInit(): void {
    this.initialize();
  }
  async initialize() {
    let res = await this._business.loadData(this.pageIndex);
  }
  async prev() {
    let res = await this._business.loadData(--this.pageIndex);
  }
  async next() {
    let res = await this._business.loadData(++this.pageIndex);
  }
}
