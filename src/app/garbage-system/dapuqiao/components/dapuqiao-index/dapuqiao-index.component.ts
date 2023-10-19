import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  GlobalStorageService,
  SystemType,
} from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { IndexEventTriggerBusiness } from './business/index-event-trigger.business';
import { IndexMapControlBusiness } from './business/index-map-control.business';
import { IndexPatrolControlBusiness } from './business/index-patrol-control.business';
import { IndexStatisticCardBussiness } from './business/index-statistic-card.bussiness';
import { IndexSuperviseButton } from './business/index-supervise-button.business';
import {
  IndexWindowBusinesses,
  IndexWindowBussiness,
} from './business/index-window.business';
import { IndexVideoControlWindowBusiness } from './business/windows/index-video-control-window.business';

@Component({
  selector: 'dapuqiao-index',
  templateUrl: './dapuqiao-index.component.html',
  styleUrls: ['./dapuqiao-index.component.less'],
  providers: [
    IndexEventTriggerBusiness,
    IndexStatisticCardBussiness,
    IndexMapControlBusiness,
    IndexPatrolControlBusiness,
    IndexVideoControlWindowBusiness,
    ...IndexWindowBusinesses,
    IndexWindowBussiness,
    IndexSuperviseButton,
  ],
})
export class DaPuQiaoIndexComponent implements OnInit, OnDestroy {
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
    public window: IndexWindowBussiness,
    public trigger: IndexEventTriggerBusiness,
    public map: IndexMapControlBusiness,
    public patrol: IndexPatrolControlBusiness,
    public video: IndexVideoControlWindowBusiness,
    public statistic: IndexStatisticCardBussiness,
    private activatedRoute: ActivatedRoute,
    public supervise: IndexSuperviseButton
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
    this.global.system = SystemType.garbage;
    this.global.interval.subscribe(this.key, () => {
      this.load.emit();
      this.statistic.loading.emit();
    });
    this.global.statusChange.subscribe(() => {
      this.load.emit();
      this.statistic.loading.emit();
    });
    this.global.interval.run();
  }
  key = 'dapuqiao-index';

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
  ngOnDestroy(): void {
    this.global.interval.unsubscribe(this.key);
  }

  onweight(type: GarbageType) {
    this.window.weight.type = type;
    this.window.weight.show = true;
  }
}
