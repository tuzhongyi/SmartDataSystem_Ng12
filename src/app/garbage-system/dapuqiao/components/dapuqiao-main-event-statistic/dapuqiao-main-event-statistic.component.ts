import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IChartPieModel } from 'src/app/garbage-system/components/charts/pies/chart-pie-event-statistic/chart-pie-event-statistic.option';
import { DapuqiaoMainEventStatisticBusiness } from './dapuqiao-main-event-statistic.business';
import {
  DapuqiaoMainEventStatisticArgs,
  DapuqiaoMainEventStatisticModel,
} from './dapuqiao-main-event-statistic.model';
import { DapuqiaoMainEventStatisticService } from './dapuqiao-main-event-statistic.service';

@Component({
  selector: 'dapuqiao-main-event-statistic',
  templateUrl: './dapuqiao-main-event-statistic.component.html',
  styleUrls: ['./dapuqiao-main-event-statistic.component.less'],
  providers: [
    DapuqiaoMainEventStatisticService,
    DapuqiaoMainEventStatisticBusiness,
  ],
})
export class DapuqiaoMainEventStatisticComponent implements OnInit {
  @Input() load?: EventEmitter<void>;
  @Output() details: EventEmitter<void> = new EventEmitter();
  constructor(private business: DapuqiaoMainEventStatisticBusiness) {}

  chartload: EventEmitter<IChartPieModel> = new EventEmitter();
  model: IChartPieModel = {
    option: {},
    data: [],
  };
  data = new DapuqiaoMainEventStatisticModel();
  args = new DapuqiaoMainEventStatisticArgs();
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
      this.data = x;
      this.model.data = [x.supervision, x.feedback];
      this.chartload.emit(this.model);
    });
  }

  onchange() {
    this.loadData();
  }
  onclick() {
    this.details.emit();
  }
}
