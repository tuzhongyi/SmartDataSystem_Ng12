import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { CollectionVehicleWindowBusiness } from './collection-vehicle-window.business';
import { CollectionVehicleWindowConverter } from './collection-vehicle-window.converter';
import {
  CollectionVehicleWindowModel,
  ICollectionVehicleWindowSearchInfo,
} from './collection-vehicle-window.model';

@Component({
  selector: 'collection-vehicle-window',
  templateUrl: './collection-vehicle-window.component.html',
  styleUrls: ['./collection-vehicle-window.component.less'],
  providers: [
    {
      provide: CollectionVehicleWindowBusiness,
      useClass: CollectionVehicleWindowBusiness,
    },
    {
      provide: CollectionVehicleWindowConverter,
      useValue: new CollectionVehicleWindowConverter(),
    },
  ],
})
export class CollectionVehicleWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionVehicleWindowModel[] = [];

  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: ICollectionVehicleWindowSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    PageIndex: 1,
    PageSize: 9,
    Type: CollectionDeviceStateCountType.All,
    Condition: '',
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionVehicleWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    // console.log(this._toastWindowService.data);
    let data = this._toastWindowService.data;
    if (data) {
      if (data.type) this.searchInfo.Type = data.type;
      if (data.divisionId) this.searchInfo.DivisionId = data.divisionId;
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
