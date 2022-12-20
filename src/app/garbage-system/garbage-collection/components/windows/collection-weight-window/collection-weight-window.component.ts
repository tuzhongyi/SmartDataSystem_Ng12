import {
  Component,
  EventEmitter,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  ToastWindowService,
  ToastWindowType,
} from 'src/app/common/components/toast-window/toast-window.service';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Time } from 'src/app/common/tools/time';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { PictureArgs } from 'src/app/network/model/args/picture.args';
import { VideoArgs } from 'src/app/network/model/args/video.args';
import { Page } from 'src/app/network/model/page_list.model';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import {
  ImageControlModel,
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { GarbageCollectionIndexComponent } from '../../collection-index/collection-index.component';
import { CollectionWeightWindowBusiness } from './collection-weight-window.business';
import { CollectionWeightWindowConverter } from './collection-weight-window.converter';
import {
  CollectionWeightWindowModel,
  ICollectionWeightWindowSearchInfo,
} from './collection-weight-window.model';

@Component({
  selector: 'collection-weight-window',
  templateUrl: './collection-weight-window.component.html',
  styleUrls: ['./collection-weight-window.component.less'],
  providers: [
    CollectionWeightWindowBusiness,
    CollectionWeightWindowConverter,
    ImageControlConverter,
  ],
})
export class CollectionWeightWindowComponent implements OnInit {
  tdWidth = ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'];
  dataSource: CollectionWeightWindowModel[] = [];
  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  searchInfo: ICollectionWeightWindowSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
    PageIndex: 1,
    PageSize: 9,
    Condition: '',
    BeginTime: Time.beginTime(Date.now()),
    EndTime: Time.endTime(Date.now()),
  };

  constructor(
    private _globalStorage: GlobalStorageService,
    private _business: CollectionWeightWindowBusiness,
    private _toastWindowService: ToastWindowService,
    private _imageControlConverter: ImageControlConverter
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.divisionIds) this.searchInfo.DivisionIds = data.divisionIds;
    }
  }
  ngOnInit(): void {
    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo);

    this.dataSource = res.Data;
    this.page = res.Page;
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.searchInfo.PageIndex == pageInfo.pageIndex + 1) return;
    this.searchInfo.PageIndex = pageInfo.pageIndex + 1;

    this._init();
  }
  searchEvent(condition: string) {
    this.searchInfo.Condition = condition;
    this.searchInfo.PageIndex = 1;
    this._init();
  }

  async clickImage(
    item: CollectionWeightWindowModel<GarbageCollectionEventRecord>
  ) {
    let camera = await this._business.getCamera(
      this._globalStorage.divisionId,
      item.Id
    );

    let args = new PictureArgs();
    args.id = camera.Id;
    args.title = camera.Name;
    args.url = item.ImageUrl;

    this._toastWindowService.customEvent.emit({
      Type: ToastWindowType.ClickImage,
      Data: args,
      Component: CollectionWeightWindowComponent,
      Close: false,
    });
  }

  async clickVideoIcon(item: CollectionWeightWindowModel) {
    let camera = await this._business.getCamera(
      this._globalStorage.divisionId,
      item.Id
    );

    let args = new VideoArgs();
    args.autoplay = true;
    args.cameraId = camera.Id;
    args.data = camera;
    args.mode = PlayMode.vod;
    args.time = item.RawData?.EventTime;
    args.title = camera.Name;

    this._toastWindowService.customEvent.emit({
      Type: ToastWindowType.ClickImage,
      Data: args,
      Component: CollectionWeightWindowComponent,
      Close: false,
    });
  }
}
