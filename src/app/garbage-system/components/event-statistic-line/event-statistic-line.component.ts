import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { EventStatisticLineBusiness } from './event-statistic-line.business';

@Component({
  selector: 'event-statistic-line',
  templateUrl: './event-statistic-line.component.html',
  styleUrls: ['./event-statistic-line.component.less'],
  providers: [EventStatisticLineBusiness],
})
export class EvemtStatisticLineComponent implements OnInit, OnDestroy {
  @Input() type: EventType = EventType.IllegalDrop;

  title = '';

  constructor(
    private business: EventStatisticLineBusiness,
    private _globalStorage: GlobalStorageService
  ) {}

  ngOnInit(): void {
    console.log('EventStatisticLineBusiness', this._globalStorage.divisionId);

    this.business.init();
    this.title = Language.EventType(this.type) + '统计表';
  }

  ngOnDestroy() {}
}
