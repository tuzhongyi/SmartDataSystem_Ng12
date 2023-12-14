import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
} from '@angular/core';

import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ITimeData } from 'src/app/common/components/charts/chart.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IIdNameModel, IModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { DetailsChartLoadOptions } from './details-chart.model';
import { ChartConfig } from './details-chart.option';

import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { ExportType } from 'src/app/enum/export-type.enum';
import { CommonFlatNode } from 'src/app/view-model/common-flat-node.model';
import { ExportExcelConverter } from './details-chart-export.converter';

@Component({
  selector: 'howell-details-chart',
  templateUrl: './details-chart.component.html',
  styleUrls: ['./details-chart.component.less'],
})
export class DetailsChartComponent
  implements OnInit, IComponent<IModel, ITimeData<IModel>[][]>, AfterViewInit
{
  @Input()
  business!: IBusiness<IModel, ITimeData<IModel>[][]>;
  @Input()
  eventType: EventType = EventType.IllegalDrop;
  @Input()
  types?: EventType[];
  @Input()
  station?: GarbageStation;

  @Input()
  division?: IIdNameModel;

  // private _division?: Division;
  // public get division(): Division | undefined {
  //   if (this._division) {
  //     return this._division;
  //   }
  //   if (this.committees) {
  //     return this.committees
  //   }
  //   else if (this.county) {
  //     return this.county;
  //   }
  //   else {
  //     return undefined;
  //   }
  // }

  // @Input()
  // public set division(v: Division | undefined) {
  //   this._division = v;
  // }

  constructor(
    public local: LocalStorageService,
    private exports: ExportTool,
    global: GlobalStorageService
  ) {
    if (local.user.Resources && local.user.Resources.length > 0) {
      this.userResourceType = local.user.Resources[0].ResourceType;
    }
    this.type = global.defaultDivisionType;
  }
  treeClose: EventEmitter<void> = new EventEmitter();
  selectedNodes: CommonFlatNode[] = [];
  showDropDown: boolean = false;

  options?: DetailsChartLoadOptions;

  treeAlign = HorizontalAlign.left;
  date: Date = new Date();

  unit: TimeUnit = TimeUnit.Hour;
  units: SelectItem[] = [];

  ChartType = ChartType;
  chartType: ChartType = ChartType.bar;
  charts: SelectItem[] = [];

  config = {
    line: new ChartConfig(this.unit, this.date),
    bar: new ChartConfig(this.unit, this.date),
    dateTimePicker: new DateTimePickerConfig({ format: 'yyyy年MM月dd日' }),
  };

  data: ITimeData<IModel>[][] = [];

  userResourceType: UserResourceType = UserResourceType.None;
  UserResourceType = UserResourceType;

  DivisionType = DivisionType;
  type: DivisionType;

  private loaded = false;

  ngAfterViewInit(): void {
    this.loaded = true;
    this.loadData();
  }

  async ngOnInit() {
    this.initUnits();
    this.initCharts();
    // wait(
    //   () => {
    //     return !!this.station || !!this.division;
    //   },
    //   () => {
    //     this.loadData();
    //   }
    // );
  }

  async loadData() {
    if (this.loaded === false) return;
    let interval = this.getInterval();
    let types = this.types ?? [this.eventType];
    this.options = {
      stationId: this.station?.Id,
      unit: this.unit,
      begin: interval.params.BeginTime,
      end: interval.params.EndTime,
      divisionId: this.station ? undefined : this.division?.Id,
      type: types,
    };
    let titles = types.map((x) => {
      switch (x) {
        case EventType.GarbageDrop:
          return '垃圾滞留';
        case EventType.GarbageDropTimeout:
        case EventType.GarbageDropSuperTimeout:
          return '垃圾滞留超时';
        default:
          return Language.EventType(x);
      }
    });
    this.data = await this.business.load(this.options);
    // if (this.unit === TimeUnit.Hour) {
    //   let first: TimeData<IModel> = {
    //     time: new Date(
    //       this.date.getFullYear(),
    //       this.date.getMonth(),
    //       this.date.getDate()
    //     ),
    //     value: 0,
    //   };
    //   this.data.unshift(first);
    // }
    // console.log(this.data);
    switch (this.chartType) {
      case ChartType.line:
        this.config.line.options = this.config.line.getOption(
          this.unit,
          this.date,
          {
            orient: 'vertical',
            right: 0,
            top: 50,
            icon: 'circle',
            textStyle: {
              color: '#fff',
            },
          }
        );
        this.config.line.merge = {
          series: this.data.map((x, i) => {
            let item: any = {
              type: 'line',
              name: titles[i],
              data: x.map((y) => y.value),
              color: ChartConfig.color[i],
              areaStyle: {},
              label: {
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
            return item;
          }),
        };

        break;
      case ChartType.bar:
        this.config.bar.options = this.config.bar.getOption(
          this.unit,
          this.date,
          {
            formatter: function (e) {
              return e;
            },
            orient: 'vertical',
            right: 0,
            top: 50,
            icon: 'circle',
            textStyle: {
              color: '#fff',
            },
          }
        );
        this.config.bar.merge = {
          series: this.data.map((data, i) => {
            let item: any = {
              type: 'bar',
              name: titles[i],
              data: data.map((x) => x.value),
              color: ChartConfig.color[i],
              barWidth: `${32 / this.data.length}px`,
              barMinHeight: 5,
              label: {
                show: true,
                position: 'top',
                fontSize: '16px',
                color: ChartConfig.color[i],
                textBorderWidth: 0,
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
            return item;
          }),
        };

        break;
      default:
        break;
    }
  }

  changeDate(date: Date) {
    this.loadData();
  }

  ondivision(item?: IIdNameModel) {
    this.division = item;
  }

  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
    switch (this.unit) {
      case TimeUnit.Week:
        this.config.dateTimePicker.view = DateTimePickerView.month;
        this.config.dateTimePicker.format = 'yyyy年MM月dd日';
        this.config.dateTimePicker.week = true;
        break;
      case TimeUnit.Hour:
        this.config.dateTimePicker.view = DateTimePickerView.month;
        this.config.dateTimePicker.format = 'yyyy年MM月dd日';
        this.config.dateTimePicker.week = false;
        break;
      case TimeUnit.Month:
        this.config.dateTimePicker.view = DateTimePickerView.year;
        this.config.dateTimePicker.format = 'yyyy年MM月';
        this.config.dateTimePicker.week = false;
        break;
      default:
        break;
    }
    this.loadData();
  }

  initUnits() {
    this.units.push(
      new SelectItem(TimeUnit.Hour.toString(), TimeUnit.Hour, '日报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Week.toString(), TimeUnit.Week, '周报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Month.toString(), TimeUnit.Month, '月报表')
    );
  }
  initCharts() {
    this.charts.push(
      new SelectItem(ChartType.bar.toString(), ChartType.bar, '柱状图')
    );
    this.charts.push(
      new SelectItem(ChartType.line.toString(), ChartType.line, '折线图')
    );
  }

  onStationSelected(station?: GarbageStation) {
    this.station = station;
  }

  onchartselected(item: SelectItem) {
    this.chartType = item.value;
    this.loadData();
  }

  search() {
    this.loadData();
  }

  private getTitle() {
    let type = Language.EventType(this.eventType);
    let name = this.getName();

    let interval = this.getInterval();

    return `${interval.language} ${name} ${type}`;
  }
  private getName() {
    return this.station
      ? this.station.Name
      : this.division
      ? this.division.Name
      : '';
  }
  private getInterval() {
    let interval = {
      params: new DurationParams(),
      language: '',
    };
    switch (this.unit) {
      case TimeUnit.Hour:
      case TimeUnit.Day:
        interval.params = DurationParams.allDay(this.date);
        interval.language = Language.Date(this.date);
        break;
      case TimeUnit.Week:
        interval.params = DurationParams.allWeek(this.date);
        interval.language = Language.Duration(
          interval.params.BeginTime,
          interval.params.EndTime
        );
        break;
      case TimeUnit.Month:
        interval.params = DurationParams.allMonth(this.date);
        interval.language = Language.Duration(
          interval.params.BeginTime,
          interval.params.EndTime
        );
        break;
      default:
        break;
    }
    return interval;
  }

  converter = new ExportExcelConverter();

  toExport(type: ExportType) {
    let title = this.getTitle();

    let headers = ['序号', '日期', '时间'];

    let types = this.types ?? [this.eventType];

    for (let i = 0; i < types.length; i++) {
      headers.push(Language.EventType(types[i]));
    }

    this.exports.export(
      type,
      title,
      headers,
      this.data,
      this.converter,
      this.unit
    );
  }

  exportExcel() {
    this.toExport(ExportType.chart);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }

  ondivisionselect(division: Division) {
    this.division = division;
    this.loadData();
  }
}
