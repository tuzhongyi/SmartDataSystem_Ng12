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
import { Language } from 'src/app/global/tool/language';
import { IModel } from 'src/app/network/model/model.interface';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { MediumRequestService } from 'src/app/network/request/medium/medium-request.service';
import {
  ImageControlModel,
  ImageControlModelArray,
} from '../../../../view-model/image-control.model';
import { TableAbstractComponent } from '../table-abstract.component';
import { GarbageDropStationTableBusiness } from './garbage-drop-station-table.business';
import { GarbageDropStationTableModel } from './garbage-drop-station-table.model';

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
  width = ['20%', '15%', '12%', '7%', '10%', '10%', '10%', '10%', '6%'];
  constructor(business: GarbageDropStationTableBusiness) {
    super();
    this.business = business;
  }
  ngOnDestroy(): void {
    this.name = undefined;
  }
  @Input()
  business: IBusiness<IModel, PagedList<GarbageDropStationTableModel>>;

  @Input()
  count: number = 0;

  @Input()
  load?: EventEmitter<string>;

  name?: string;

  ngOnInit(): void {
    this.loadData(1, this.pageSize);
    if (this.load) {
      this.load.subscribe((name) => {
        this.loadData(1, this.pageSize, name);
      });
    }
  }

  async loadData(index: number, size: number, name?: string, show = true) {
    let params = new PagedParams();
    params.PageSize = size;
    params.PageIndex = index;

    let promise = this.business.load(params, status, name);
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
    this.loadData(page.pageIndex + 1, this.pageSize, this.name);
  }

  onerror(e: Event) {
    if (e.target) {
      (e.target as HTMLImageElement).src = MediumRequestService.default;
    }
  }

  @Output()
  image: EventEmitter<ImageControlModelArray> = new EventEmitter();
  imageClick(item: GarbageDropStationTableModel, img: ImageControlModel) {
    let array = new ImageControlModelArray(item.images, img.index);
    this.image.emit(array);
  }
}
