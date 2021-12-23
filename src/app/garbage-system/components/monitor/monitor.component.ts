/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: pmx
 * @Last Modified time: 2021-12-21 11:05:05
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';
import { StatisticCardViewModel } from '../statistic-card/statistic-card.model';
import { MonitorEventTriggerBusiness } from './business/monitor-event-trigger.business';
import { StatisticCardBussiness } from './business/statistic-card.bussiness';
import { WindowBussiness } from './business/window.business';

@Component({
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
  providers: [
    WindowBussiness,
    MonitorEventTriggerBusiness,
    StatisticCardBussiness,
  ],
})
export class MonitorComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;

  statisticCardList?: StatisticCardViewModel[];

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _storeService: StoreService,
    public window: WindowBussiness,
    public trigger: MonitorEventTriggerBusiness,
    private statisticCardBussiness: StatisticCardBussiness
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }
  ngOnInit(): void {
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      let userDivisionId = user.Resources[0].Id;
      let resourceType = user.Resources[0].ResourceType;
      let userDivisionType =
        EnumHelper.ConvertUserResourceToDivision(resourceType);

      this._storeService.divisionId = userDivisionId;
      this._storeService.divisionType = userDivisionType;
    }

    let promise = this.statisticCardBussiness.load();
    promise.then((x) => {
      this.statisticCardList = x;
    });
  }
  clickMonitor() {
    console.log('click monitor');
  }
}
