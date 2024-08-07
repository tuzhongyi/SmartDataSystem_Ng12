import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { EChartsOption } from 'echarts';
import { wait2 } from 'src/app/common/tools/tool';
import { DetailsChartHeatmapBusiness } from './business/details-chart-heatmap.business';
import { DetailsChartHeatmapController } from './controller/details-chart-heatmap.controller';
import { DetailsChartHeatmapArgs } from './details-chart-heatmap.model';
import { DetailsChartHeatmapProviders } from './details-chart-heatmap.providers';

@Component({
  selector: 'details-chart-heatmap',
  templateUrl: './details-chart-heatmap.component.html',
  styleUrls: ['./details-chart-heatmap.component.less'],
  providers: [...DetailsChartHeatmapProviders],
})
export class DetailsChartHeatmapComponent implements OnInit, OnDestroy {
  @Input() args = new DetailsChartHeatmapArgs();
  @Input('load') input_load?: EventEmitter<DetailsChartHeatmapArgs>;
  constructor(
    private business: DetailsChartHeatmapBusiness,
    public controller: DetailsChartHeatmapController
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
