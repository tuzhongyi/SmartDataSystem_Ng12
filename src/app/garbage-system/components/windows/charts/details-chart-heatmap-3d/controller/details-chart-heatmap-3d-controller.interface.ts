import { EChartsOption } from 'echarts';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { DetailsChartHeatmapModel } from '../../details-chart-heatmap/details-chart-heatmap.model';

export interface IDetailsChartHeatmap3DTimeController {
  loadAxisX(duration?: Duration): string[];
  loadAxisY(duration?: Duration): string[];
  format(item: any): string;
  loadData(datas: DetailsChartHeatmapModel[]): any;

  config(option: EChartsOption): void;
  tooltip(): any;
}
