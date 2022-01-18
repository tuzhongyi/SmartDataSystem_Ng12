import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { EventType } from 'src/app/enum/event-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import {
  PagedIntervalParams,
  PagedParams,
} from 'src/app/network/request/IParams.interface';
import { EventRecordBusiness } from './event-record.business';
import { EventRecordFilter, EventRecordViewModel } from './event-record.model';

@Component({
  selector: 'howell-event-record-table',
  templateUrl: './event-record-table.component.html',
  styleUrls: ['../table.less', './event-record-table.component.less'],
  providers: [EventRecordBusiness],
})
export class EventRecordTableComponent
  implements IComponent<IModel, PagedList<EventRecordViewModel>>, OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<EventRecordViewModel>>;

  width = ['15%', '15%', '15%', '12%', '15%', '20%'];

  begin: Date = new Date();
  end: Date = new Date();

  private _filter?: EventRecordFilter;
  public get filter(): EventRecordFilter {
    if (!this._filter) {
      this.filter = new EventRecordFilter({
        BeginTime: this.begin,
        EndTime: this.end,
      });
    }
    return this._filter!;
  }
  public set filter(v: EventRecordFilter) {
    this._filter = v;
  }

  page?: Page;
  datas?: EventRecordViewModel[];
  pagerCount = 9;

  @Input()
  type: EventType = EventType.IllegalDrop;

  constructor(business: EventRecordBusiness) {
    this.business = business;
    let now = new Date();
    this.begin = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  async ngOnInit() {
    this.loadData(1);
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1);
  }

  async loadData(index: number) {
    let params = new PagedParams();
    params.PageSize = this.pagerCount;
    params.PageIndex = index;

    let paged = await this.business.load(this.type, params, this.filter);
    this.page = paged.Page;
    this.datas = paged.Data;
  }
}
