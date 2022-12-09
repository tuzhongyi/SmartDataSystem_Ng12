/*
 * @Author: pmx
 * @Date: 2022-12-09 14:38:46
 * @Last Modified by: pmx
 * @Last Modified time: 2022-12-09 17:29:13
 */
import { Component, Injector, OnDestroy, OnInit, Type } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import {
  ToastWindowService,
  TOAST_WINDOW_TOKEN,
} from 'src/app/common/components/toast-window/toast-window.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { CollectionPointScore } from 'src/app/enum/collection-point-score.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { TrashCanType } from 'src/app/enum/trashcan-type.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { ICollectionDeviceStateData } from '../collection-device-state/collection-device-state.model';
import { CollectionVehicleModel } from '../collection-vehicle/collection-vehicle.model';
import { VehicleListComponent } from '../windows';
import { DeviceListComponent } from '../windows/device-list/device-list.component';
import { MapControlBusiness } from './business/map-control.business';
import { MapRouteBusiness } from './business/map-route.business';
import { MonitorEventTriggerBusiness } from './business/monitor-event-trigger.business';
import { PatrolControlBusiness } from './business/patrol-control.business';
import { StatisticCardBussiness } from './business/statistic-card.bussiness';
import { WindowBussiness } from './business/window.business';
import { DeviceWindowBusiness } from './business/windows/device-window.business';
import { RecordWindowBusiness } from './business/windows/event-record-window.business';
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
    StatisticCardBussiness,
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
    MapRouteBusiness,
  ],
})
export class GarbageCollectionIndexComponent implements OnInit, OnDestroy {
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

  componentTypeExpression: Type<any> = DeviceListComponent;

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _globalStoreService: GlobalStorageService,
    public map: MapControlBusiness,
    public route: MapRouteBusiness,
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
  }

  closeToast() {
    this.showToast = false;
    this.myInjector.get(ToastWindowService).reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*****处理弹窗*****/
  clickDeviceState(data: ICollectionDeviceStateData) {
    this.componentTypeExpression = DeviceListComponent;

    this._updateToast(data);
  }

  clickVehicle(data: CollectionVehicleModel) {
    this.componentTypeExpression = VehicleListComponent;
    this._updateToast(data);
  }
  private _updateToast(data: IModel) {
    this.myInjector.get(ToastWindowService).data = data;
    this.showToast = true;
  }
}
