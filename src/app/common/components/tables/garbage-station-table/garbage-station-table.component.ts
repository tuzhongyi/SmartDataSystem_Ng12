import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import {
  IBusiness,
  IDowanload,
} from 'src/app/common/interfaces/bussiness.interface';
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
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageStationTableDownloadBusiness } from './business/garbage-station-table-download.business';
import { GarbageStationTableBusiness } from './business/garbage-station-table.business';
import { GarbageStationPagedConverter } from './business/garbage-station-table.converter';
import { GarbageStationTableService } from './business/garbage-station-table.service';
import { GarbageStationTableModel } from './garbage-station-table.model';

@Component({
  selector: 'howell-garbage-station-table',
  templateUrl: './garbage-station-table.component.html',
  styleUrls: ['../table.less', './garbage-station-table.component.less'],
  providers: [
    GarbageStationTableService,
    GarbageStationPagedConverter,
    GarbageStationTableDownloadBusiness,
    GarbageStationTableBusiness,
  ],
})
export class GarbageStationTableComponent
  extends TableAbstractComponent<GarbageStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageStationTableModel>>,
    OnInit,
    OnDestroy
{
  @Input() load?: EventEmitter<SearchOptions>;
  @Output() position: EventEmitter<GarbageStation> = new EventEmitter();
  @Output() image: EventEmitter<ImageControlModelArray> = new EventEmitter();

  @Input() business: IBusiness<IModel, PagedList<GarbageStationTableModel>> &
    IDowanload;
  @Input() stationId?: string;
  @Input() divisionId?: string;
  @Input() state?: StationState;
  @Input() download?: EventEmitter<void>;

  constructor(business: GarbageStationTableBusiness) {
    super();
    this.business = business;
  }

  width = ['20%', '15%', '15%', '15%', '15%', '10%', '10%'];

  searchOpts?: SearchOptions;
  private subscription = new Subscription();

  ngOnInit(): void {
    this.regist();
    this.loadData(1, this.pageSize, this.state);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private regist() {
    if (this.load) {
      let sub = this.load.subscribe((opts) => {
        this.searchOpts = opts;
        this.loadData(1, this.pageSize, this.state, opts);
      });
      this.subscription.add(sub);
    }
    if (this.download) {
      let sub = this.download.subscribe(() => {
        this.business.download(
          this.searchOpts,
          this.state,
          this.stationId,
          this.divisionId
        );
      });
      this.subscription.add(sub);
    }
  }

  async loadData(
    index: number,
    size: number,
    state?: StationState,
    opts?: SearchOptions,
    show = true
  ) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(
      params,
      opts,
      state,
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
    this.loadData(
      page.pageIndex + 1,
      this.pageSize,
      this.state,
      this.searchOpts
    );
  }

  imageClick(item: GarbageStationTableModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    this.image.emit(array);
  }

  onPositionClicked(item: GarbageStationTableModel) {
    this.position.emit(item.GarbageStation);
  }
}
