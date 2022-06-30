import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageDropStationTableBusiness } from './garbage-drop-station-table.business';
import { GarbageDropStationTableModel } from './garbage-drop-station-table.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

@Component({
  selector: 'howell-garbage-drop-station-table',
  templateUrl: './garbage-drop-station-table.component.html',
  styleUrls: ['../table.less', './garbage-drop-station-table.component.less'],
  providers: [GarbageDropStationTableBusiness],
})
export class GarbageDropStationTableComponent
  extends TableAbstractComponent<GarbageDropStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageDropStationTableModel>>,
    OnDestroy,
    OnInit
{
  @Input()
  business: IBusiness<IModel, PagedList<GarbageDropStationTableModel>>;
  @Input()
  divisionId?: string;
  @Input()
  count: number = 0;

  @Input()
  load?: EventEmitter<SearchOptions>;
  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  @Output()
  position: EventEmitter<GarbageStation> = new EventEmitter();

  constructor(business: GarbageDropStationTableBusiness) {
    super();
    this.business = business;
  }

  width = ['20%', '14%', '12%', '7%', '9%', '9%', '9%', '8%', '6%', '6%'];
  searchOptions?: SearchOptions;

  ngOnDestroy(): void {
    this.searchOptions = undefined;
  }

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
    if (this.load) {
      this.load.subscribe((opts) => {
        this.loadData(1, this.pageSize, opts);
      });
    }
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

    let promise = this.business.load(params, opts, this.divisionId);
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

  imageClick(item: GarbageDropStationTableModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    this.image.emit(array);
  }

  onPositionClicked(item: GarbageDropStationTableModel) {
    this.position.emit(item.GarbageStation);
  }
}
