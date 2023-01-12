/*
 * @Author: pmx
 * @Date: 2021-11-01 16:41:30
 * @Last Modified by: pmx
 * @Last Modified time: 2023-01-12 16:38:03
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { interval, Subscription } from 'rxjs';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import {
  DisposalCountArgs,
  DisposalCountModel,
  IDisposalCount,
} from 'src/app/garbage-system/components/disposal-count/disposal-count.model';
import { DisposalCountBusiness } from './disposal-count.business';

// 按需引入 Echarts
import * as echarts from 'echarts/core';

import { TitleComponent, TitleComponentOption } from 'echarts/components';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { DisposalCountType } from 'src/app/garbage-system/components/disposal-count/disposal-count.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';

echarts.use([TitleComponent, GaugeChart, UniversalTransition, CanvasRenderer]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption | TitleComponentOption>;

@Component({
  selector: 'app-disposal-count',
  templateUrl: './disposal-count.component.html',
  styleUrls: ['./disposal-count.component.less'],
  providers: [DisposalCountBusiness],
})
export class DisposalCountComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @Output()
  task: EventEmitter<DisposalCountArgs> = new EventEmitter();

  DisposalCountType = DisposalCountType;
  public title: string = '今日任务处置';

  data?: DisposalCountModel;

  private myChart!: echarts.ECharts;
  private option!: ECOption;
  private gaugeOption!: GaugeSeriesOption;

  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLElement>;

  constructor(
    private business: DisposalCountBusiness,
    private storeService: GlobalStorageService
  ) {}

  taskSerie: GaugeSeriesOption = {
    type: 'gauge',
    startAngle: 90,
    endAngle: -270,
    radius: '80%',
    pointer: {
      show: false,
    },
    progress: {
      show: true,
      overlap: false,
      roundCap: false,
      clip: false,
      itemStyle: {
        borderWidth: 0,
        color: '#3a93ff',
      },
    },
    axisLine: {
      lineStyle: {
        width: 10,
        color: [[1, '#4b5899']],
        opacity: 0.5,
      },
    },
    splitLine: {
      show: false,
      distance: 0,
      length: 10,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    data: [
      {
        value: 100,
        name: '处置率',
        title: {
          offsetCenter: ['0%', '-10%'],
        },
        detail: {
          offsetCenter: ['0%', '-42%'],
        },
      },
    ],
    title: {
      fontSize: 14,
      color: '#868fff',
    },
    detail: {
      width: 50,
      height: 14,
      color: 'auto',
      rich: {
        a: {
          color: 'white',
          fontSize: 28,
          fontWeight: 'normal',
        },
        b: {
          fontSize: 12,
          color: '#cfd7ff',
          // verticalAlign: "bottom",
        },
      },
      formatter: (value?: string | any) => {
        return '{a|' + value + '}{b|%}';
      },
    },
  };
  timeoutSerie: GaugeSeriesOption = {
    type: 'gauge',
    startAngle: 90,
    endAngle: -270,
    radius: '70%',
    pointer: {
      show: false,
    },
    progress: {
      show: true,
      overlap: false,
      roundCap: false,
      clip: false,
      itemStyle: {
        borderWidth: 0,
        color: '#ffba00',
      },
    },
    axisLine: {
      lineStyle: {
        width: 10,
        color: [[1, '#4b5899']],
        opacity: 0.3,
      },
    },
    splitLine: {
      show: false,
      distance: 0,
      length: 10,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    data: [
      {
        value: 100,
        name: '达标率',
        title: {
          offsetCenter: ['0%', '55%'],
        },
        detail: {
          offsetCenter: ['0%', '18%'],
        },
      },
    ],
    title: {
      fontSize: 14,
      color: '#ffba00',
    },
    detail: {
      width: 50,
      height: 14,
      color: 'auto',
      rich: {
        a: {
          color: 'white',
          fontSize: 28,
          fontWeight: 'normal',
        },
        b: {
          fontSize: 12,
          color: '#cfd7ff',
          fontFamily: '微软雅黑',
        },
      },
      formatter: (value?: string | any) => {
        return '{a|' + value + '}{b|%}';
      },
    },
  };

  ngOnInit(): void {
    this.business.subscription.subscription =
      this.storeService.statusChange.subscribe((x) => {
        this.loadData();
      });
    this.storeService.interval.subscribe((x) => {
      this.loadData();
    });
    this.loadData();

    this.gaugeOption = {
      type: 'gauge',
      radius: '100%',
      center: ['50%', '50%'],
      splitNumber: 10,
      progress: {
        show: false,
        width: 15,
        roundCap: true,
        itemStyle: {
          color: 'inherit',
        },
      },
      axisLine: {
        lineStyle: {
          width: 15,
          color: [
            [0.3, '#ef6464'],
            [0.7, '#ffba00'],
            [1, '#21E452'],
          ],
        },
      },
      axisLabel: {
        color: 'inherit',
        distance: 26,
        fontSize: 12,
      },
      splitLine: {
        show: true,
        distance: -15,
        length: 10,
        lineStyle: {
          color: '#99aaff',
          width: 2,
        },
      },
      axisTick: {
        distance: -15,
        length: 5,
        lineStyle: {
          color: '#99aaff',
          width: 2,
        },
      },
      title: {
        offsetCenter: ['0%', '35%'],
        color: 'inherit',
        fontSize: 18,
        fontWeight: 400,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['5%', '80%'],
        formatter: '{a|{value}}{b|%}',

        rich: {
          a: {
            fontSize: 30,
            fontWeight: 400,
            fontFamily: 'Arial',
            color: 'inherit',
            align: 'center',
            padding: [0, 0, 0, 0],
          },
          b: {
            fontSize: 20,
            fontWeight: 400,
            fontFamily: 'Arial',
            color: 'inherit',
            padding: [0, 0, 0, 0],
          },
        },
        fontWeight: 'normal',
        color: 'inherit',
      },
      pointer: {
        length: '50%',
        itemStyle: {
          color: 'inherit',
        },
      },
      data: [],
    };
    this.option = {
      color: ['#3a93ff'],
      backgroundColor: 'transparent',
      series: [this.taskSerie, this.timeoutSerie],
    };
  }
  ngOnDestroy() {
    if (this.business.subscription) {
      this.business.subscription.destroy();
    }
  }

  ngAfterViewInit() {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement, 'light');
      this.myChart.setOption(this.option);
    }
  }

  async loadData() {
    let type = EnumHelper.ConvertDivisionToUserResource(
      this.storeService.divisionType
    );

    this.data = await this.business.load(this.storeService.divisionId, type);
    // this.gaugeOption.data = [
    //   { name: '处置率', value: this.data.handledPercentage },
    // ];

    (this.option.series! as any)[0].data[0].value =
      this.data?.handledPercentage;
    (this.option.series! as any)[1].data[0].value =
      this.data?.timeoutRatio.toFixed(0);
    this.myChart.setOption(this.option);
  }
  onResized(e: ResizedEvent) {
    // console.log(e);
    if (this.myChart) {
      this.myChart.resize();
      let h = e.newRect.height;
      let w = e.newRect.width;

      // console.log(e);
      // if (h < 254) {
      //   if (this.gaugeOption.title) {
      //     this.gaugeOption.title.show = false;
      //   }
      // } else {
      //   if (this.gaugeOption.title) {
      //     this.gaugeOption.title.show = true;
      //   }
      // }

      if (w > 134) {
        if (this.gaugeOption.title) {
          this.gaugeOption.title.fontSize = 18;
          this.gaugeOption.title.show = true;
        }
        if (this.gaugeOption.axisLabel) {
          this.gaugeOption.axisLabel.show = true;
        }

        if (h > 140) {
          if (this.gaugeOption.axisLabel) {
            this.gaugeOption.axisLabel.show = true;
          }
          if (this.gaugeOption.detail) {
            this.gaugeOption.detail.rich!.a.fontSize = 30;
            this.gaugeOption.detail.rich!.b.fontSize = 20;
          }
        } else {
          if (this.gaugeOption.axisLabel) {
            this.gaugeOption.axisLabel.show = false;
          }
          if (this.gaugeOption.detail) {
            this.gaugeOption.detail.rich!.a.fontSize = 20;
            this.gaugeOption.detail.rich!.b.fontSize = 16;
          }
        }
        if (h > 107) {
          if (this.gaugeOption.title) {
            this.gaugeOption.title.show = true;
          }
        } else {
          if (this.gaugeOption.title) {
            this.gaugeOption.title.show = false;
          }
        }
      } else if (w < 134 && w > 105) {
        if (this.gaugeOption.title) {
          this.gaugeOption.title.fontSize = 15;
          this.gaugeOption.title.show = true;
        }

        if (this.gaugeOption.axisLabel) {
          this.gaugeOption.axisLabel.show = false;
        }
        if (this.gaugeOption.detail) {
          this.gaugeOption.detail.rich!.a.fontSize = 20;
          this.gaugeOption.detail.rich!.b.fontSize = 16;
        }
        if (h > 92) {
          if (this.gaugeOption.title) {
            this.gaugeOption.title.show = true;
          }
        } else {
          if (this.gaugeOption.title) {
            this.gaugeOption.title.show = false;
          }
        }
      } else if (w < 105) {
        if (this.gaugeOption.title) {
          this.gaugeOption.title.show = false;
        }

        if (this.gaugeOption.axisLabel) {
          this.gaugeOption.axisLabel.show = false;
        }
        if (this.gaugeOption.detail) {
          this.gaugeOption.detail.rich!.a.fontSize = 20;
          this.gaugeOption.detail.rich!.b.fontSize = 16;
        }
        // this.myChart.setOption(this.option);
      }

      this.myChart.setOption(this.option);
    }
  }
  taskClick(item: IDisposalCount) {
    let args: DisposalCountArgs = {
      divisionId: this.storeService.divisionId,
    };
    switch (item.tag) {
      case DisposalCountType.unhandled:
        args.status = GarbageTaskStatus.unhandled;
        break;
      case DisposalCountType.timeout:
        args.status = GarbageTaskStatus.timeout;
        break;
      case DisposalCountType.total:
      default:
        break;
    }
    this.task.emit(args);
  }
}
