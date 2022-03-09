import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as echarts from 'echarts/core';
import { EChartsTheme } from 'src/app/enum/echarts-theme.enum';
import {
  EChartsOption,
  GridComponentOption,
  LegendComponentOption,
  LineSeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { CallbackDataParams, XAXisOption } from 'echarts/types/dist/shared';
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
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { TimeData } from 'src/app/common/components/charts/chart.model';
import { Language } from 'src/app/global/tool/language';

type EChartOptions = echarts.ComposeOption<
  | TitleComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | TooltipComponentOption
  | XAXisOption
>;

@Component({
  selector: 'howell-details-chart',
  templateUrl: './details-chart.component.html',
  styleUrls: ['./details-chart.component.less'],
})
export class DetailsChartComponent
  implements OnInit, IComponent<IModel, TimeData<IModel>[]>, OnChanges
{
  @Input()
  business!: IBusiness<IModel, TimeData<IModel>[]>;
  @Input()
  eventType?: EventType;

  stationId?: string;
  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;
  units: SelectItem[] = [];

  ChartType = ChartType;
  chartType: ChartType = ChartType.line;
  charts: SelectItem[] = [];

  config = {
    line: new LineConfig(this.unit, this.date),
    dateTimePicker: new DateTimePickerConfig(),
  };

  data: TimeData<IModel>[] = [];

  userResourceType: UserResourceType = UserResourceType.None;
  UserResourceType = UserResourceType;

  DivisionType = DivisionType;

  constructor(public local: LocalStorageService) {
    if (local.user.Resources && local.user.Resources.length > 0) {
      this.userResourceType = local.user.Resources[0].ResourceType;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  async ngOnInit() {
    this.initUnits();
    this.initCharts();
    this.loadData();
  }

  async loadData() {
    if (!this.stationId) return;
    let opts: DetailsChartLoadOpts = {
      stationId: this.stationId,
      unit: this.unit,
      date: this.date,
    };
    this.data = await this.business.load(opts);
    if (this.unit === TimeUnit.Hour) {
      let first: TimeData<IModel> = {
        time: new Date(
          this.date.getFullYear(),
          this.date.getMonth(),
          this.date.getDate()
        ),
        value: 0,
      };
      this.data.unshift(first);
    }
    console.log(this.data);
    this.config.line.options = this.config.line.getOption(this.unit, this.date);
    this.config.line.merge = {
      series: [
        {
          type: 'line',
          name: '单位(起)',
          data: this.data.map((x) => x.value),
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
        this.config.dateTimePicker.view = DateTimePickerView.month;
        this.config.dateTimePicker.format = 'yyyy-MM-dd';
        this.config.dateTimePicker.week = true;
        break;
      case TimeUnit.Hour:
        this.config.dateTimePicker.view = DateTimePickerView.month;
        this.config.dateTimePicker.format = 'yyyy-MM-dd';
        this.config.dateTimePicker.week = false;
        break;
      case TimeUnit.Month:
        this.config.dateTimePicker.view = DateTimePickerView.year;
        this.config.dateTimePicker.format = 'yyyy-MM';
        this.config.dateTimePicker.week = false;
        break;
      default:
        break;
    }
    this.loadData();
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
  initCharts() {
    this.charts.push(
      new SelectItem({
        key: ChartType.line.toString(),
        value: ChartType.line,
        language: '折线图',
      })
    );
    this.charts.push(
      new SelectItem({
        key: ChartType.bar.toString(),
        value: ChartType.bar,
        language: '柱状图',
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

  onchartselected(item: SelectItem) {
    this.chartType = item.value;
  }
}

export interface DetailsChartLoadOpts {
  stationId: string;
  date: Date;
  unit: TimeUnit;
}
class LineConfig {
  constructor(unit: TimeUnit, date: Date) {
    this.options = this.getOption(unit, date);
  }

  theme: EChartsTheme = EChartsTheme.adsame;

  getOption(unit: TimeUnit, date: Date): EChartOptions {
    let x = this.getX(unit, date);
    return {
      legend: {
        formatter: function () {
          return '单位(起)';
        },
      },
      title: {
        show: false,
      },
      tooltip: {},
      xAxis: x,
      yAxis: {
        type: 'value',
      },
    };
  }

  options: EChartOptions;

  merge: EChartOptions = {};

  getX(unit: TimeUnit, date: Date): XAXisOption | undefined {
    let interval: IntervalParams;
    switch (unit) {
      case TimeUnit.Hour:
        return {
          mainType: 'xAxis',
          type: 'category',

          data: [
            ...Array.from(
              { length: 25 },
              (v, i) => i.toString().padStart(2, '0') + ':00'
            ),
          ],
        };
      case TimeUnit.Month:
        interval = IntervalParams.allMonth(date);

        return {
          mainType: 'xAxis',
          type: 'category',

          data: [
            ...Array.from(
              {
                length:
                  interval.EndTime.getDate() - interval.BeginTime.getDate() + 1,
              },
              (v, i) => (i + 1).toString() + '日'
            ),
          ],
        };
      case TimeUnit.Week:
        interval = IntervalParams.allWeek(date);

        return {
          mainType: 'xAxis',
          type: 'category',

          data: [...Array.from({ length: 7 }, (v, i) => Language.Week(i + 1))],
        };
      default:
        break;
    }
    return undefined;
  }
}
