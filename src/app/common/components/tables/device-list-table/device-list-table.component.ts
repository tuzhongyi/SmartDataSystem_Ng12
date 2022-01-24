import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { DeviceListTableBusiness } from './device-list-table.business';
import { DeviceViewModel } from './device.model';

@Component({
  selector: 'howell-device-list-table',
  templateUrl: './device-list-table.component.html',
  styleUrls: ['./device-list-table.component.less', '../table.less'],
  providers: [DeviceListTableBusiness],
})
export class DeviceListTableComponent
  implements IComponent<IModel, PagedList<DeviceViewModel>>, OnInit
{
  OnlineStatus = OnlineStatus;
  Language = Language;
  width = ['15%', '20%', '10%', '15%', '15%', '15%'];

  @Input()
  filter?: DeviceListTableFilter = {};

  datas: DeviceViewModel[] = [];
  page?: Page;

  loading = false;
  pageSize = 9;

  @Input()
  business: IBusiness<IModel, PagedList<DeviceViewModel>>;

  @Input()
  load?: EventEmitter<DeviceListTableFilter>;

  constructor(business: DeviceListTableBusiness) {
    this.business = business;
  }

  ngOnInit(): void {
    this.loadData(1, this.pageSize, this.filter);
    if (this.load) {
      this.load.subscribe((x) => {
        this.filter = x;
        this.loadData(1, this.pageSize, this.filter);
      });
    }
  }

  loadData(
    index: number,
    size: number,
    filter?: DeviceListTableFilter,
    show = true
  ) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, filter);
    this.loading = true;
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;
      if (show) {
        this.datas = paged.Data;
      }
    });
    return promise;
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize, this.filter);
  }
  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = MediumRequestService.default;
    }
  }

  search(name: string) {
    if (this.filter) {
      this.filter.name = name;
    }
    this.loadData(1, this.pageSize, this.filter);
  }
}

export interface DeviceListTableFilter {
  status?: OnlineStatus;
  name?: string;
}
