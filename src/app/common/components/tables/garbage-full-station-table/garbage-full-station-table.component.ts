import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Medium } from 'src/app/common/tools/medium';
import { StationState } from 'src/app/enum/station-state.enum';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageFullStationTableBusiness } from './garbage-full-station-table.business';
import {
  GarbageFullStationPagedTableConverter,
  GarbageFullStationTableConverter,
} from './garbage-full-station-table.converter';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

@Component({
  selector: 'howell-garbage-full-station-table',
  templateUrl: './garbage-full-station-table.component.html',
  styleUrls: ['../table.less', './garbage-full-station-table.component.less'],
  providers: [
    GarbageFullStationTableConverter,
    GarbageFullStationPagedTableConverter,
    GarbageFullStationTableBusiness,
  ],
})
export class GarbageFullStationTableComponent
  extends PagedTableAbstractComponent<GarbageFullStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageFullStationTableModel>>,
    OnInit
{
  @Input() business: IBusiness<IModel, PagedList<GarbageFullStationTableModel>>;

  @Input() count: number = 0;

  @Input() load?: EventEmitter<SearchOptions>;
  @Output() image: EventEmitter<PagedArgs<GarbageFullStationTableModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<GarbageFullStationTableModel> =
    new EventEmitter();
  constructor(business: GarbageFullStationTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['15%', '15%', '15%', '15%', '15%', '15%', '15%'];
  searchOptions?: SearchOptions;
  StationState = StationState;
  selected?: GarbageFullStationTableModel;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((opts) => {
        this.searchOptions = opts;
        this.loadData(1, this.pageSize, opts);
      });
    }
    this.loadData(1, this.pageSize);
  }

  async loadData(
    index: number,
    size: number,
    opts?: SearchOptions,
    show = true
  ) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, opts);
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
    this.loadData(page.pageIndex + 1, this.pageSize, this.searchOptions);
  }

  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = Medium.default;
    }
  }

  async onimage(e: Event, item: GarbageFullStationTableModel, index: number) {
    this.image.emit({ data: item, page: Page.create(index) });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  onselect(item: GarbageFullStationTableModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }
}
