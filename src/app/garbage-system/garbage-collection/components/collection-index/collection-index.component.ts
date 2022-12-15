/*
 * @Author: pmx
 * @Date: 2022-12-09 14:38:46
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-15 15:51:31
 */
import {
  AfterViewInit,
  Component,
  Injector,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import { CommonRankData } from 'src/app/common/components/common-rank/common-rank.model';
import {
  ToastWindowService,
  TOAST_WINDOW_TOKEN,
} from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { CollectionDeviceStateCountType } from 'src/app/enum/collection-device-state.enum';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { ICollectionDeviceStateData } from '../collection-device-state/collection-device-state.model';
import { CollectionVehicleModel } from '../collection-vehicle/collection-vehicle.model';
import { CollectionListWindowComponent } from '../windows';
import { VehicleListWindowComponent } from '../windows/vehicle-list-window/vehicle-list-window.component';
import { CollectionStatisticCardBusiness } from './business/collection-statistic-card.bussiness';
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
  ],
})
export class GarbageCollectionIndexComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  TrashCanType = TrashCanType;
  CollectionScore = CollectionPointScore;

  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton(): boolean {
    return this._globalStoreService.HideButton;
  }
  get HideTitlebar(): boolean {
    return this._globalStoreService.HideTitlebar;
  }

  /******kaoniqiwa**************/

  subscription: Subscription;

  showToast = false;

  myInjector: Injector;

  componentTypeExpression: Type<any> = VehicleListWindowComponent;

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _globalStoreService: GlobalStorageService,
    public map: MapControlBusiness,
    public route: MapRouteBusiness,
    public video: VideoControlWindowBusiness,
    public window: WindowBussiness,
    private _statisticCardBussiness: CollectionStatisticCardBusiness,

    private injector: Injector
  ) {
    this._titleService.setTitle('垃圾清运平台');

    this.subscription = interval(1 * 60 * 1000).subscribe(() => {
      this._globalStoreService.collectionStatusChange.emit();
    });

    this.myInjector = Injector.create({
      providers: [
        {
          provide: ToastWindowService,
          useClass: ToastWindowService,
        },
      ],
      parent: this.injector,
    });
  }

  ngOnInit(): void {
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      let userDivisionId = user.Resources[0].Id;
      let resourceType = user.Resources[0].ResourceType;
      let userDivisionType =
        EnumHelper.ConvertUserResourceToDivision(resourceType);
      this._globalStoreService.divisionId = userDivisionId;
      this._globalStoreService.divisionType = userDivisionType;
    }
    this._statisticCardBussiness.init();
  }

  closeToast() {
    this.showToast = false;
    this.myInjector.get(ToastWindowService).reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit(): void {}

  /*****处理弹窗*****/
  clickDeviceState(data: ICollectionDeviceStateData) {
    this.componentTypeExpression = VehicleListWindowComponent;

    this._updateToast({
      divisionId: this._globalStoreService.divisionId,
      type: data.type,
    });
  }

  clickVehicle(data: CollectionVehicleModel) {
    this.componentTypeExpression = VehicleListWindowComponent;
    this._updateToast({
      divisionId: this._globalStoreService.divisionId,
      type: CollectionDeviceStateCountType.All,
    });
  }
  clickScoreRank(data: CommonRankData) {
    this.componentTypeExpression = CollectionListWindowComponent;
    this._updateToast({});
  }
  private _updateToast(data: IModel) {
    this.myInjector.get(ToastWindowService).data = data;
    this.showToast = true;
  }
}
