import { ElementRef, EventEmitter } from '@angular/core';
import * as echarts from 'echarts';
export abstract class AEChartComponent<T = any> {
  abstract element?: ElementRef;
  abstract option: echarts.EChartsOption;

  abstract load?: EventEmitter<T>;

  init() {
    if (this.element) {
      this.echart = echarts.init(this.element.nativeElement, 'dark');
      return true;
    }
    return false;
  }

  echart?: echarts.ECharts;
}
