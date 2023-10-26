import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';
import {
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import * as echarts from 'echarts/core';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventStatisticConverter } from 'src/app/converter/event-statistic.converter';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { EventStatisticBusiness } from './event-statistic.business';

type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | TooltipComponentOption
>;

@Component({
  selector: 'howell-event-statistic',
  templateUrl: './event-statistic.component.html',
  styleUrls: ['./event-statistic.component.less'],
  providers: [EventStatisticBusiness],
})
export class EventStatisticComponent implements OnInit, AfterViewInit {
  @Input() load?: EventEmitter<void>;

  // 当前区划id
  private divisionId: string = '';

  // 当前区划类型
  private currentDivisionType: DivisionType = DivisionType.None;

  // 当前区划
  private currentDivision: Division | null = null;

  private currentDate = new Date();

  private _seriesStep: number = 4;

  @Input('type') currentType: EventType = EventType.IllegalDrop;
  @Input() title: string = '';

  theme: EChartsTheme = EChartsTheme.adsame;

  options: EChartOptions = {
    legend: {
      formatter: function () {
        return '单位(起)';
      },
    },
    tooltip: {},
    title: {
      text: this.title,
    },
    xAxis: {
      mainType: 'xAxis',
      type: 'category',

      data: [
        ...Array.from(
          { length: 25 },
          (v, i) => i.toString().padStart(2, '0') + ':00'
        ),
      ],
    },
    yAxis: {
      type: 'value',
    },
  };
  merge: EChartOptions = {};
  constructor(
    private _storeService: GlobalStorageService,
    private _business: EventStatisticBusiness,
    private _converter: EventStatisticConverter
  ) {}

  ngOnInit(): void {
    if (this.load) {
      this.load.subscribe((x) => {
        this._changeData();
      });
    }
    this._changeData();
    this.options.title = {
      text: this.title,
    };
  }
  ngAfterViewInit(): void {}

  private _changeData() {
    this.divisionId = this._storeService.divisionId;
    this.currentDivisionType = this._storeService.divisionType;

    this._loadData();
  }

  private async _loadData() {
    this.currentDivision = await this._business.getCurrentDivision(
      this.divisionId
    );
    let data = await this._business.loadData(
      this.divisionId,
      TimeUnit.Hour,
      this.currentDate
    );

    let res = data.map((v) => {
      return this._converter.Convert(v, this.currentType);
    });
    res.unshift(0);

    let max = Math.max(...res);

    this.merge = {
      series: [
        {
          type: 'line',
          name: '单位(起)',
          data: res,
          areaStyle: {},
          label: {
            formatter: (params: CallbackDataParams) => {
              if (params.value == max) return params.value.toString();
              if (params.dataIndex % this._seriesStep !== 0) {
                return '';
              }
              return params.value.toString();
            },
          },
        },
      ],
    };
  }
}
