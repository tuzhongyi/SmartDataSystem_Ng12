import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LegendComponentOption } from 'echarts';
import { ToastrService } from 'ngx-toastr';
import { ITimeDataGroup } from 'src/app/common/components/charts/chart.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { ExportTool } from 'src/app/common/tools/export.tool';
import { Language } from 'src/app/common/tools/language';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { Enum } from 'src/app/enum/enum-helper';
import { ExportType } from 'src/app/enum/export-type.enum';
import { SelectStrategy } from 'src/app/enum/select-strategy.enum';
import { StatisticType } from 'src/app/enum/statistic-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { IModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { TimeDataGroupExportConverter } from '../../../../../../converter/exports/time-data-group-exports.converter';
import {
  ChartConfig,
  EChartOptions,
} from '../../../charts/details-chart/details-chart.option';
import { GarbageStationWindowDetailsBusiness } from './garbage-station-window-details.business';
import {
  GarbageStationDetailsChartOptions,
  StationSelection,
} from './garbage-station-window-details.model';

@Component({
  selector: 'howell-garbage-station-window-details',
  templateUrl: './garbage-station-window-details.component.html',
  styleUrls: ['./garbage-station-window-details.component.less'],
  providers: [GarbageStationWindowDetailsBusiness],
})
export class GarbageStationWindowDetailsComponent
  implements OnInit, IComponent<IModel, ITimeDataGroup<number>[]>
{
  @Input()
  business: IBusiness<IModel, ITimeDataGroup<number>[]>;
  constructor(
    business: GarbageStationWindowDetailsBusiness,
    private exports: ExportTool,
    private toastrService: ToastrService
  ) {
    this.business = business;
  }
  readonly maxItem = 5;
  opts = new GarbageStationDetailsChartOptions();

  types: StatisticType[] = [];
  units: TimeUnit[] = [];
  chartType: ChartType = ChartType.bar;
  chartTypes: ChartType[] = [];
  config: GarbageStationWindowDetailsComponentConfig = {};
  selection = new StationSelection();
  DivisionType = DivisionType;
  SelectStrategy = SelectStrategy;
  Language = Language;
  ChartType = ChartType;
  dateFormat: string = 'yyyy年MM月dd日';
  datas: ITimeDataGroup<number>[] = [];
  echartsLegend: LegendComponentOption = {
    show: true,
    right: '50px',
    top: '30px',
    icon: '',
    orient: 'vertical',
    textStyle: {
      fontSize: 16,
    },
  };

  ngOnInit(): void {
    this.initType();
    this.initUnits();
    this.initChartTypes();
    this.selection.select.subscribe((x) => {
      this.opts.stationIds = x.map((station) => station.Id);
      if (this.opts.stationIds.length > this.maxItem) {
        this.toastrService.warning(`最多查看个${this.maxItem}对象`);
      }
    });
  }
  async loadData() {
    if (this.opts.stationIds.length <= 0) return;
    this.datas = await this.business.load(this.opts);
    this.loadChart();
  }

  loadChart() {
    let merge: EChartOptions = this.getEChartsMerge(this.chartType, this.datas);
    this.config.line = undefined;
    this.config.bar = undefined;
    switch (this.chartType) {
      case ChartType.line:
        this.config.line = new ChartConfig(
          this.opts.unit,
          this.opts.date,
          this.echartsLegend,
          merge
        );
        break;
      case ChartType.bar:
        this.config.bar = new ChartConfig(
          this.opts.unit,
          this.opts.date,
          this.echartsLegend,
          merge
        );
        break;
      default:
        break;
    }
  }

  getEChartsFormatter(value = 'value') {
    let formatter = `{${value}} `;
    switch (this.opts.type) {
      case StatisticType.garde:
        formatter += '分';
        break;
      case StatisticType.garbageDuration:
      case StatisticType.avgGarbageTime:
      case StatisticType.maxGarbageTime:
        formatter += '分钟';
        break;
      case StatisticType.illegalDrop:
      case StatisticType.mixedInto:
        formatter += '起';
        break;
      default:
        break;
    }
    return formatter;
  }

  getEChartsMerge(
    type: ChartType,
    datas: ITimeDataGroup<number>[]
  ): EChartOptions {
    switch (type) {
      case ChartType.line:
        return {
          yAxis: {
            axisLabel: {
              show: true,
              formatter: this.getEChartsFormatter(),
            },
          },
          series: datas.map((data, i) => {
            return {
              type: 'line',
              name: data.Name,
              data: data.datas.map((x) => x.value),
              areaStyle: {},
              label: {
                formatter: '',
              },
            };
          }),
        };
      case ChartType.bar:
      default:
        return {
          grid: {
            top: '120px',
          },
          yAxis: {
            axisLabel: {
              show: true,
              formatter: this.getEChartsFormatter(),
            },
          },
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
                formatter: '',
              },
            };
          }),
        };
    }
  }

  initType() {
    let _enum = new Enum(StatisticType);
    this.types = _enum.getValues().map((x) => parseInt(x));
  }
  initUnits() {
    this.units = [TimeUnit.Week, TimeUnit.Month];
  }
  initChartTypes() {
    this.chartTypes = [ChartType.bar, ChartType.line];
  }

  search() {
    if (this.opts.stationIds.length <= 0) {
      // MessageBar.response_warning(`请选择要查看的对象`);
      this.toastrService.warning('请选择要查看的对象');
      return;
    }
    if (this.opts.stationIds.length > this.maxItem) {
      this.toastrService.warning(`最多查看个${this.maxItem}对象`);

      return;
    }
    this.loadData();
  }

  converter = new TimeDataGroupExportConverter();

  getTitle() {
    let duration = DurationParams.TimeUnit(this.opts.unit, this.opts.date);
    let begin = formatDate(duration.BeginTime, 'yyyy年MM月dd日', 'en');
    let end = formatDate(duration.EndTime, 'yyyy年MM月dd日', 'en');
    let title = `${begin} 至 ${end}`;
    for (let i = 0; i < this.datas.length; i++) {
      const data = this.datas[i];
      title += ' ' + data.Name;
    }
    title += ' ' + Language.StatisticType(this.opts.type);
    return title;
  }

  toExport(type: ExportType) {
    let title = this.getTitle();
    let headers = ['序号', '日期']; //, '时间', this.getName()
    if (this.opts.unit === TimeUnit.Week) {
      headers.push('时间');
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
      this.opts.unit
    );
  }

  exportExcel() {
    this.toExport(ExportType.chart);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }
}

interface GarbageStationWindowDetailsComponentConfig {
  line?: ChartConfig;
  bar?: ChartConfig;
}
