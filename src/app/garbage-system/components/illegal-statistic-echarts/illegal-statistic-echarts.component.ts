import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { IllegalStatisticBusiness } from './illegal-statistic-echarts.business';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  EChartsLineModel,
  EChartsLineOption,
} from 'src/app/view-model/echarts-line.model';
import { TooltipComponentOption } from 'echarts';

@Component({
  selector: 'app-illegal-statistic-echarts',
  templateUrl: './illegal-statistic-echarts.component.html',
  styleUrls: ['./illegal-statistic-echarts.component.less'],
  providers: [IllegalStatisticBusiness],
})
export class IllegalStatisticEChartsComponent implements OnInit {
  public lineOption: EChartsLineOption = new EChartsLineOption();
  public eChartsLineModel: EChartsLineModel = new EChartsLineModel();

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  private currentType: EventType = EventType.IllegalDrop;

  private currentDate = new Date();

  private rawData: EventNumberStatistic[] = [];

  @ViewChild('chartContainer') chartContainer?: ElementRef;

  constructor(
    private storeService: StoreService,
    private business: IllegalStatisticBusiness
  ) {}

  ngOnInit(): void {
    this.lineOption.xAxisInterval = [0, 5, 11, 17, 23];
    this.lineOption.title.text = '乱扔垃圾统计表';
    this.lineOption.legend.data = ['单位(起)'];

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

    this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
    this.changeStatus();
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
    this.eChartsLineModel = this.business.toECharts(
      this.rawData,
      this.currentType
    );
  }
}
