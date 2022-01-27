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
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageFullStationTableBusiness } from './garbage-full-station-table.business';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

@Component({
  selector: 'howell-garbage-full-station-table',
  templateUrl: './garbage-full-station-table.component.html',
  styleUrls: ['../table.less', './garbage-full-station-table.component.less'],
  providers: [GarbageFullStationTableBusiness],
})
export class GarbageFullStationTableComponent
  extends TableAbstractComponent<GarbageFullStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageFullStationTableModel>>,
    OnDestroy,
    OnInit
{
  width = ['25%', '15%', '15%', '15%', '15%', '15%'];
  constructor(business: GarbageFullStationTableBusiness) {
    super();
    this.business = business;
  }
  ngOnDestroy(): void {
    this.name = undefined;
  }
  @Input()
  business: IBusiness<IModel, PagedList<GarbageFullStationTableModel>>;

  @Input()
  count: number = 0;

  @Input()
  load?: EventEmitter<string>;

  name?: string;

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
    if (this.load) {
      this.load.subscribe((name) => {
        this.loadData(1, this.pageSize, name);
      });
    }
  }

  async loadData(index: number, size: number, name?: string, show = true) {
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
    this.loadData(page.pageIndex + 1, this.pageSize, this.name);
  }

  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = MediumRequestService.default;
    }
  }
}
