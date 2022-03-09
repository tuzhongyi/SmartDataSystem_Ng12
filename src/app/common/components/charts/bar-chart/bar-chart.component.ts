import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { TimeData } from '../chart.model';
import { barOption } from './bar-chart.option';
import * as echarts from 'echarts/core';
import { wait } from 'src/app/common/tools/tool';
import { Language } from 'src/app/global/tool/language';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { XAXisOption } from 'echarts/types/dist/shared';

@Component({
  selector: 'howell-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit, OnChanges, AfterViewInit {

  option = barOption;

  @Input()
  data?:TimeData<any>[]
  @Input()
  unit:TimeUnit = TimeUnit.Hour;
  @Input()
  date:Date = new Date();

  chart?: echarts.ECharts;


  @ViewChild('echarts')
  echarts?: ElementRef<HTMLDivElement>;


  constructor() { }
  ngAfterViewInit(): void {
    wait(()=>{
      if (this.echarts) {
        let div = this.echarts.nativeElement as HTMLDivElement;
        return div.offsetWidth > 0 && div.offsetHeight > 0;
      }
      return false;
    }, ()=>{
      if(this.echarts)
      {
        this.chart = echarts.init(this.echarts.nativeElement, 'dark');
      }
    })
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.chart && this.data)
    {
      this.chart.resize()
      this.option.xAxis.data = this.getX(this.unit, this.date) as never[];
      this.option.series[0].data = this.data as never[];
      this.chart.setOption(this.option)
    }
  }

  ngOnInit(): void {
  }


  getX(unit:TimeUnit, date:Date):XAXisOption|undefined{
    let interval:IntervalParams;
    switch (unit) {
      case TimeUnit.Hour:
        return {
          mainType: 'xAxis',
      type: 'category',

      data: [
        ...Array.from(
          { length: 25 },
          (v, i) => (i).toString().padStart(2, '0') + ':00'
        ),
      ],
        }
    case TimeUnit.Month:
      interval = IntervalParams.allMonth(date)
      
      return {
        mainType: 'xAxis',
      type: 'category',

      data: [
        ...Array.from(
          { length: interval.EndTime.getDate()-interval.BeginTime.getDate() +1 },
          (v, i) => (i+1).toString() + "日" 
        ),
      ],
      }
      case TimeUnit.Week:
        interval = IntervalParams.allWeek(date);
        
        return {
          mainType: 'xAxis',
        type: 'category',
  
        data: [
          ...Array.from(
            { length: 7},
            (v, i) => Language.Week(i+1)
          ),
        ],
        }
      default:
        break;
    }
    return undefined;
  }
}
