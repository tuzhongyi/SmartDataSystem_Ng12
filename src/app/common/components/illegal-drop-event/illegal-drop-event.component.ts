import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Page } from 'src/app/network/model/page_list.model';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/view-model/illegal-drop-event.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { Time } from '../../tools/time';
import { IllegalDropEventBusiness } from './illegal-drop-event.business';

import { IllegalDropEventConf } from './illegal-drop-event.conf';

@Component({
  selector: 'howell-illegal-drop-event',
  templateUrl: './illegal-drop-event.component.html',
  styleUrls: ['./illegal-drop-event.component.less'],
  providers: [IllegalDropEventBusiness],
})
export class IllegalDropEventComponent implements OnInit {
  // Table
  dataSubject = new BehaviorSubject<IllegalDropEventModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...IllegalDropEventConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = [];
  zoomIn = true;
  selectedRows: IllegalDropEventModel[] = []; //table选中项
  willBeDeleted: IllegalDropEventModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  today = new Date();
  searchInfo: IllegalDropEventSearchInfo = {
    Condition: '',
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
    // DivisionIds: ['310109000000', '310110018000', '310109011002'],
    DivisionIds: [],
    StationIds: [],
    CameraIds: [],
    Filter: true,
  };
  constructor(private _business: IllegalDropEventBusiness) {}

  async ngOnInit() {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex);
    console.log(res);

    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  selectTableRow(rows: IllegalDropEventModel[]) {
    this.selectedRows = rows;
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
}
