import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonLineChartComponent } from 'src/app/common/components/common-line-chart/common-line-chart.component';
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

  @ViewChild(CommonLineChartComponent) chart?: CommonLineChartComponent;

  title = '';
  subscription: Subscription;

  constructor(
    public business: EventStatisticLineBusiness,
    private _globalStorage: GlobalStorageService
  ) {
    this.subscription = this._globalStorage.statusChange.subscribe(() => {
      this.business.searchInfo.DivisionId = this._globalStorage.divisionId;
      this.chart?.update();
    });
  }

  ngOnInit(): void {
    this.title = Language.EventType(this.type) + '统计表';
    this.business.searchInfo.EventType = this.type;
  }

  ngOnDestroy() {}
}
