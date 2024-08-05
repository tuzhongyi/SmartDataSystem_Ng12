import { EventEmitter, Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../details-chart-heatmap.model';
import { IDetailsChartHeatmapTimeController } from './details-chart-heatmap-controller.interface';
import { DetailsChartHeatmapMonthController } from './details-chart-heatmap-month.controller';
import { DetailsChartHeatmapYearController } from './details-chart-heatmap-year.controller';

@Injectable()
export class DetailsChartHeatmapController {
  load = new EventEmitter<EChartsOption>();
  constructor(
    private month: DetailsChartHeatmapMonthController,
    private year: DetailsChartHeatmapYearController
  ) {}

  private option?: EChartsOption;
  init(option: EChartsOption) {
    this.option = option;
  }

  private getController(unit: TimeUnit) {
    let controller: IDetailsChartHeatmapTimeController;
    switch (unit) {
      case TimeUnit.Month:
        controller = this.month;
        break;
      case TimeUnit.Year:
        controller = this.year;
        break;
      default:
        throw new Error('Method not implemented.');
    }
    return controller;
  }

  loadAxis(duration: Duration, unit: TimeUnit) {
    let controller = this.getController(unit);
    if (this.option) {
      (this.option.xAxis as any).data = controller.loadAxisX(duration);
      (this.option.yAxis as any).data = controller.loadAxisY(duration);
      (this.option.xAxis as any).axisLabel.formatter = controller.format;
    }
  }
  loadTooltip(unit: TimeUnit) {
    let controller = this.getController(unit);
    (this.option as any).tooltip = controller.tooltip();
  }
  private findMaxValue(data: DetailsChartHeatmapModel[]) {
    let max = 0;
    for (let item of data) {
      if (item.value) {
        if (item.value > max) {
          max = item.value;
        }
      }
    }
    return max;
  }
  loadData(datas: DetailsChartHeatmapModel[], unit: TimeUnit) {
    if (this.option) {
      let option = this.option as any;
      let max = this.findMaxValue(datas) || 0;
      option.visualMap.max = max;

      let controller = this.getController(unit);
      controller.config(option);
      option.series[0].data = controller.loadData(datas);

      this.load.emit(this.option);
      console.log(this.option);
    }
  }
}
