import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import {
  EChartsOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { IModel } from 'src/app/network/model/model.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker.directive';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | TooltipComponentOption
>;

@Component({
  selector: 'howell-details-chart',
  templateUrl: './details-chart.component.html',
  styleUrls: ['./details-chart.component.less'],
})
export class DetailsChartComponent
  implements OnInit, IComponent<IModel, number[]>, OnChanges
{
  @Input()
  business!: IBusiness<IModel, number[]>;

  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();

  stationId?: string;
  date: Date = new Date();
  unit: TimeUnit = TimeUnit.Day;

  units: SelectItem[] = [];

  theme: EChartsTheme = EChartsTheme.adsame;
  options: EChartOptions = {
    legend: {
      formatter: function () {
        return '单位(起)';
      },
    },
    tooltip: {},
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

  data: number[] = [];

  DivisionType = DivisionType;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  async ngOnInit() {
    this.initUnits();
    this.loadData();
  }

  async loadData() {
    if (!this.stationId) return;
    debugger;
    let opts: DetailsChartLoadOpts = {
      stationId: this.stationId,
      unit: this.unit,
      date: this.date,
    };
    this.data = await this.business.load(opts);
    this.merge = {
      series: [
        {
          type: 'line',
          name: '单位(起)',
          data: this.data,
          areaStyle: {},
          label: {
            formatter: (params: CallbackDataParams) => {
              return params.value.toString();
            },
          },
        },
      ],
    };
  }

  changeDate(date: Date) {
    this.date = date;
    this.loadData();
  }

  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
    switch (this.unit) {
      case TimeUnit.Week:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = true;
        break;
      case TimeUnit.Day:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = false;
        break;
      case TimeUnit.Month:
        this.dateTimePickerConfig.view = DateTimePickerView.year;
        this.dateTimePickerConfig.format = 'yyyy-MM';
        this.dateTimePickerConfig.week = false;
        break;
      default:
        break;
    }
  }

  initUnits() {
    this.units.push(
      new SelectItem({
        key: TimeUnit.Hour.toString(),
        value: TimeUnit.Hour,
        language: '日报表',
      })
    );
    this.units.push(
      new SelectItem({
        key: TimeUnit.Week.toString(),
        value: TimeUnit.Week,
        language: '周报表',
      })
    );
    this.units.push(
      new SelectItem({
        key: TimeUnit.Month.toString(),
        value: TimeUnit.Month,
        language: '月报表',
      })
    );
  }

  county?: Division;
  committees?: Division;

  onCountySelected(division: Division) {
    this.county = division;
  }

  onCommitteesSelected(division: Division) {
    this.committees = division;
  }

  onStationSelected(station: GarbageStation) {
    this.stationId = station.Id;
    this.loadData();
  }
}

export interface DetailsChartLoadOpts {
  stationId: string;
  date: Date;
  unit: TimeUnit;
}
