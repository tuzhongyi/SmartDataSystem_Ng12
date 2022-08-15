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
import { EventNumberStatisticModel, EventNumberStatisticSearchInfo } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { ExportBusiness } from '../../business/export.business';
import { GlobalStoreService } from '../../service/global-store.service';
import { Language } from '../../tools/language';
import { Time } from '../../tools/time';
import { SelectItem } from '../select-control/select-control.model';
import { IllegalDropTotalBusiness } from './event-number-statistic.business';
import { IllegalDropStatisticConf } from './event-number-statistic.config';
import { DurationParams } from 'src/app/network/request/IParams.interface';


@Component({
  selector: 'event-number-statistic',
  templateUrl: './event-number-statistic.component.html',
  styleUrls: ['./event-number-statistic.component.less'],
  providers: [
    IllegalDropTotalBusiness
  ]
})
export class EventNumberStatisticComponent implements OnInit {
  TimeUnit = TimeUnit

  // 拉取所有数据
  private _pageSize = 9527E2;
  private _firstSize = 200;

  // 默认展示垃圾落地统计信息
  @Input()
  eventType: EventType = EventType.IllegalDrop


  // 当前区划ID
  private _resourceId: string = '';
  @Input()
  set resourceId(id: string) {
    console.log('set resourceId')
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
    console.log('set resourceType')
    this._resourceType = type;
    this.searchInfo.ResourceType = EnumHelper.GetResourceChildType(type);
  }
  get resourceType() {
    return this._resourceType;
  }

  // 默认筛选项
  private _resourceDefault: UserResourceType = EnumHelper.GetResourceChildType(this.resourceType)
  @Input()
  set resourceDefault(type: UserResourceType) {
    console.log('set default')
    this._resourceDefault = type;
    this.searchInfo.ResourceType = type;
  }
  get resourceDefault() {
    return this._resourceDefault;
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
    BeginTime: Time.beginTime(new Date(this.curDate)),
    EndTime: Time.endTime(new Date(this.curDate)),
    ResourceType: this.resourceDefault,
    ResourceId: this.resourceId,
    TimeUnit: TimeUnit.Day,
  }


  constructor(private _business: IllegalDropTotalBusiness, private exports: ExportBusiness) { }

  ngOnInit(): void {
    // 模版要用 ngValue
    this._initUserResourceType();
    this._init();

  }
  private async _init() {

    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);
    console.log(res.Page)
    this.page = res.Page
    this.dataSubject.next(res.Data);
    this.loadFinish = true;


  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  search() {
    // this._init();
    this.loadFinish = false;
    console.log(this.searchInfo);
  }

  exportCSV() {
    let title = this._getTitle();
    let header = ['序号', '行政区', '上级行政区', '单位(起)']
    this._business.exportCSV(title, header, this.dataSubject.value)
  }
  exportXLSX() {

    let title = this._getTitle();
    let header = ['序号', '行政区', '上级行政区', '单位(起)']
    this._business.exportXLSX(title, header, this.dataSubject.value)
  }


  changeDate(date: Date) {
    this._init();
    this.loadFinish = false;
  }

  changeTimeUnit(unit: TimeUnit) {
    console.log(unit);

    if (unit == TimeUnit.Day) {
      this.searchInfo.BeginTime = Time.beginTime(this.curDate);
      this.searchInfo.EndTime = Time.endTime(this.curDate);
    } else if (unit == TimeUnit.Week) {
      Time.curWeek(this.curDate)
    } else if (unit === TimeUnit.Month) {

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
      )
      this.options.push(item);

    } while (resourceType != UserResourceType.Station);// 最底层区划是 GarbageStation

  }
  private _getTitle() {
    let date = formatDate(this.curDate, 'yyyy年MM月dd日', 'zh-CN');
    let userType = Language.UserResourceType(this.searchInfo.ResourceType);
    let eventType = Language.EventType(this.eventType);
    return `${date}${userType}${eventType}总数据`;
  }
}
