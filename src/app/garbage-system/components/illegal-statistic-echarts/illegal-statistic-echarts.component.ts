import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { Division } from 'src/app/network/model/division.model';
import { EventNumberStatistic } from 'src/app/network/model/event-number-statistic.model';
import { IllegalStatisticBusiness } from './illegal-statistic-echarts.business';
import { EventType } from 'src/app/enum/event-type.enum';
import { EChartsLineModel, LineOption } from 'src/app/view-model/echarts.model';

@Component({
  selector: 'app-illegal-statistic-echarts',
  templateUrl: './illegal-statistic-echarts.component.html',
  styleUrls: ['./illegal-statistic-echarts.component.less'],
  providers: [IllegalStatisticBusiness],
})
export class IllegalStatisticEChartsComponent implements OnInit {
  public lineOption: LineOption = new LineOption();
  public eChartsLineModel: EChartsLineModel = new EChartsLineModel();

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  private currentDate = new Date();

  private rawData: EventNumberStatistic[] = [];

  @ViewChild('chartContainer') chartContainer?: ElementRef;

  constructor(
    private storeService: StoreService,
    private business: IllegalStatisticBusiness
  ) {
    this.lineOption.title.text = '乱扔垃圾统计表';
    this.lineOption.xAxisInterval = [0, 5, 11, 17, 23];
    console.log(this.lineOption.tooltip);
    new LineOption().tooltip;
  }

  ngOnInit(): void {
    this.storeService.statusChange.subscribe(() => {
      this.changeStatus();
    });
    this.changeStatus();
  }

  changeStatus() {
    console.log('change status');
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
    console.log('rawData', this.rawData);
    this.eChartsLineModel = this.business.toECharts(
      this.rawData,
      EventType.IllegalDrop
    );
    console.log('eChartsLineModel', this.eChartsLineModel);
  }
}

new LineOption().tooltip;
