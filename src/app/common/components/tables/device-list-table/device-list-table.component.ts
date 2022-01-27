import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { TableAbstractComponent } from '../table-abstract.component';
import { DeviceListTableBusiness } from './device-list-table.business';
import { DeviceViewModel } from './device.model';

@Component({
  selector: 'howell-device-list-table',
  templateUrl: './device-list-table.component.html',
  styleUrls: ['./device-list-table.component.less', '../table.less'],
  providers: [DeviceListTableBusiness],
})
export class DeviceListTableComponent
  extends TableAbstractComponent<DeviceViewModel>
  implements IComponent<IModel, PagedList<DeviceViewModel>>, OnInit, OnDestroy
{
  OnlineStatus = OnlineStatus;
  width = ['15%', '20%', '10%', '15%', '15%', '15%'];

  @Input()
  filter: DeviceListTableFilter = {};

  @Input()
  business: IBusiness<IModel, PagedList<DeviceViewModel>>;

  @Input()
  load?: EventEmitter<string>;

  constructor(business: DeviceListTableBusiness) {
    super();
    this.business = business;
  }
  ngOnDestroy(): void {
    this.filter = {};
  }

  ngOnInit(): void {
    this.loadData(1, this.pageSize, this.filter.status);
    if (this.load) {
      this.load.subscribe((name) => {
        this.filter.name = name;
        this.loadData(1, this.pageSize, this.filter.status, this.filter.name);
      });
    }
  }

  loadData(
    index: number,
    size: number,
    status?: OnlineStatus,
    name?: string,
    show = true
  ) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, status, name);
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
    this.loadData(
      page.pageIndex + 1,
      this.pageSize,
      this.filter.status,
      this.filter.name
    );
  }
  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = MediumRequestService.default;
    }
  }

  search(name: string) {
    this.filter.name = name;
    this.loadData(1, this.pageSize, this.filter.status, name);
  }
}

export interface DeviceListTableFilter {
  status?: OnlineStatus;
  name?: string;
}
