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
import { Medium } from 'src/app/common/tools/medium';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { DeviceListTableBusiness } from './device-list-table.business';
import {
  DeviceConverter,
  DevicePagedConverter,
} from './device-list-table.converter';
import { DeviceListTableArgs } from './device-list-table.model';
import { DeviceViewModel } from './device.model';

@Component({
  selector: 'howell-device-list-table',
  templateUrl: './device-list-table.component.html',
  styleUrls: ['./device-list-table.component.less', '../table.less'],
  providers: [DeviceListTableBusiness, DeviceConverter, DevicePagedConverter],
})
export class DeviceListTableComponent
  extends PagedTableAbstractComponent<DeviceViewModel>
  implements IComponent<IModel, PagedList<DeviceViewModel>>, OnInit, OnDestroy
{
  @Input() args: DeviceListTableArgs = new DeviceListTableArgs();
  @Input() business: IBusiness<IModel, PagedList<DeviceViewModel>>;

  @Input() load?: EventEmitter<DeviceListTableArgs>;
  @Output() image: EventEmitter<DeviceViewModel> = new EventEmitter();

  constructor(business: DeviceListTableBusiness) {
    super();
    this.business = business;
  }
  selected?: DeviceViewModel;
  OnlineStatus = OnlineStatus;
  widths = ['10%', '15%', '10%', '15%', '15%', '10%', '15%'];

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
    this.loadData(1, this.pageSize);
  }

  loadData(index: number, size: number) {
    let promise = this.business.load(index, size, this.args);
    this.loading = true;
    promise.then((paged) => {
      this.loading = false;
      this.page = paged.Page;

      this.datas = paged.Data;
    });
    return promise;
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize);
  }
  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = Medium.default;
    }
  }

  imageClick(e: Event, item: DeviceViewModel) {
    this.image.emit(item);
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  onselect(item: DeviceViewModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
}
