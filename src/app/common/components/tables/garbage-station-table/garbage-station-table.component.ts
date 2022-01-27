import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageStationTableBusiness } from './garbage-station-table.business';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Component({
  selector: 'howell-garbage-station-table',
  templateUrl: './garbage-station-table.component.html',
  styleUrls: ['../table.less', './garbage-station-table.component.less'],
  providers: [GarbageStationTableBusiness],
})
export class GarbageStationTableComponent
  extends TableAbstractComponent<GarbageStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageStationTableModel>>,
    OnInit,
    OnChanges
{
  @Input()
  load?: EventEmitter<string>;

  @Input()
  business: IBusiness<IModel, PagedList<GarbageStationTableModel>>;
  width = ['30%', '20%', '15%', '20%', '10%', '5%'];
  name?: string;
  constructor(business: GarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((name) => {
        this.name = name;
        this.loadData(1, this.pageSize, name);
      });
    }
  }

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
  }

  async loadData(index: number, size: number, name?: string, show = true) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, name);
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
}
