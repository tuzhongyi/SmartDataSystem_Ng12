import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { CommonLabelSelecComponent } from 'src/app/common/components/common-label-select/common-label-select.component';
import {
  ToastWindowService,
  ToastWindowType,
} from 'src/app/common/components/toast-window/toast-window.service';
import { PlayMode } from 'src/app/common/components/video-player/video.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { Language } from 'src/app/common/tools/language';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { PictureArgs } from 'src/app/network/model/args/picture.args';
import { VideoListArgs } from 'src/app/network/model/args/video-list.args';
import { Page } from 'src/app/network/model/page_list.model';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { CollectionDivisionTreeBusiness } from '../../../../../common/business/collection-division-tree.business';
import { CollectionRecordWindowBusiness } from './collection-record-window.business';
import { CollectionRecordWindowConverter } from './collection-record-window.converter';
import {
  CollectionRecordWindowModel,
  ICollectionRecordWindowSearchInfo,
} from './collection-record-window.model';

@Component({
  selector: 'collection-record-window',
  templateUrl: './collection-record-window.component.html',
  styleUrls: ['./collection-record-window.component.less'],
  providers: [
    CollectionRecordWindowBusiness,
    CollectionRecordWindowConverter,
    ImageControlConverter,
    CollectionDivisionTreeBusiness,
  ],
})
export class CollectionRecordWindowComponent implements OnInit {
  @Input()
  type?: TrashCanType;

  CollectionPointScore = CollectionPointScore;
  Language = Language;
  SelectStrategy = SelectStrategy;

  @ViewChild(CommonLabelSelecComponent)
  commonTreeSelect!: CommonLabelSelecComponent;

  tdWidth = ['8%', '8%', '8%', '8%', '8%', '10%', '15%', '10%', '5%'];
  dataSource: CollectionRecordWindowModel[] = [];
  // Paginator
  pagerCount: number = 4;

  page: Page = {
    PageIndex: 0,
    PageSize: 0,
    RecordCount: 0,
    TotalRecordCount: 0,
    PageCount: 0,
  };

  disableSearch = false;
  today = new Date();
  searchInfo: ICollectionRecordWindowSearchInfo = {
    DivisionIds: [this._globalStorage.divisionId],
    PageIndex: 1,
    PageSize: 9,
    Condition: '',
    BeginTime: TimeService.beginTime(Date.now()),
    EndTime: TimeService.endTime(Date.now()),
    Score: '',
  };

  DateTimePickerView = DateTimePickerView;
  TrashCanType = TrashCanType;

  dateFormat: string = 'yyyy-MM-dd HH:mm';
  selectedNodes: CommonFlatNode[] = [];

  constructor(
    public collectionDivisionTreeBusiness: CollectionDivisionTreeBusiness,
    private _globalStorage: GlobalStorageService,
    private _business: CollectionRecordWindowBusiness,
    private _toastWindowService: ToastWindowService
  ) {
    let data = this._toastWindowService.data;
    if (data) {
      if (data.divisionIds) this.searchInfo.DivisionIds = data.divisionIds;
      if (data.beginTime) this.searchInfo.BeginTime = data.beginTime;
      if (data.endTime) this.searchInfo.EndTime = data.endTime;
      if (data.score) {
        this.searchInfo.Score = data.score;
      }
    }
  }
  ngOnInit(): void {
    this.searchInfo.type = this.type;
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
  search() {
    this.commonTreeSelect.closeDropDown();
    this.searchInfo.PageIndex = 1;
    this._init();
  }

  async clickImage(
    item: CollectionRecordWindowModel<GarbageCollectionEventRecord>
  ) {
    if (item.RawData) {
      try {
      } catch (e) {
        console.log('sdfdf');
      }
      let camera = await this._business.getCamera(
        item.RawData.Data.VehicleId,
        item.Id
      );

      let args = new PictureArgs();
      args.id = camera.Id;
      args.title = camera.Name;
      args.url = item.ImageUrl;

      this._toastWindowService.customEvent.emit({
        Type: ToastWindowType.ClickImage,
        Data: args,
        Component: CollectionRecordWindowComponent,
        Close: false,
      });
    }
  }

  async clickVideoIcon(
    item: CollectionRecordWindowModel<GarbageCollectionEventRecord>
  ) {
    if (item.RawData) {
      let args = new VideoListArgs();
      args.autoplay = true;
      args.cameras = item.Cameras;

      args.mode = PlayMode.vod;
      args.time = item.RawData?.EventTime;
      args.title = item.VehicleName;
      this._toastWindowService.customEvent.emit({
        Type: ToastWindowType.ClickVideo,
        Data: args,
        Component: CollectionRecordWindowComponent,
        Close: false,
      });
    }
  }

  selectTreeNode(nodes: CommonFlatNode[]) {
    this.commonTreeSelect.closeDropDown();

    this.selectedNodes = nodes;

    this.searchInfo.DivisionIds = this.selectedNodes.map((n) => n.Id);
  }

  sortData(sort: Sort) {
    const isAsc = sort.direction === 'asc';
    this.searchInfo.desc = undefined;
    this.searchInfo.asc = undefined;
    if (isAsc) {
      this.searchInfo.asc = sort.active;
    } else {
      this.searchInfo.desc = sort.active;
    }
    this._init();
  }
}
