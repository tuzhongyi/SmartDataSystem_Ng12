import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Language } from 'src/app/common/tools/language';
import { Medium } from 'src/app/common/tools/medium';
import { SearchConditionKey } from 'src/app/enum/search-condition.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { GarbageStationListBusiness } from './garbage-station-list.business';
import { GarbageStationListConverter } from './garbage-station-list.converter';
import {
  GarbageStationListModel,
  GarbageStationListSearchInfo,
} from './garbage-station-list.model';

@Component({
  selector: 'garbage-station-list',
  templateUrl: './garbage-station-list.component.html',
  styleUrls: ['./garbage-station-list.component.less'],
  providers: [GarbageStationListBusiness, GarbageStationListConverter],
})
export class GarbageStationListComponent implements OnInit {
  widths = ['10%', '10%', '10%', '10%', '10%', '10%'];

  // 搜索字段名数据源
  searchConditionKeyDataSource: Map<SearchConditionKey, string> = new Map([
    [
      SearchConditionKey.StationName,
      Language.SearchConditionKey(SearchConditionKey.StationName),
    ],
    [
      SearchConditionKey.CommunityName,
      Language.SearchConditionKey(SearchConditionKey.CommunityName),
    ],
  ]);
  customCompare = (
    keyValueA: KeyValue<string, string>,
    keyValueB: KeyValue<string, string>
  ): number => {
    // console.log(keyValueA);

    // 返回0表示按照书写顺序
    return 0;
  };
  dataSource: GarbageStationListModel[] = [];

  searchInfo: GarbageStationListSearchInfo = {
    PageIndex: 1,
    PageSize: 9,
    DivisionId: '310109000000',
    Condition: '',
    SearchConditionKey: SearchConditionKey.StationName,
  };
  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };
  constructor(private _business: GarbageStationListBusiness) {}

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    console.log(res);
    this.page = res.Page;

    this.dataSource = res.Data;
  }
  imageError(img: HTMLImageElement) {
    img.src = Medium.default;
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
}
