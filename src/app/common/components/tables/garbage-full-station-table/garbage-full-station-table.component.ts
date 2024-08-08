import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Medium } from 'src/app/common/tools/medium';
import { StationState } from 'src/app/enum/station-state.enum';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageFullStationTableBusiness } from './garbage-full-station-table.business';
import {
  GarbageFullStationPagedTableConverter,
  GarbageFullStationTableConverter,
} from './garbage-full-station-table.converter';
import {
  GarbageFullStationTableArgs,
  GarbageFullStationTableModel,
} from './garbage-full-station-table.model';

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
  @Input() args: GarbageFullStationTableArgs =
    new GarbageFullStationTableArgs();

  @Input() load?: EventEmitter<GarbageFullStationTableArgs>;
  @Output() image: EventEmitter<PagedArgs<GarbageFullStationTableModel>> =
    new EventEmitter();
  @Output() video: EventEmitter<GarbageFullStationTableModel> =
    new EventEmitter();

  constructor(business: GarbageFullStationTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['15%', '20%', '15%', '10%', '10%', '15%', '20%'];

  StationState = StationState;
  selected?: GarbageFullStationTableModel;

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize, this.args);
      });
    }
    this.loadData(1, this.pageSize, this.args);
  }

  async loadData(
    index: number,
    size: number,
    args: GarbageFullStationTableArgs
  ) {
    let promise = this.business.load(index, size, args);
    this.loading = true;
    promise
      .then((paged) => {
        this.page = paged.Page;
        this.datas = paged.Data;
      })
      .finally(() => {
        this.loading = false;
      });
    return promise;
  }

  async pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize, this.args);
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
