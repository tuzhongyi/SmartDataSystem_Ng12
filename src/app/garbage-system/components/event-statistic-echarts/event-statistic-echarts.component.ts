import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { Division } from 'src/app/network/model/division.model';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { IllegalStatisticBusiness } from './event-statistic-echarts.business';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  EChartsLineModel,
  EChartsLineOption,
} from 'src/app/view-model/echarts-line.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-statistic-echarts',
  templateUrl: './event-statistic-echarts.component.html',
  styleUrls: ['./event-statistic-echarts.component.less'],
  providers: [IllegalStatisticBusiness],
})
export class EvemtStatisticEChartsComponent implements OnInit, OnDestroy {
  public lineOption: EChartsLineOption = new EChartsLineOption();

  public lineChartData: Array<EChartsLineModel> = [];

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  private currentDate = new Date();

  private rawData: EventNumberStatistic[] = [];

  // 在销毁组件时，取消订阅
  private subscription: Subscription | null = null;

  @ViewChild('chartContainer') chartContainer?: ElementRef;
  @Input() title: string = '';
  @Input('type') currentType: EventType = EventType.IllegalDrop;

  constructor(
    private storeService: GlobalStoreService,
    private business: IllegalStatisticBusiness
  ) { }

  ngOnInit(): void {
    this.lineOption.xAxisInterval = [0, 5, 11, 17, 23];
    this.lineOption.title.text = this.title;

    let xAxisData: Array<string> = [];
    for (let i = 1; i < 24; i++) {
      let time = i.toString().padStart(2, '0') + ':00';
      xAxisData.push(time);
    }
    xAxisData.push('23:59');

    this.lineOption.xAxis = {
      type: 'category',
      data: xAxisData,
      axisLine: {
        onZero: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#CFD7FE',
        fontSize: 16,
        interval: (index: number, value: string) => {
          return this.lineOption.xAxisInterval.includes(index);
        },
      },
    };

    this.subscription = this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
    this.storeService.interval.subscribe(x => {
      this.changeStatus();
    })
    this.changeStatus();
  }

  ngOnDestroy() {
    console.log('destroy');
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  changeStatus() {
    // console.log('change status');
    this.divisionId = this.storeService.divisionId;
    this.currentDivisionType = this.storeService.divisionType;

    this.loadData();
  }
  async loadData() {
    this.currentDivision = await this.business.getCurrentDivision(
      this.divisionId
    );
    // console.log('当前区划', this.currentDivision);

    let data = await this.business.statistic(
      this.divisionId,
      TimeUnit.Hour,
      this.currentDate
    );
    if (data) {
      this.rawData = data;
    }
    // console.log('rawData', this.rawData);
    this.lineChartData = this.business.toECharts(
      this.rawData,
      this.currentType
    );
    this.lineOption.legend.data = ['单位(起)'];
    // console.log('lineChartData', this.lineChartData);
  }
}
