import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { CallbackDataParams } from 'echarts/types/dist/shared';
import { ExportBusiness } from 'src/app/common/business/export.business';
import {
  ITimeData,
  ITimeDataGroup,
} from 'src/app/common/components/charts/chart.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { TimeDataGroupExportConverter } from 'src/app/converter/exports/time-data-group-exports.converter';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IModel } from 'src/app/network/model/model.interface';
import {
  ChartConfig,
  EChartOptions,
} from '../../../charts/details-chart/details-chart.option';
import { EventRecordComparisonBusiness } from './event-record-comparison.business';
import { EventRecordComparisonOptions } from './EventRecordComparison.model';

@Component({
  selector: 'howell-event-record-comparison',
  templateUrl: './event-record-comparison.component.html',
  styleUrls: ['./event-record-comparison.component.less'],
  providers: [EventRecordComparisonBusiness],
})
export class EventRecordComparisonComponent
  implements OnInit, IComponent<IModel, ITimeDataGroup<number>[]>
{
  @Input()
  date: Date = new Date();
  @Input()
  unit: TimeUnit = TimeUnit.Day;
  @Input()
  userType: UserResourceType = UserResourceType.Station;
  @Input()
  eventType: EventType = EventType.IllegalDrop;

  constructor(
    private local: LocalStorageService,
    private exports: ExportBusiness,
    business: EventRecordComparisonBusiness
  ) {
    this.business = business;
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      this.userType = this.local.user.Resources[0].ResourceType;
    }
  }
  business: IBusiness<IModel, ITimeDataGroup<number>[]>;
  userTypes: SelectItem[] = [];
  DateTimePickerView = DateTimePickerView;
  dateFormat = 'yyyy年MM月dd日';
  units: SelectItem[] = [];
  ChartType = ChartType;
  chartType: ChartType = ChartType.bar;
  chartTypes: SelectItem[] = [];
  load: EventEmitter<void> = new EventEmitter();
  config: EventRecordComparisonComponentConfig = {};
  datas?: ITimeDataGroup<number>[];
  selectIds?: string[];
  echartsLegend: LegendComponentOption = {
    show: true,
    right: '50px',
    icon: '',
    orient: 'vertical',
    textStyle: {
      fontSize: 16,
    },
  };

  ngOnInit(): void {
    this.initUnits();
    this.initChartTypes();
    this.initUserTypes();
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
  initChartTypes() {
    this.chartTypes.push(
      new SelectItem(
        ChartType.bar.toString(),
        ChartType.bar,
        Language.ChartType(ChartType.bar)
      )
    );
    this.chartTypes.push(
      new SelectItem(
        ChartType.line.toString(),
        ChartType.line,
        Language.ChartType(ChartType.line)
      )
    );
  }
  initUserTypes() {
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      if (this.local.user.Resources[0].ResourceType == UserResourceType.City) {
        this.userTypes.push(
          new SelectItem(
            UserResourceType.County.toString(),
            UserResourceType.County,
            Language.UserResourceType(UserResourceType.County)
          )
        );
      }
    }
    this.userTypes.push(
      new SelectItem(
        UserResourceType.Committees.toString(),
        UserResourceType.Committees,
        Language.UserResourceType(UserResourceType.Committees)
      )
    );
    this.userTypes.push(
      new SelectItem(
        UserResourceType.Station.toString(),
        UserResourceType.Station,
        Language.UserResourceType(UserResourceType.Station)
      )
    );
  }

  async loadData() {
    if (!this.selectIds || this.selectIds.length <= 0) return;
    let opts: EventRecordComparisonOptions = {
      userType: this.userType,
      eventType: this.eventType,
      unit: this.unit,
      date: this.date,
      ids: this.selectIds,
    };
    this.datas = await this.business.load(opts);
    this.load.emit();

    let merge: EChartOptions = this.getEChartsMerge(this.chartType, this.datas);
    this.config.line = undefined;
    this.config.bar = undefined;
    switch (this.chartType) {
      case ChartType.line:
        this.config.line = new ChartConfig(
          this.unit,
          this.date,
          this.echartsLegend,
          merge
        );
        break;
      case ChartType.bar:
        this.config.bar = new ChartConfig(
          this.unit,
          this.date,
          this.echartsLegend,
          merge
        );
        break;
      default:
        break;
    }
  }

  getEChartsMerge(
    type: ChartType,
    datas: ITimeDataGroup<number>[]
  ): EChartOptions {
    switch (type) {
      case ChartType.line:
        return {
          series: datas.map((data, i) => {
            return {
              type: 'line',
              name: data.Name,
              data: data.datas.map((x) => x.value),
              areaStyle: {},
              label: {
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
      case ChartType.bar:
      default:
        return {
          series: datas.map((data, i) => {
            return {
              type: 'bar',
              name: data.Name,
              data: data.datas.map((x) => x.value),
              barWidth: '15px',
              barMinHeight: 5,
              label: {
                show: true,
                position: 'top',
                color: ChartConfig.color[i],
                fontSize: '16px',
                textBorderWidth: 0,
                formatter: (params: CallbackDataParams) => {
                  return params.value.toString();
                },
              },
            };
          }),
        };
    }
  }

  changeDate(date: Date) {
    this.date = date;
  }
  ontimeunit(item: SelectItem) {
    this.unit = item.value;
    this.loadData();
  }
  oncharttype(item: SelectItem) {
    this.chartType = item.value;
    this.loadData();
  }
  onusertype(item: SelectItem) {
    this.userType = item.value;
  }

  onTreeSelect(ids: string[]) {
    this.selectIds = ids;
  }

  search() {
    this.loadData();
  }

  converter = new TimeDataGroupExportConverter();
  getTitle() {
    let title = formatDate(this.date, 'yyyy年MM月dd日', 'en');
    if (this.datas) {
      for (let i = 0; i < this.datas.length; i++) {
        const data = this.datas[i];
        title += ' ' + data.Name;
      }
    }
    title += ' ' + Language.EventType(this.eventType);
    title += ' 数据比较';
    return title;
  }

  toExport(type: ExportType) {
    if (!this.datas) {
      return;
    }
    let title = this.getTitle();
    let headers = ['序号', '日期'];
    switch (this.unit) {
      case TimeUnit.Hour:
      case TimeUnit.Week:
        headers.push('时间');
        break;

      default:
        break;
    }

    for (let i = 0; i < this.datas.length; i++) {
      const data = this.datas[i];
      headers.push(data.Name);
    }
    this.exports.export(
      type,
      title,
      headers,
      this.datas,
      this.converter,
      this.unit
    );
  }

  exportExcel() {
    this.toExport(ExportType.excel);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }
}

interface EventRecordComparisonComponentConfig {
  line?: ChartConfig;
  bar?: ChartConfig;
}
