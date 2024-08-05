import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import { ITimeData } from 'src/app/common/components/charts/chart.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { IIdNameModel, IModel } from 'src/app/network/model/model.interface';

import { DetailsChartBarController } from './controller/details-chart-bar.controller';
import { DetailsChartDownloadController } from './controller/details-chart-download.controller';
import { DetailsChartHeatmap3DController } from './controller/details-chart-heatmap-3d.controller';
import { DetailsChartLineController } from './controller/details-chart-line.controller';
import { DetailsChartCreater } from './details-chart.creater';
import { DetailsChartProviders } from './details-chart.providers';

@Component({
  selector: 'howell-details-chart',
  templateUrl: './details-chart.component.html',
  styleUrls: ['./details-chart.component.less'],
  providers: [...DetailsChartProviders],
})
export class DetailsChartComponent
  implements OnInit, IComponent<IModel, ITimeData<IModel>[][]>, AfterViewInit
{
  @Input() business!: IBusiness<IModel, ITimeData<IModel>[][]>;
  @Input() eventType: EventType = EventType.None;
  @Input() types?: EventType[];
  @Input() station?: GarbageStation;
  @Input('division') input_division?: IIdNameModel;

  constructor(
    public heatmap3d: DetailsChartHeatmap3DController,
    public heatmap: DetailsChartHeatmap3DController,
    public line: DetailsChartLineController,
    public bar: DetailsChartBarController,
    private download: DetailsChartDownloadController
  ) {}
  division?: IIdNameModel;
  date: Date = new Date();
  unit: TimeUnit = TimeUnit.Hour;
  chartType: ChartType = ChartType.bar;
  config = {
    dateTimePicker: new DateTimePickerConfig({ format: 'yyyy年MM月dd日' }),
  };
  data: ITimeData<IModel>[][] = [];

  get has() {
    return {
      heatmap: this.eventType === EventType.IllegalDrop,
    };
  }

  ChartType = ChartType;
  TimeUnit = TimeUnit;

  private loaded = false;

  ngAfterViewInit(): void {
    this.loaded = true;
    this.loadData();
  }

  async ngOnInit() {
    if (this.input_division) {
      this.division = this.input_division;
    }
    this.heatmap.init(this.eventType, this.date);
    this.heatmap3d.init(this.eventType, this.date);
  }

  async loadData() {
    if (this.loaded === false) return;
    let interval = DetailsChartCreater.Interval(this.date, this.unit);
    let types = this.types ?? [this.eventType];
    let options = {
      stationId: this.station?.Id,
      unit: this.unit,
      begin: interval.params.BeginTime,
      end: interval.params.EndTime,
      divisionId: this.station ? undefined : this.division?.Id,
      type: types,
    };
    this.data = await this.business.load(options);
    this.loadChart();
  }

  loadChart() {
    switch (this.chartType) {
      case ChartType.line:
        this.line.load(
          this.date,
          this.unit,
          this.data,
          this.types ?? [this.eventType]
        );
        break;
      case ChartType.bar:
        this.bar.load(
          this.date,
          this.unit,
          this.data,
          this.types ?? [this.eventType]
        );
        break;
      case ChartType.heatmap:
        this.heatmap.load();
        break;
      case ChartType.heatmap3d:
        this.heatmap3d.load();
        break;
      default:
        break;
    }
  }

  exportExcel() {
    let args = DetailsChartCreater.DetailsChartDownloadArgs(
      this.eventType,
      this.date,
      this.unit,
      this.data,
      this.station,
      this.division,
      this.types
    );

    this.download.excel(args);
  }
  exportCSV() {
    let args = DetailsChartCreater.DetailsChartDownloadArgs(
      this.eventType,
      this.date,
      this.unit,
      this.data,
      this.station,
      this.division,
      this.types
    );
    this.download.csv(args);
  }
  onstation(station?: GarbageStation) {
    this.station = station;
    this.heatmap.onstation(station?.Id);
    this.heatmap3d.onstation(station?.Id);
  }
  ondivision(item?: IIdNameModel) {
    this.division = item;
    this.heatmap.ondivision(item?.Id);
    this.heatmap3d.ondivision(item?.Id);
  }
  ondate(date: Date) {
    this.heatmap.ondate(date, this.unit);
    this.heatmap3d.ondate(date, this.unit);
  }
  onchart() {
    if (
      this.chartType === ChartType.heatmap ||
      this.chartType === ChartType.heatmap3d
    ) {
      switch (this.unit) {
        case TimeUnit.Hour:
        case TimeUnit.Week:
          this.unit = TimeUnit.Month;
          this.ontimeunit();
          break;
        default:
          break;
      }
    }
    this.search();
  }
  ontimeunit() {
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
      case TimeUnit.Year:
        this.config.dateTimePicker.view = DateTimePickerView.decade;
        this.config.dateTimePicker.format = 'yyyy年';
        this.config.dateTimePicker.week = false;
        break;
      default:
        break;
    }
    this.heatmap.ondate(this.date, this.unit);
    this.heatmap3d.ondate(this.date, this.unit);
    this.search();
  }
  search() {
    switch (this.chartType) {
      case ChartType.heatmap:
        this.heatmap.load();
        break;
      case ChartType.heatmap3d:
        this.heatmap3d.load();
        break;
      default:
        this.loadData();
        break;
    }
  }
}
