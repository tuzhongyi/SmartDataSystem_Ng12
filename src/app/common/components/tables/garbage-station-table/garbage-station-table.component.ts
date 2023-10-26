import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IModel, PagedArgs } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageStationTableBusiness } from './garbage-station-table.business';
import {
  GarbageStationPagedConverter,
  GarbageStationTableConverter,
} from './garbage-station-table.converter';
import { GarbageStationTableModel } from './garbage-station-table.model';

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
  implements
    IComponent<IModel, PagedList<GarbageStationTableModel>>,
    OnInit,
    OnChanges
{
  @Input() load?: EventEmitter<SearchOptions>;

  @Input() business: IBusiness<IModel, PagedList<GarbageStationTableModel>>;
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Output() image: EventEmitter<PagedArgs<GarbageStationTableModel>> =
    new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(business: GarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  StationState = StationState;
  widths = ['20%', '15%', '15%', '15%', '15%', '10%', '10%'];

  searchOpts?: SearchOptions;
  selected?: GarbageStationTableModel;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((opts) => {
        this.searchOpts = opts;
        this.loadData(1, this.pageSize, opts);
      });
    }
  }

  ngOnInit(): void {
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

    let promise = this.business.load(
      params,
      opts,
      this.stationId,
      this.divisionId
    );
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
    this.loadData(page.pageIndex + 1, this.pageSize, this.searchOpts);
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
