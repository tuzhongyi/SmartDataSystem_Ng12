import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartPieModel } from 'src/app/garbage-system/components/charts/pies/chart-pie-event-level/chart-pie-event-level.option';
import { DaPuQiaoMainEventLevelBusiness } from './dapuqiao-main-event-level.business';
import {
  DaPuQiaoMainEventLevelArgs,
  LevelItem,
} from './dapuqiao-main-event-level.model';

@Component({
  selector: 'dapuqiao-main-event-level',
  templateUrl: './dapuqiao-main-event-level.component.html',
  styleUrls: ['./dapuqiao-main-event-level.component.less'],
  providers: [DaPuQiaoMainEventLevelBusiness],
})
export class DaPuQiaoMainEventLevelComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  @Output() details: EventEmitter<number> = new EventEmitter();
  constructor(private business: DaPuQiaoMainEventLevelBusiness) {}

  title: string = '今日事件数量';
  model: IChartPieModel<LevelItem> = {
    option: {},
    data: [],
  };
  chartload: EventEmitter<IChartPieModel<LevelItem>> = new EventEmitter();
  args = new DaPuQiaoMainEventLevelArgs();
  EventType = EventType;
  TimeUnit = TimeUnit;
  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this.loadData();
      });
    }
  }

  oninit(option: echarts.EChartsOption) {
    this.model.option = option;
    this.loadData();
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.model.data = x.items;
      this.chartload.emit(this.model);
    });
  }

  onchange() {
    this.loadData();
  }
  onclick(item: LevelItem) {
    let level = 0;
    switch (item.key) {
      case EventType.GarbageDrop:
        level = 1;
        break;
      case EventType.GarbageDropTimeout:
        level = 2;
        break;
      case EventType.GarbageDropSuperTimeout:
        level = 3;
        break;

      default:
        break;
    }
    this.details.emit(level);
  }
}
