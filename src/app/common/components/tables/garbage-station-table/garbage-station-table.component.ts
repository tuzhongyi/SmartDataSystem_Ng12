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
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
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
  @Output() image: EventEmitter<
    ImageControlModelArray<GarbageStationTableModel>
  > = new EventEmitter();
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(business: GarbageStationTableBusiness) {
    super();
    this.business = business;
  }
  StationState = StationState;
  widths = ['10%', '20%', '15%', '15%', '15%', '15%', '10%', '10%'];

  searchOpts?: SearchOptions;

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

  imageClick(item: GarbageStationTableModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index, item);
    this.image.emit(array);
  }

  onPositionClicked(item: GarbageStationTableModel) {
    this.position.emit(item.GarbageStation);
  }
}
