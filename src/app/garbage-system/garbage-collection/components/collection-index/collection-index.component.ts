/*
 * @Author: pmx
 * @Date: 2022-12-09 14:38:46
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-21 17:26:56
 */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { CommonRankData } from 'src/app/common/components/common-rank/common-rank.model';
import { CommonStatisticCardModel } from 'src/app/common/components/common-statistic-card/common-statistic-card.model';
import {
  ToastWindowService,
  ToastWindowType,
} from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { TimeService } from 'src/app/common/service/time.service';
import { Medium } from 'src/app/common/tools/medium';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { PictureArgs } from 'src/app/network/model/args/picture.args';
import { VideoListArgs } from 'src/app/network/model/args/video-list.args';
import { IModel } from 'src/app/network/model/model.interface';
import { ICollectionDeviceStateData } from '../collection-device-state/collection-device-state.model';
import { ICollectionPointPieData } from '../collection-point-pie/collection-point-pie.model';
import { ICollectionScorePieData } from '../collection-score-pie/collection-score-pie.model';
import { CollectionVehicleModel } from '../collection-vehicle/collection-vehicle.model';
import {
  CollectionPointWindowComponent,
  CollectionRecordWindowComponent,
} from '../windows';
import { CollectionVehicleWindowComponent } from '../windows/collection-vehicle-window/collection-vehicle-window.component';
import { CollectionStatisticCardBusiness } from './business/collection-statistic-card.bussiness';
import { IndexPictureWindow } from './business/index-picture-window.business';
import { MapControlBusiness } from './business/map-control.business';
import { MapRouteBusiness } from './business/map-route.business';
import { MonitorEventTriggerBusiness } from './business/monitor-event-trigger.business';
import { PatrolControlBusiness } from './business/patrol-control.business';
import { WindowBussiness } from './business/window.business';
import { DeviceWindowBusiness } from './business/windows/device-window.business';
import { RecordWindowBusiness } from './business/windows/event-record-window.business';
import { IndexVideoPlayerWindow } from './business/windows/index-video-player-window.business';
import { MediaMultipleWindowBusiness } from './business/windows/media-multiple-window.business';
import { MediaSingleWindowBusiness } from './business/windows/media-single-window.business';
import { MediaWindowBusiness } from './business/windows/media-window.business';
import { GarbageStationDropWindowBusiness } from './business/windows/station-drop-window.business';
import { GarbageStationFullWindowBusiness } from './business/windows/station-full-window.business';
import { GarbageStationInfoWindowBusiness } from './business/windows/station-info-window.business';
import { VideoControlWindowBusiness } from './business/windows/video-control-window.business';

@Component({
  selector: 'collection-index',
  templateUrl: './collection-index.component.html',
  styleUrls: ['./collection-index.component.less'],
  providers: [
    MonitorEventTriggerBusiness,
    CollectionStatisticCardBusiness,
    MapControlBusiness,
    PatrolControlBusiness,
    VideoControlWindowBusiness,
    RecordWindowBusiness,
    MediaSingleWindowBusiness,
    MediaMultipleWindowBusiness,
    MediaWindowBusiness,
    DeviceWindowBusiness,
    GarbageStationFullWindowBusiness,
    GarbageStationDropWindowBusiness,
    GarbageStationInfoWindowBusiness,
    WindowBussiness,
    IndexVideoPlayerWindow,
    MapRouteBusiness,
    IndexPictureWindow,
  ],
})
export class GarbageCollectionIndexComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('container', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  TrashCanType = TrashCanType;
  CollectionScore = CollectionPointScore;

  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton(): boolean {
    return this._globalStorage.HideButton;
  }
  get HideTitlebar(): boolean {
    return this._globalStorage.HideTitlebar;
  }

  /******kaoniqiwa**************/

  subscription: Subscription;
  subscription2: Subscription;

  showToast = false;

  myInjector: Injector;

  componentTypeExpression?: Type<any> = CollectionVehicleWindowComponent;

  statisticDataSource: CommonStatisticCardModel[] = [];

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _globalStorage: GlobalStorageService,
    public map: MapControlBusiness,
    public route: MapRouteBusiness,
    public video: VideoControlWindowBusiness,
    public window: WindowBussiness,
    private _statisticCardBussiness: CollectionStatisticCardBusiness,

    private injector: Injector,
    private changeDetector: ChangeDetectorRef
  ) {
    this._titleService.setTitle('垃圾清运平台');

    this.subscription = interval(1 * 60 * 1000).subscribe(() => {
      this._globalStorage.collectionStatusChange.emit();
    });

    this.subscription2 = this._globalStorage.collectionStatusChange.subscribe(
      this._init.bind(this)
    );

    this.myInjector = Injector.create({
      providers: [
        {
          provide: ToastWindowService,
          useClass: ToastWindowService,
        },
      ],
      parent: this.injector,
    });

    this.myInjector.get(ToastWindowService).customEvent.subscribe((data) => {
      if (data.Close) this.closeToast();
      switch (data.Component) {
        case CollectionVehicleWindowComponent:
          if (data.Type == ToastWindowType.ClickMap) {
            this.map.onposition(data.Data);
          } else {
            if (data.Type == ToastWindowType.ClickLine) {
              this.map.onroute(data.Data);
            }
          }
          break;
        case CollectionRecordWindowComponent:
          let args: PictureArgs | VideoListArgs;
          switch (data.Type) {
            case ToastWindowType.ClickImage:
              args = data.Data as PictureArgs;
              this.window.picture.title = args.title;
              Medium.image(args.url).then((x) => {
                this.window.picture.image = x;
                this.window.picture.show = true;
              });

              break;
            case ToastWindowType.ClickVideo:
              args = data.Data as VideoListArgs;
              this.window.video.autoplay = args.autoplay;
              this.window.video.cameras = args.cameras;
              this.window.video.title = args.title;
              this.window.video.mode = args.mode;
              this.window.video.time = args.time;
              this.window.video.show = true;
              break;
            default:
              break;
          }
          break;
      }
    });
  }

  async ngOnInit() {
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      let userDivisionId = user.Resources[0].Id;
      let resourceType = user.Resources[0].ResourceType;
      let userDivisionType =
        EnumHelper.ConvertUserResourceToDivision(resourceType);
      this._globalStorage.divisionId = userDivisionId;
      this._globalStorage.divisionType = userDivisionType;
    }

    this._init();

    // this.window.media.single = {
    //   url: '/assets/img/timg-pic.jpg',
    //   error: false,
    // };
    // setTimeout(() => {
    //   this.window.picture.show = true;
    // }, 1000);
  }

  private async _init() {
    this.statisticDataSource = await this._statisticCardBussiness.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
  ngAfterViewInit(): void {}

  /*****处理弹窗*****/
  clickDeviceState(data: ICollectionDeviceStateData) {
    this.componentTypeExpression = CollectionVehicleWindowComponent;
    this.createToast({
      divisionId: this._globalStorage.divisionId,
      type: data.type,
    });
  }

  clickVehicle(data: CollectionVehicleModel) {
    this.componentTypeExpression = CollectionVehicleWindowComponent;
    this.createToast({
      divisionId: this._globalStorage.divisionId,
      type: CollectionDeviceStateCountType.All,
    });
  }
  clickScoreRank(data: CommonRankData) {
    this.componentTypeExpression = CollectionRecordWindowComponent;
    this.createToast({
      beginTime: TimeService.curMonth(Date.now()).beginTime,
      endTime: TimeService.curMonth(Date.now()).endTime,
    });
  }
  clickScorePipe(data: ICollectionScorePieData) {
    this.componentTypeExpression = CollectionRecordWindowComponent;
    this.createToast({ score: data.Type });
  }
  clickPointPipe(data: ICollectionPointPieData) {
    this.componentTypeExpression = CollectionPointWindowComponent;
    this.createToast({ type: data.Type });
  }
  clickCard(data: CommonStatisticCardModel) {
    this.componentTypeExpression = data.componentExpression;
    if (this.componentTypeExpression) {
      this.componentTypeExpression.prototype.type = data.type;
    }
    this.createToast({});
  }

  private createToast(data: IModel) {
    this.myInjector.get(ToastWindowService).data = data;
    this.showToast = true;
  }
  closeToast() {
    this.showToast = false;
    this.componentTypeExpression = undefined;
    this.myInjector.get(ToastWindowService).reset();
  }
}
