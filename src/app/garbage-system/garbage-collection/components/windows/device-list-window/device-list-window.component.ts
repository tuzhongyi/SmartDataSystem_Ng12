import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { DeviceListWindowBusiness } from './device-list-window.business';
import { DeviceListWindowConverter } from './device-list-window.converter';
import {
  DeviceListWindowModel,
  IDeviceListWindowSearchInfo,
} from './device-list-window.model';

@Component({
  selector: 'device-list-window',
  templateUrl: './device-list-window.component.html',
  styleUrls: ['./device-list-window.component.less'],
  providers: [
    {
      provide: DeviceListWindowBusiness,
      useClass: DeviceListWindowBusiness,
    },
    {
      provide: DeviceListWindowConverter,
      useValue: new DeviceListWindowConverter(),
    },
  ],
})
export class DeviceListWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: DeviceListWindowModel[] = [];

  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: IDeviceListWindowSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    PageIndex: 1,
    PageSize: 3,
    Type: CollectionDeviceStateCountType.All,
    Condition: '',
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: DeviceListWindowBusiness,
    @Optional() private _toastWindowService: ToastWindowService
  ) {
    console.log(this._toastWindowService.data);
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
