import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ToastWindowService } from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { Page } from 'src/app/network/model/page_list.model';
import { VehicleListWindowBusiness } from './vehicle-list-window.business';
import { VehicleListWindowConverter } from './vehicle-list-window.converter';
import {
  VehicleListWindowModel,
  IVehicleListWindowSearchInfo,
} from './vehicle-list-window.model';

@Component({
  selector: 'vehicle-list-window',
  templateUrl: './vehicle-list-window.component.html',
  styleUrls: ['./vehicle-list-window.component.less'],
  providers: [
    {
      provide: VehicleListWindowBusiness,
      useClass: VehicleListWindowBusiness,
    },
    {
      provide: VehicleListWindowConverter,
      useValue: new VehicleListWindowConverter(),
    },
  ],
})
export class VehicleListWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: VehicleListWindowModel[] = [];

  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: IVehicleListWindowSearchInfo = {
    DivisionId: this._globalStorage.divisionId,
    PageIndex: 1,
    PageSize: 9,
    Type: CollectionDeviceStateCountType.All,
    Condition: '',
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: VehicleListWindowBusiness,
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
