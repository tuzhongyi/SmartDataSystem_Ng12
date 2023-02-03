import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';

import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import {
  EventNumberStatisticModel,
  EventNumberStatisticSearchInfo,
} from 'src/app/view-model/event-number-statistic.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { ExportBusiness } from '../../business/export.business';
import { GlobalStorageService } from '../../service/global-storage.service';
import { Language } from '../../tools/language';
import { TimeService } from '../../tools/time';
import { SelectItem } from '../select-control/select-control.model';
import { IllegalDropTotalBusiness } from './event-number-statistic.business';
import { IllegalDropStatisticConf } from './event-number-statistic.config';
import { EventNumberStatisticExportConverter } from './event-number-statistic-export.converter';

@Component({
  selector: 'event-number-statistic',
  templateUrl: './event-number-statistic.component.html',
  styleUrls: ['./event-number-statistic.component.less'],
  providers: [EventNumberStatisticExportConverter, IllegalDropTotalBusiness],
})
export class EventNumberStatisticComponent implements OnInit {
  TimeUnit = TimeUnit;

  // 拉取所有数据
  private _pageSize = 9527e2;
  private _firstSize = 200;

  // 默认展示垃圾落地统计信息
  @Input()
  eventType: EventType = EventType.IllegalDrop;

  // 当前区划ID
  private _resourceId: string = '';
  @Input()
  set resourceId(id: string) {
    console.log('set resourceId');
    this._resourceId = id;
    this.searchInfo.ResourceId = id;
  }
  get resourceId() {
    return this._resourceId;
  }

  // 当前区划等级
  private _resourceType: UserResourceType = UserResourceType.City;
  @Input()
  set resourceType(type: UserResourceType) {
    console.log('set resourceType');
    this._resourceType = type;
    this.searchInfo.ResourceType = EnumHelper.GetResourceChildType(type);
  }
  get resourceType() {
    return this._resourceType;
  }

  // 默认筛选项
  private _resourceDefault: UserResourceType = EnumHelper.GetResourceChildType(
    this.resourceType
  );
  @Input()
  set resourceDefault(type: UserResourceType) {
    console.log('set default');
    this._resourceDefault = type;
    this.searchInfo.ResourceType = type;
  }
  get resourceDefault() {
    return this._resourceDefault;
  }

  get week() {
    return this.searchInfo.TimeUnit == TimeUnit.Week;
  }

  // 下拉表
  options: SelectItem[] = [];
  loadFinish = false;

  // Table
  dataSubject = new BehaviorSubject<EventNumberStatisticModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...IllegalDropStatisticConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  dateFormat: string = 'yyyy年MM月dd日';
  curDate = new Date();

  searchInfo: EventNumberStatisticSearchInfo = {
    BeginTime: TimeService.beginTime(this.curDate),
    EndTime: TimeService.endTime(this.curDate),
    ResourceType: this.resourceDefault,
    ResourceId: this.resourceId,
    TimeUnit: TimeUnit.Day,
  };

  constructor(
    private _business: IllegalDropTotalBusiness,
    private exports: ExportBusiness
  ) {}

  ngOnInit(): void {
    // 模版要用 ngValue
    this._initUserResourceType();
    this._init();
  }
  private async _init() {
    let res = await this._business.init(
      this.searchInfo,
      this.pageIndex,
      this._pageSize
    );
    this.page = res.Page;
    this.dataSubject.next(res.Data);
    this.loadFinish = true;
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  search() {
    if (this.loadFinish) {
      this._init();
      this.loadFinish = false;
    }

    // console.log(this.searchInfo);
  }

  exportCSV() {
    if (this.loadFinish) {
      let title = this._getTitle();
      let header = ['序号', '行政区', '上级行政区', '单位(起)'];
      this._business.exportCSV(title, header, this.dataSubject.value);
    }
  }
  exportXLSX() {
    if (this.loadFinish) {
      let title = this._getTitle();
      let header = ['序号', '行政区', '上级行政区', '单位(起)'];
      this._business.exportXLSX(title, header, this.dataSubject.value);
    }
  }

  // 更改日期,重新计算开始/结束时间
  changeDate(date: Date) {
    this._updateSearchInfo();
  }

  // 更改时间单位,重新计算开始/结束时间
  changeTimeUnit(unit: TimeUnit) {
    this.searchInfo.TimeUnit = unit;

    this._updateSearchInfo();

    this.search();
  }
  private _updateSearchInfo() {
    if (this.searchInfo.TimeUnit == TimeUnit.Day) {
      this.searchInfo.BeginTime = TimeService.beginTime(this.curDate);
      this.searchInfo.EndTime = TimeService.endTime(this.curDate);
    } else if (this.searchInfo.TimeUnit == TimeUnit.Week) {
      this.searchInfo.BeginTime = TimeService.curWeek(this.curDate).beginTime;
      this.searchInfo.EndTime = TimeService.curWeek(this.curDate).endTime;
    } else if (this.searchInfo.TimeUnit == TimeUnit.Month) {
      this.searchInfo.BeginTime = TimeService.curMonth(this.curDate).beginTime;
      this.searchInfo.EndTime = TimeService.curMonth(this.curDate).endTime;
    }
  }

  private _initUserResourceType() {
    let resourceType: UserResourceType = this.resourceType;
    do {
      resourceType = EnumHelper.GetResourceChildType(resourceType);

      let item = new SelectItem(
        resourceType.toString(),
        resourceType,
        Language.UserResourceType(resourceType)
      );
      this.options.push(item);
    } while (resourceType != UserResourceType.Station); // 最底层区划是 GarbageStation
  }
  private _getTitle() {
    let date = formatDate(this.curDate, 'yyyy年MM月dd日', 'zh-CN');
    let userType = Language.UserResourceType(this.searchInfo.ResourceType);
    let eventType = Language.EventType(this.eventType);
    return `${date}${userType}${eventType}总数据`;
  }
}
