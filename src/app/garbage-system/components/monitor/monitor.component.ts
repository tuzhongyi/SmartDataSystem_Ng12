/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: zzl
 * @Last Modified time: 2022-01-10 16:08:27
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { AuthorizationService } from 'src/app/network/request/auth/auth-request.service';
import { StatisticCardViewModel } from '../statistic-card/statistic-card.model';
import { MapControlBusiness } from './business/map-control.business';
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
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
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
  ],
})
export class MonitorComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton(): boolean {
    return this._storeService.HideButton;
  }
  get HideTitlebar(): boolean {
    return this._storeService.HideTitlebar;
  }

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _storeService: GlobalStorageService,
    public window: WindowBussiness,
    public trigger: MonitorEventTriggerBusiness,
    public map: MapControlBusiness,
    public patrol: PatrolControlBusiness,
    public video: VideoControlWindowBusiness,
    public statistic: StatisticCardBussiness,
    private activatedRoute: ActivatedRoute
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }

  config(route: ActivatedRoute) {
    route.queryParams.subscribe((param) => {
      // console.log("HideButton:", param);
      for (const key in param) {
        let lower = key.toLocaleLowerCase();
        let value: any;
        try {
          value = JSON.parse(param[key]);
          switch (lower) {
            case 'hidebutton':
              this._storeService.HideButton = value;
              break;
            case 'hidetitlebar':
              this._storeService.HideTitlebar = value;
              break;
            default:
              break;
          }
        } catch {}
      }
    });
  }

  ngOnInit(): void {
    this.config(this.activatedRoute);
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      let userDivisionId = user.Resources[0].Id;
      let resourceType = user.Resources[0].ResourceType;
      let userDivisionType =
        EnumHelper.ConvertUserResourceToDivision(resourceType);

      this._storeService.divisionId = userDivisionId;
      this._storeService.divisionType = userDivisionType;
    }

    this.statistic.loading.emit();
  }
}
