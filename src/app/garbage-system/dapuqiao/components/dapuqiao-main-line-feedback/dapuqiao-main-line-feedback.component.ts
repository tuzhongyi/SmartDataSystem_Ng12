import { Component, EventEmitter, OnInit } from '@angular/core';
import { Language } from 'src/app/common/tools/language';
import { IChartLineModel } from 'src/app/garbage-system/components/charts/lines/chart-line-simple/chart-line-simple.option';
import { GarbageDropSuperVisionLevel } from 'src/app/network/model/garbage-drop-super-vision-data.model';
import { DaPuQiaoMainLineFeedbackBusiness } from './dapuqiao-main-line-feedback.business';

@Component({
  selector: 'dapuqiao-main-line-feedback',
  templateUrl: './dapuqiao-main-line-feedback.component.html',
  styleUrls: ['./dapuqiao-main-line-feedback.component.less'],
  providers: [DaPuQiaoMainLineFeedbackBusiness],
})
export class DaPuQiaoMainLineFeedbackComponent implements OnInit {
  constructor(private business: DaPuQiaoMainLineFeedbackBusiness) {}

  load: EventEmitter<IChartLineModel> = new EventEmitter();
  model: IChartLineModel = {
    option: {},
    x: [],
    data: [],
  };

  Level = GarbageDropSuperVisionLevel;
  Language = Language;

  level: GarbageDropSuperVisionLevel = this.Level.three;

  ngOnInit(): void {}

  oninit(option: echarts.EChartsOption) {
    this.model.option = option;
    this.loadData();
  }

  loadData() {
    this.business.load().then((x) => {
      this.model.data = x.datas[this.level - 1];
      this.model.x = x.x;
      this.load.emit(this.model);
    });
  }
  onchange() {
    this.loadData();
  }
}
