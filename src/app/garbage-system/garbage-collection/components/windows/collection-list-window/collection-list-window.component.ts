import { Component, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { Page } from 'src/app/network/model/page_list.model';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { CollectionListWindowBusiness } from './collection-list-window.business';
import { CollectionListWindowConverter } from './collection-list-window.converter';
import {
  CollectionListWindowModel,
  ICollectionListWindowSearchInfo,
} from './collection-list-window.model';

@Component({
  selector: 'collection-list-window',
  templateUrl: './collection-list-window.component.html',
  styleUrls: ['./collection-list-window.component.less'],
  providers: [CollectionListWindowBusiness, CollectionListWindowConverter],
})
export class CollectionListWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionListWindowModel[] = [];

  today = new Date();

  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: ICollectionListWindowSearchInfo = {
    PageIndex: 1,
    PageSize: 9,
    BeginTime: TimeService.curMonth(this.today).beginTime,
    EndTime: TimeService.curMonth(this.today).endTime,
    CollectionPointIds: [],
    Condition: '',
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionListWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.CollectionPointId)
        this.searchInfo.CollectionPointIds = [data.CollectionPointId];
    }
  }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo);
    this.dataSource = res.Data;
    this.page = res.Page;
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;

    this._init();
  }
  searchEvent(condition: string) {
    this.searchInfo.Condition = condition;
    this.searchInfo.PageIndex = 1;
    this._init();
  }
}
