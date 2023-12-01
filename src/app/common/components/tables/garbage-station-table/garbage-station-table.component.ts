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
import { GarbageStationTableBusiness } from './garbage-station-table.business';
import {
  GarbageStationPagedConverter,
  GarbageStationTableConverter,
} from './garbage-station-table.converter';
import {
  GarbageStationTableArgs,
  GarbageStationTableModel,
} from './garbage-station-table.model';

@Component({
  selector: 'howell-garbage-station-table',
  templateUrl: './garbage-station-table.component.html',
  styleUrls: ['../table.less', './garbage-station-table.component.less'],
  providers: [
    GarbageStationTableBusiness,
    GarbageStationTableConverter,
    GarbageStationPagedConverter,
  ],
})
export class GarbageStationTableComponent
  extends PagedTableAbstractComponent<GarbageStationTableModel>
  implements IComponent<IModel, PagedList<GarbageStationTableModel>>, OnInit
{
  @Input() load?: EventEmitter<GarbageStationTableArgs>;
  @Input() isoperation = true;
  @Input() business: IBusiness<IModel, PagedList<GarbageStationTableModel>>;
  @Input() args = new GarbageStationTableArgs();
  @Output() image: EventEmitter<PagedArgs<GarbageStationTableModel>> =
    new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(business: GarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  StationState = StationState;
  widths = ['20%', '15%'];

  searchOpts?: SearchOptions;
  selected?: GarbageStationTableModel;

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

  onimage(e: Event, item: GarbageStationTableModel, index: number) {
    this.image.emit({
      page: Page.create(index),
      data: item,
    });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }
  onselect(item: GarbageStationTableModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  async onPositionClicked(item: GarbageStationTableModel) {
    this.position.emit(await item.GarbageStation);
  }
}
