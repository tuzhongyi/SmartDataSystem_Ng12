import { EventEmitter, Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../../details-chart-heatmap/details-chart-heatmap.model';
import { IDetailsChartHeatmap3DTimeController } from './details-chart-heatmap-3d-controller.interface';
import { DetailsChartHeatmap3DMonthController } from './details-chart-heatmap-3d-month.controller';
import { DetailsChartHeatmap3DYearController } from './details-chart-heatmap-3d-year.controller';

@Injectable()
export class DetailsChartHeatmap3DController {
  load = new EventEmitter<EChartsOption>();
  constructor(
    private month: DetailsChartHeatmap3DMonthController,
    private year: DetailsChartHeatmap3DYearController
  ) {}

  private option?: EChartsOption;
  init(option: EChartsOption) {
    this.option = option;
  }

  private getController(unit: TimeUnit) {
    let controller: IDetailsChartHeatmap3DTimeController;
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

  loadTooltip(unit: TimeUnit) {
    let controller = this.getController(unit);
    (this.option as any).tooltip = controller.tooltip();
  }

  loadAxis(duration: Duration, unit: TimeUnit) {
    let controller = this.getController(unit);
    if (this.option) {
      (this.option.xAxis3D as any).data = controller.loadAxisX(duration);
      (this.option.yAxis3D as any).data = controller.loadAxisY(duration);
      (this.option.yAxis3D as any).axisLabel.formatter = controller.format;
    }
  }

  private loadAxisZ(max: number) {
    let result: (null | number)[] = [null];
    for (let i = 0; i <= max; i++) {
      result.push(i);
    }
    return result;
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
      let max = this.findMaxValue(datas) || 0;
      let interval = this.interval(max);
      let option = this.option as any;
      option.zAxis3D.data = this.loadAxisZ(interval * 5);
      option.zAxis3D.max = interval * 5;
      option.zAxis3D.splitNumber = 5;
      option.zAxis3D.interval = interval;
      option.visualMap.max = max;

      let controller = this.getController(unit);
      controller.config(option);
      option.series[0].data = controller.loadData(datas);

      this.load.emit(this.option);
      console.log(this.option);
    }
  }

  interval(max: number) {
    let interval = Math.ceil(max / 5);
    while (interval % 10 != 0) {
      interval++;
    }
    return interval;
  }
}
