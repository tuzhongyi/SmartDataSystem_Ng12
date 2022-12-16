import { Component, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Page } from 'src/app/network/model/page_list.model';
import { CollectionPointWindowBusiness } from './collection-point-window.business';
import { CollectionPointWindowConverter } from './collection-point-window.converter';
import {
  CollectionPointWindowModel,
  ICollectionPointWindowSearchInfo,
} from './collection-point-window.model';

@Component({
  selector: 'collection-point-window',
  templateUrl: './collection-point-window.component.html',
  styleUrls: ['./collection-point-window.component.less'],
  providers: [CollectionPointWindowBusiness, CollectionPointWindowConverter],
})
export class CollectionPointWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%'];
  dataSource: CollectionPointWindowModel[] = [];
  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };
  searchInfo: ICollectionPointWindowSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
    PageIndex: 1,
    PageSize: 9,
    Condition: '',
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionPointWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.divisionIds) this.searchInfo.DivisionIds = data.divisionIds;
    }
  }

  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    console.log(res);
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
