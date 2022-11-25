import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { Language } from 'src/app/common/tools/language';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import { SearchOptions } from 'src/app/view-model/search-options.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
import { PagedTableAbstractComponent } from '../table-abstract.component';
import { GarbageFullStationTableBusiness } from './garbage-full-station-table.business';
import { GarbageFullStationTableModel } from './garbage-full-station-table.model';

@Component({
  selector: 'howell-garbage-full-station-table',
  templateUrl: './garbage-full-station-table.component.html',
  styleUrls: ['../table.less', './garbage-full-station-table.component.less'],
  providers: [GarbageFullStationTableBusiness],
})
export class GarbageFullStationTableComponent
  extends PagedTableAbstractComponent<GarbageFullStationTableModel>
  implements
    IComponent<IModel, PagedList<GarbageFullStationTableModel>>,
    OnChanges,
    OnInit
{
  widths = ['15%', '15%', '15%', '15%', '15%', '15%', '15%'];
  constructor(business: GarbageFullStationTableBusiness) {
    super();
    this.business = business;
  }

  @Input()
  business: IBusiness<IModel, PagedList<GarbageFullStationTableModel>>;

  @Input()
  count: number = 0;

  @Input()
  load?: EventEmitter<SearchOptions>;

  searchOptions?: SearchOptions;

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.load && changes.load.firstChange && this.load) {
      this.load.subscribe((opts) => {
        this.searchOptions = opts;
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

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  imageClick(item: GarbageFullStationTableModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    this.image.emit(array);
  }
}
