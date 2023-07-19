/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: zzl
 * @Last Modified time: 2022-01-10 16:08:27
 */
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalStorageService,
  SystemType,
} from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { MonitorEventTriggerBusiness } from './business/monitor-event-trigger.business';
import { MonitorMapControlBusiness } from './business/monitor-map-control.business';
import { MonitorPatrolControlBusiness } from './business/monitor-patrol-control.business';
import { MonitorStatisticCardBussiness } from './business/monitor-statistic-card.bussiness';
import {
  MonitorWindowBussiness,
  WindowBusinesses,
} from './business/window.business';
import { MonitorVideoControlWindowBusiness } from './business/windows/monitor-video-control-window.business';

@Component({
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  providers: [
    MonitorEventTriggerBusiness,
    MonitorStatisticCardBussiness,
    MonitorMapControlBusiness,
    MonitorPatrolControlBusiness,
    MonitorVideoControlWindowBusiness,
    ...WindowBusinesses,
    MonitorWindowBussiness,
  ],
})
export class MonitorComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton(): boolean {
    return this.global.HideButton;
  }
  get HideTitlebar(): boolean {
    return this.global.HideTitlebar;
  }

  load: EventEmitter<void> = new EventEmitter();

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private global: GlobalStorageService,
    public window: MonitorWindowBussiness,
    public trigger: MonitorEventTriggerBusiness,
    public map: MonitorMapControlBusiness,
    public patrol: MonitorPatrolControlBusiness,
    public video: MonitorVideoControlWindowBusiness,
    public statistic: MonitorStatisticCardBussiness,
    private activatedRoute: ActivatedRoute
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
    this.global.system = SystemType.garbage;
    this.global.interval.subscribe(this.load);
    this.global.statusChange.subscribe(this.load);
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
              this.global.HideButton = value;
              break;
            case 'hidetitlebar':
              this.global.HideTitlebar = value;
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

      this.global.divisionId = userDivisionId;
      this.global.divisionType = userDivisionType;
    }

    this.statistic.loading.emit();
  }
}
