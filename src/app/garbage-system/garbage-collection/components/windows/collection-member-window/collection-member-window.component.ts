import { Component, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Page } from 'src/app/network/model/page_list.model';
import { CollectionMemberWindowBusiness } from './collection-member-window.business';
import { CollectionMemberWindowConverter } from './collection-member-window.converter';
import {
  CollectionMemberWindowModel,
  ICollectionMemberWindowSearchInfo,
} from './collection-member-window.model';

@Component({
  selector: 'collection-member-window',
  templateUrl: './collection-member-window.component.html',
  styleUrls: ['./collection-member-window.component.less'],
  providers: [CollectionMemberWindowBusiness, CollectionMemberWindowConverter],
})
export class CollectionMemberWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionMemberWindowModel[] = [];
  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };
  searchInfo: ICollectionMemberWindowSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    PageIndex: 1,
    PageSize: 9,
    Condition: '',
  };
  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionMemberWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.divisionId) this.searchInfo.DivisionId = data.divisionId;
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
