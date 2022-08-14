import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import * as XLSX from 'xlsx';



import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { EventNumberStatisticModel, EventNumberStatisticSearchInfo } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { GlobalStoreService } from '../../service/global-store.service';
import { Language } from '../../tools/language';
import { Time } from '../../tools/time';
import { SelectItem } from '../select-control/select-control.model';
import { IllegalDropTotalBusiness } from './event-number-statistic.business';
import { IllegalDropStatisticConf } from './event-number-statistic.config';
import { formatDate } from '@angular/common';


@Component({
  selector: 'event-number-statistic',
  templateUrl: './event-number-statistic.component.html',
  styleUrls: ['./event-number-statistic.component.less'],
  providers: [
    IllegalDropTotalBusiness
  ]
})
export class EventNumberStatisticComponent implements OnInit {

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
    BeginTime: Time.beginTime(this.curDate),
    EndTime: Time.endTime(this.curDate),
    ResourceType: this.resourceDefault,
    ResourceId: this.resourceId
  }


  constructor(private _business: IllegalDropTotalBusiness) { }

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
    this._init();
    this.loadFinish = false;
  }

  changeBegin(date: Date) {
    this.curDate = date;
    this.searchInfo.BeginTime = Time.beginTime(date);
    this.searchInfo.EndTime = Time.endTime(date);
  }
  exportCSV() {
    let title = this._getTitle();
    this._business.exportCSV(title, this.dataSubject.value)

  }
  exportXLSX() {
    // let aoo = [
    //   { S: 1, h: 2, e: "", e_1: "", t: 5, J: 6, S_1: 7 },
    //   { S: 2, h: 3, e: "", e_1: "", t: 6, J: 7, S_1: 8 },
    //   { S: 3, h: 4, e: "", e_1: "", t: 7, J: 8, S_1: 9 },
    //   { S: 4, h: 5, e: 6, e_1: 7, t: 8, J: 9, S_1: 0 },
    // ]
    // let worksheet = XLSX.utils.aoa_to_sheet([[]]);
    // XLSX.utils.sheet_add_aoa(worksheet, [['table']], { origin: { r: 0, c: 2 } });
    // // XLSX.utils.sheet_add_json(worksheet, aoo, { origin: -1 });

    // let worksheet2 = XLSX.utils.json_to_sheet(aoo);
    // let workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'hello');
    // XLSX.utils.book_append_sheet(workbook, worksheet2, 'sh');

    // console.log(workbook)
    // XLSX.writeFile(workbook, "aa.csv");
    let title = this._getTitle();
    let header = ['序号', '行政区', '上级行政区', '单位(起)']
    this._business.exportXLSX(title, header, this.dataSubject.value)
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
  chunk() {
    // 分批次加载
    // this.loadFinish = false;

    // // 加载前 _firstSize 条数据
    // let res = await this._business.init(this.searchInfo, this.pageIndex, this._firstSize);
    // this.dataSubject.next(res.Data);

    // console.log(res.Page);

    // // 获得总记录数,计算出还需请求几次
    // let count = Math.ceil(res.Page.TotalRecordCount / this._firstSize) - 1;

    // let tasks: Promise<number>[] = [];
    // // 互不依赖的异步任务不需要 await 
    // for (let i = 1; i <= count; i++) {
    //   let promise = this._business.init(this.searchInfo, i, this._firstSize).then(res => {
    //     this.dataSubject.next([...this.dataSubject.value, ...res.Data]);
    //     console.log(i)
    //     return (i)
    //   });
    //   tasks.push(promise)

    // }
    // // 所有数据加载完成
    // Promise.all(tasks).then((result) => {
    //   console.log('finish')
    //   this.loadFinish = true;
    // })
  }
}
