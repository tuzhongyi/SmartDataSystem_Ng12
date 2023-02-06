import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { Page } from 'src/app/network/model/page_list.model';
import {
  IllegalDropEventModel,
  IllegalDropEventSearchInfo,
} from 'src/app/common/components/illegal-drop-event/illegal-drop-event.model';
import {
  TableColumnModel,
  TableOperateModel,
} from 'src/app/view-model/table.model';
import { TimeService } from '../../service/time.service';
import { IllegalDropEventBusiness } from './illegal-drop-event.business';

import { IllegalDropEventConverter } from './illegal-drop-event.converter';
import { ViewMode } from 'src/app/enum/view-mode.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { DivisionTreeSource } from '../division-tree/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { Language } from '../../tools/language';
import { EventType } from 'src/app/enum/event-type.enum';

@Component({
  selector: 'howell-illegal-drop-event',
  templateUrl: './illegal-drop-event.component.html',
  styleUrls: ['./illegal-drop-event.component.less'],
  providers: [IllegalDropEventBusiness, IllegalDropEventConverter],
})
export class IllegalDropEventComponent implements OnInit {
  Language = Language;
  ViewMode = ViewMode;
  EventType = EventType;

  dateFormat: string = 'yyyy年MM月dd日';
  showMode = false;

  widths = ['7%', '13%', '10%', '10%', '10%', '10%', '10%', '5%'];
  dataSource: IllegalDropEventModel[] = [];
  selectedNodes: CommonFlatNode[] = [];

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  today = new Date();
  searchInfo: IllegalDropEventSearchInfo = {
    Condition: '',
    BeginTime: this._timeService.beginTime(this.today),
    EndTime: this._timeService.endTime(this.today),
    // DivisionIds: ['310109000000', '310110018000', '310109011002'],
    DivisionIds: ['310109000000'],
    StationIds: [],
    CameraIds: [],
    Filter: false,
    PageIndex: 1,
    PageSize: 9,
  };

  viewMode = ViewMode.table;
  template?: TemplateRef<HTMLElement>;

  @ViewChild('tableTemplate') tableTemplate?: TemplateRef<HTMLElement>;
  @ViewChild('cardTemplate') cardTemplate?: TemplateRef<HTMLElement>;

  constructor(
    private _business: IllegalDropEventBusiness,
    private _timeService: TimeService
  ) {}

  async ngOnInit() {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    // console.log(res);
    this.page = res.Page;

    this.dataSource = res.Data;
  }
  ngAfterViewInit(): void {
    // template 加载完后，再进行一次 change detection
    setTimeout(() => {
      this._render();
    }, 0);
  }

  search() {
    this.searchInfo.PageIndex = 1;
    this._init();
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  toggleFilterHandler() {
    this.searchInfo.Filter = !this.searchInfo.Filter;
    if (!this.searchInfo.Filter) {
      // 重置状态
      this.searchInfo.BeginTime = TimeService.beginTime(this.today);
      this.searchInfo.EndTime = TimeService.endTime(this.today);
    }
  }

  changeViewMode(viewMode: ViewMode) {
    console.log(viewMode);
    this.viewMode = viewMode;
    this.showMode = false;
    if (viewMode == ViewMode.table) {
      this.searchInfo.PageIndex = 1;
      this.searchInfo.PageSize = 9;
    } else if (viewMode == ViewMode.card) {
      this.searchInfo.PageIndex = 1;
      this.searchInfo.PageSize = 12;
    }
    this._init();
    this._render();
  }

  selectTreeNode(nodes: CommonFlatNode<DivisionTreeSource>[]) {
    this.selectedNodes = nodes;
    // for (let i = 0; i < nodes.length; i++) {
    //   const node = nodes[i];
    //   this.division = node.RawData as Division;
    // }
  }

  private _render() {
    if (this.viewMode == ViewMode.table) {
      this.template = this.tableTemplate;
    } else if (this.viewMode == ViewMode.card) {
      this.template = this.cardTemplate;
    }
  }
}
