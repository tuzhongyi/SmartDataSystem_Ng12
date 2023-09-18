import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { IChartLineModel } from 'src/app/garbage-system/components/charts/lines/chart-line-simple/chart-line-simple.option';
import { GarbageDropSuperVisionLevel } from 'src/app/network/model/garbage-drop-super-vision-data.model';
import { DapuqiaoMainEventLineBusiness } from './dapuqiao-main-line-event.business';

@Component({
  selector: 'dapuqiao-main-line-event',
  templateUrl: './dapuqiao-main-line-event.component.html',
  styleUrls: ['./dapuqiao-main-line-event.component.less'],
  providers: [DapuqiaoMainEventLineBusiness],
})
export class DapuqiaoMainLineEventComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  constructor(private business: DapuqiaoMainEventLineBusiness) {}

  chartload: EventEmitter<IChartLineModel> = new EventEmitter();
  model: IChartLineModel = {
    option: {},
    x: [],
    data: [],
  };

  Level = GarbageDropSuperVisionLevel;
  Language = Language;

  level: GarbageDropSuperVisionLevel = this.Level.three;

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
    this.business.load().then((x) => {
      this.model.data = x.datas[this.level - 1];
      this.model.x = x.x;
      this.chartload.emit(this.model);
    });
  }

  onchange() {
    this.loadData();
  }
}
