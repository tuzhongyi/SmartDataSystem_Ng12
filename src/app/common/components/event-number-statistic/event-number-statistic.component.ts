import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
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
  private _pageSize = 9527;
  private _firstSize = 20;

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
  today = new Date();

  searchInfo: EventNumberStatisticSearchInfo = {
    BeginTime: Time.beginTime(this.today),
    EndTime: Time.endTime(this.today),
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
    // if (this.searchInfo.ResourceType == UserResourceType.County) {
    //   this._firstSize = 50;
    // }
    // else if (this.searchInfo.ResourceType == UserResourceType.Committees) {
    //   this._firstSize = 1000;
    // }
    // else if (this.searchInfo.ResourceType == UserResourceType.Station) {
    //   this._firstSize = 100;
    // }
    // let res1 = await this._business.init(this.searchInfo, this.pageIndex, this._firstSize);
    // this.dataSubject.next(res1.Data);

    // let res2 = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize - this._firstSize);

    // this.dataSubject.next([...res1.Data, ...res2.Data]);

    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);
    console.log(res)
    this.dataSubject.next(res.Data);
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  search() {
    this._init();
    console.log(this.searchInfo)
  }

  changeBegin(date: Date) {
    // this.searchInfo.BeginTime = date;
    console.log(date)
    this.searchInfo.BeginTime = Time.beginTime(date);
    this.searchInfo.EndTime = Time.endTime(date);
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
}
