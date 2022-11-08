import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { EChartsOption } from 'echarts';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
// 按需引入 Echarts
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { CollectionDeviceStateBusiness } from './collection-device-state.business';
import { CollectionVehicleConverter } from './collection-device-state.converter';
import { CollectionDeviceStateModel } from './collection-device-state.model';

echarts.use([GaugeChart, UniversalTransition, CanvasRenderer]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption>;

@Component({
  selector: 'collection-device-state',
  templateUrl: './collection-device-state.component.html',
  styleUrls: ['./collection-device-state.component.less'],
  providers: [CollectionDeviceStateBusiness, CollectionVehicleConverter],
})
export class GarbageVehiclesDeviceStateComponent
  implements OnInit {

  title: string = '设备运行状态';
  model: CollectionDeviceStateModel | null = null;
  theme: EChartsTheme = EChartsTheme.adsame;

  gaugeOption: EChartsOption = {

  };


  constructor(private _business: CollectionDeviceStateBusiness) { }

  ngOnInit() {


    this._init();
  }
  private async _init() {
    this.model = await this._business.init();

  }

  ngAfterViewInit() {
    // if (this.chartContainer) {
    //   this.myChart = echarts.init(this.chartContainer.nativeElement);
    //   this.myChart.setOption(this.option);
    // }
  }

}
