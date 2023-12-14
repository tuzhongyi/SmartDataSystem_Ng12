import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { AuditGarbageStationTableBusiness } from './audit-garbage-station-table.business';
import {
  AuditGarbageStationTableArgs,
  AuditGarbageStationTableModel,
} from './audit-garbage-station-table.model';

@Component({
  selector: 'audit-garbage-station-table',
  templateUrl: './audit-garbage-station-table.component.html',
  styleUrls: ['../table.less', './audit-garbage-station-table.component.less'],
  providers: [AuditGarbageStationTableBusiness],
})
export class AuditGarbageStationTableComponent
  extends PagedTableAbstractComponent<AuditGarbageStationTableModel>
  implements
    IComponent<IModel, PagedList<AuditGarbageStationTableModel>>,
    OnInit
{
  @Input() load?: EventEmitter<AuditGarbageStationTableArgs>;
  @Input() business: IBusiness<
    IModel,
    PagedList<AuditGarbageStationTableModel>
  >;
  @Input() args = new AuditGarbageStationTableArgs();

  @Output() image: EventEmitter<PagedArgs<GarbageStation>> = new EventEmitter();

  constructor(business: AuditGarbageStationTableBusiness) {
    super();
    this.business = business;
  }

  StationState = StationState;
  widths = ['20%', '15%', '15%', '15%', '15%', '10%', '10%'];

  searchOpts?: SearchOptions;
  selected?: GarbageStation;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
    this.loadData(1, this.pageSize);
  }

  async loadData(index: number, size: number) {
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

  onimage(e: Event, item: GarbageStation, index: number) {
    this.image.emit({
      page: Page.create(index),
      data: item,
    });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
  onselect(item: GarbageStation) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
}
