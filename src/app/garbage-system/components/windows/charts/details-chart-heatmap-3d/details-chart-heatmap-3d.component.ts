import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { GaugeChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { wait2 } from 'src/app/common/tools/tool';
import { DetailsChartHeatmapBusiness } from '../details-chart-heatmap/business/details-chart-heatmap.business';
import { DetailsChartHeatmap3DController } from './controller/details-chart-heatmap-3d.controller';

import { DetailsChartHeatmapArgs } from '../details-chart-heatmap/details-chart-heatmap.model';
import { DetailsChartHeatmap3DProviders } from './details-chart-heatmap-3d.providers';

echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

@Component({
  selector: 'details-chart-heatmap-3d',
  templateUrl: './details-chart-heatmap-3d.component.html',
  styleUrls: ['./details-chart-heatmap-3d.component.less'],
  providers: [...DetailsChartHeatmap3DProviders],
})
export class DetailsChartHeatmap3DComponent implements OnInit, OnDestroy {
  @Input() args = new DetailsChartHeatmapArgs();
  @Input('load') input_load?: EventEmitter<DetailsChartHeatmapArgs>;
  constructor(
    private business: DetailsChartHeatmapBusiness,
    public controller: DetailsChartHeatmap3DController
  ) {}

  private inited = false;
  private destroy = false;
  loading = false;

  ngOnInit(): void {
    if (this.input_load) {
      this.input_load.subscribe((args) => {
        this.args = args;
        wait2(() => {
          return this.inited && !this.destroy;
        }).then(() => {
          if (this.destroy) {
            return;
          }
          this.load();
        });
      });
    }
  }
  ngOnDestroy(): void {
    this.destroy = true;
  }

  init(option: EChartsOption) {
    this.controller.init(option);
    this.inited = true;
    this.controller.loadAxis(this.args.duration, this.args.unit);
    this.load();
  }

  load() {
    this.loading = true;
    this.controller.loadAxis(this.args.duration, this.args.unit);
    this.controller.loadTooltip(this.args.unit);

    this.business
      .load(this.args)
      .then((datas) => {
        this.controller.loadData(datas, this.args.unit);
      })
      .finally(() => {
        this.loading = false;
      });
  }
}
