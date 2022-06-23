import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
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
  implements IComponent<IModel, PagedList<DeviceViewModel>>, OnInit, OnDestroy {
  OnlineStatus = OnlineStatus;
  width = ['10%', '15%', '10%', '15%', '15%', '10%', '15%'];

  @Input()
  filter: DeviceListTableFilter = {};

  @Input()
  business: IBusiness<IModel, PagedList<DeviceViewModel>>;

  @Input()
  load?: EventEmitter<SearchOptions>;

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
      this.load.subscribe((opts) => {
        this.filter.opts = opts;
        this.loadData(1, this.pageSize, this.filter.status, this.filter.opts);
      });
    }
  }

  loadData(
    index: number,
    size: number,
    status?: OnlineStatus,
    opts?: SearchOptions,
    show = true
  ) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, status, opts);
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
      this.filter.opts
    );
  }
  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = Medium.default;
    }
  }

  search(opts: SearchOptions) {
    this.filter.opts = opts;
    this.loadData(1, this.pageSize, this.filter.status, opts);
  }

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  imageClick(item: DeviceViewModel) {
    let img = new ImageControlModelArray([item.image], 0);
    this.image.emit(img);
  }
}

export interface DeviceListTableFilter {
  status?: OnlineStatus;
  opts?: SearchOptions;
}
