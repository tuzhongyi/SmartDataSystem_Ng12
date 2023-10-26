import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Medium } from 'src/app/common/tools/medium';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageDropStationTableBusiness } from './garbage-drop-station-table.business';
import {
  GarbageDropStationPagedTableConverter,
  GarbageDropStationTableConverter,
} from './garbage-drop-station-table.converter';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from './garbage-drop-station-table.model';

@Component({
  selector: 'howell-garbage-drop-station-table',
  templateUrl: './garbage-drop-station-table.component.html',
  styleUrls: ['../table.less', './garbage-drop-station-table.component.less'],
  providers: [
    GarbageDropStationTableBusiness,
    GarbageDropStationPagedTableConverter,
    GarbageDropStationTableConverter,
  ],
})
export class GarbageDropStationTableComponent
  extends PagedTableAbstractComponent<GarbageDropStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageDropStationTableModel>>,
    OnDestroy,
    OnInit
{
  @Input() business: IBusiness<IModel, PagedList<GarbageDropStationTableModel>>;
  @Input() args?: GarbageDropStationTableArgs;
  @Input() count: number = 0;
  @Input() load?: EventEmitter<GarbageDropStationTableArgs>;
  @Output() image: EventEmitter<PagedArgs<GarbageDropStationTableModel>> =
    new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  sort?: Sort;

  constructor(business: GarbageDropStationTableBusiness) {
    super();
    this.business = business;
  }

  widths = ['10%', '14%', '12%', '7%', '9%', '9%', '9%', '8%', '6%', '6%'];
  searchOptions?: SearchOptions;
  selected?: GarbageDropStationTableModel;

  ngOnDestroy(): void {
    this.searchOptions = undefined;
  }

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
    if (this.load) {
      this.load.subscribe((args) => {
        this.args = args;
        this.loadData(1, this.pageSize);
      });
    }
  }

  async loadData(index: number, size: number, show = true) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, this.args);
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

  override pageEvent(page: PageEvent) {
    this.loadData(page.pageIndex + 1, this.pageSize);
  }

  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = Medium.default;
    }
  }

  onimage(e: Event, item: GarbageDropStationTableModel, index: number) {
    this.image.emit({
      page: Page.create(index),
      data: item,
    });
    if (this.selected === item) {
      e.stopPropagation();
    }
  }

  async onPositionClicked(item: GarbageDropStationTableModel) {
    this.position.emit(await item.GarbageStation);
  }
  onselect(item: GarbageDropStationTableModel) {
    if (this.selected === item) {
      this.selected = undefined;
    } else {
      this.selected = item;
    }
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    if (typeof a === 'string' && typeof b === 'string') {
      return isAsc ? a.localeCompare(b) : b.localeCompare(a);
    } else if (typeof a === 'number' && typeof b === 'number') {
      return isAsc ? a - b : b - a;
    }
    return 0;
  }
  sortData(sort: Sort) {
    this.sort = sort;
    if (this.datas) {
      console.log(this.datas);
      const isAsc = sort.direction === 'asc' ? 1 : -1;
      if (sort.active == 'GarbageDuration') {
        this.datas.sort((a, b) => {
          if (a.GarbageDuration && b.GarbageDuration) {
            return (
              (a.GarbageDuration.getTime() - b.GarbageDuration.getTime()) *
              isAsc
            );
          }
          return 0;
        });
      }
      if (sort.active == 'MaxGarbageDuration') {
        this.datas.sort((a, b) => {
          if (a.MaxGarbageDuration && b.MaxGarbageDuration) {
            return (
              (a.MaxGarbageDuration.getTime() -
                b.MaxGarbageDuration.getTime()) *
              isAsc
            );
          }
          return 0;
        });
      }
    }
  }
}
