/*
 * @Author: pmx
 * @Date: 2021-11-01 16:41:30
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-02 15:58:14
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { interval, Subscription } from 'rxjs';
import { DivisionType } from 'src/app/enum/division_type.enum';
import { EnumHelper } from 'src/app/enum/enum_helper';
import { UserResourceType } from 'src/app/enum/user_resource_type.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division_number_statistic.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage_station_number_statistic.model';
import { DisposalCountModel } from 'src/app/view-model/disposal_count.model';
import { DisposalCountBusiness } from './disposal_count.business';

// 按需引入 Echarts
import * as echarts from 'echarts/core';

import { TitleComponent, TitleComponentOption } from 'echarts/components';
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, GaugeChart, UniversalTransition, CanvasRenderer]);

type ECOption = echarts.ComposeOption<GaugeSeriesOption | TitleComponentOption>;

@Component({
  selector: 'app-disposal-count',
  templateUrl: './disposal_count.component.html',
  styleUrls: ['./disposal_count.component.less'],
  providers: [DisposalCountBusiness],
})
export class DisposalCountComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  public title: string = '垃圾滞留处置情况';

  public get currentItem() {
    return this.disposalCountData[this.startIndex];
  }
  // 遍历数组开始序号
  private startIndex: number = 0;

  // 在销毁组件时，取消订阅
  private subscription: Subscription | null = null;

  // 数据切换
  private swiperSubscription: Subscription | null = null;

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 下级资源类型
  private childDivisionType!: UserResourceType;

  // 当前区划
  private currentDivision: Division | null = null;

  // 服务器数据
  private rawData: Array<
    DivisionNumberStatistic | GarbageStationNumberStatistic
  > = [];

  private disposalCountData: Array<DisposalCountModel> = [];

  private myChart!: echarts.ECharts;
  private option!: ECOption;
  private gaugeOption!: GaugeSeriesOption;

  @ViewChild('chartContainer') chartContainer?: ElementRef<HTMLElement>;

  constructor(
    private storeService: StoreService,
    private business: DisposalCountBusiness
  ) {}

  ngOnInit(): void {
    this.subscription = this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });

    this.changeStatus();

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
          color: 'auto',
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
        color: 'auto',
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
        color: 'auto',
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
            color: 'auto',
            align: 'center',
            padding: [0, 0, 0, 0],
          },
          b: {
            fontSize: 20,
            fontWeight: 400,
            fontFamily: 'Arial',
            color: 'auto',
            padding: [0, 0, 0, 0],
          },
        },
        fontWeight: 'normal',
        color: 'auto',
      },
      pointer: {
        length: '50%',
        itemStyle: {
          color: 'auto',
        },
      },
      data: [],
    };
    this.option = {
      series: [this.gaugeOption],
    };
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  ngAfterViewInit() {
    if (this.chartContainer) {
      this.myChart = echarts.init(this.chartContainer.nativeElement, 'light');
      this.myChart.setOption(this.option);
    }
  }

  changeStatus() {
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;
    this.childDivisionType = EnumHelper.GetChildType(this.currentDivisionType);

    this.loadData();
  }

  async loadData() {
    // 每次拉取数据先重置状态
    this.rawData = [];

    if (this.swiperSubscription) {
      this.swiperSubscription.unsubscribe();
      this.swiperSubscription = null;
    }

    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    // console.log('当前区划', this.currentDivision);

    let currentDivisionStatistic =
      await this.business.getCurrentDivisionStatistic(this.divisionId);

    this.rawData.push(currentDivisionStatistic);

    let data = await this.business.statistic(
      this.divisionId,
      this.currentDivisionType,
      this.childDivisionType
    );
    if (data) {
      this.rawData = this.rawData.concat(data);
    }
    // console.log('rawData', this.rawData);

    this.disposalCountData = this.business.toDisposalCount<
      DivisionNumberStatistic | GarbageStationNumberStatistic
    >(this.rawData);

    // console.log('disposalCountData', this.disposalCountData);

    // startIndex延后到这里重置
    this.startIndex = 0;

    // console.log(this.currentItem);

    // this.myChart.setOption({
    //   series: [
    //     {
    //       type: 'gauge',
    //       data: [{ name: '处置率', value: this.currentItem.handledPercentage }],
    //     },
    //   ],
    // });

    this.gaugeOption.data = [
      { name: '处置率', value: this.currentItem.handledPercentage },
    ];
    this.myChart.setOption(this.option);

    this.swiperSubscription = interval(10 * 1000).subscribe((n) =>
      this.startIterate()
    );
  }
  startIterate() {
    console.log('startIterate');
    this.startIndex = (this.startIndex + 1) % this.disposalCountData.length;

    this.gaugeOption.data = [
      { name: '处置率', value: this.currentItem.handledPercentage },
    ];
    this.myChart.setOption(this.option);
  }
  onResized(e: ResizedEvent) {
    console.log(e);
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
}
