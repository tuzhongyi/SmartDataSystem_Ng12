import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject } from 'rxjs';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { EventNumberStatisticModel, EventNumberStatisticSearchInfo } from 'src/app/view-model/illegal-drop-total.model';
import { TableColumnModel } from 'src/app/view-model/table.model';
import { GlobalStoreService } from '../../service/global-store.service';
import { Language } from '../../tools/language';
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

  /**private */
  private _pageSize = 9527;


  @Input()
  ResourceId: string = '';

  // 虹口区: 310109000000
  // 欧阳路街道: 310109009000

  // 当前区划等级
  @Input()
  userResourceType: UserResourceType = UserResourceType.City;

  // 默认筛选街道
  defaultResourceType = UserResourceType.County;


  // Table
  dataSubject = new BehaviorSubject<EventNumberStatisticModel[]>([]);
  selectStrategy = SelectStrategy.Single;
  columnModel: TableColumnModel[] = [...IllegalDropStatisticConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  searchInfo: EventNumberStatisticSearchInfo = {
    ResourceType: UserResourceType.None,
    ResourceId: this.ResourceId
  }
  // 

  // 行政区列表
  optionMap: Map<UserResourceType, SelectItem> = new Map();

  constructor(private _business: IllegalDropTotalBusiness, private _globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    this._initUserResourceType();
    // 设置默认值
    if (this.optionMap.has(this.defaultResourceType)) {
      this.searchInfo.ResourceType = this.optionMap.get(this.defaultResourceType)!.value
    }
    console.log(this.optionMap)
    for (let [k, v] of this.optionMap) {
      console.log(k, v)
    }
    this._init();

  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this._pageSize);
    console.log(res);
    this.page = res.Page;
    this.dataSubject.next(res.Data);
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  private _initUserResourceType() {
    let resourceType: UserResourceType = this.userResourceType;

    do {
      resourceType = EnumHelper.GetResourceChildType(resourceType);

      this.optionMap.set(resourceType, new SelectItem(
        resourceType.toString(),
        resourceType,
        Language.UserResourceType(resourceType)
      ))
    } while (resourceType != UserResourceType.Station);

  }
}
