import { Component, OnInit } from '@angular/core';
import { ILevelListNode } from 'src/app/common/components/panels/level-list-panel/level-list-panel.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { Language } from 'src/app/common/tools/language';
import { ChartType } from 'src/app/enum/chart-type.enum';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { ExportType } from 'src/app/enum/export-type.enum';
import { GarbageType } from 'src/app/enum/garbage-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';

import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { IObjectModel } from 'src/app/network/model/model.interface';
import { GarbageStationWeightChartConfigBusiness } from './garbage-station-weight-chart-business/garbage-station-weight-chart-config.business';
import { GarbageStationWeightChartDivisionService } from './garbage-station-weight-chart-service/garbage-station-weight-chart-division.service';
import { GarbageStationWeightChartStationService } from './garbage-station-weight-chart-service/garbage-station-weight-chart-station.service';
import { GarbageStationWeightChartBusiness } from './garbage-station-weight-chart.business';
import {
  ChartConfig,
  GarbageStationWeightChartArgs,
  GarbageStationWeightChartDateArgs,
  GarbageStationWeightChartSelected,
} from './garbage-station-weight-chart.model';
import { GarbageStationWeightChartService } from './garbage-station-weight-chart.service';

@Component({
  selector: 'garbage-station-weight-chart',
  templateUrl: './garbage-station-weight-chart.component.html',
  styleUrls: ['./garbage-station-weight-chart.component.less'],
  providers: [
    GarbageStationWeightChartDivisionService,
    GarbageStationWeightChartStationService,
    GarbageStationWeightChartService,
    GarbageStationWeightChartConfigBusiness,
    GarbageStationWeightChartBusiness,
  ],
})
export class GarbageStationWeightChartComponent implements OnInit {
  constructor(
    public business: GarbageStationWeightChartBusiness,
    private global: GlobalStorageService
  ) {}

  args: GarbageStationWeightChartArgs = new GarbageStationWeightChartArgs();
  DateTimePickerView = DateTimePickerView;
  TimeUnit = TimeUnit;
  Language = Language;
  ChartType = ChartType;
  ExportType = ExportType;
  GarbageType = GarbageType;
  // model: BarChartViewModel[] = [];

  dateArgs: GarbageStationWeightChartDateArgs =
    new GarbageStationWeightChartDateArgs();

  divisions?: ILevelListNode;
  stations: GarbageStation[] = [];

  selected = new GarbageStationWeightChartSelected();

  chart?: ChartConfig;

  ngOnInit(): void {
    if (this.global.defaultDivisionId) {
      this.args.id = this.global.defaultDivisionId;
    }
  }

  loadData() {
    this.business.load(this.args).then((x) => {
      this.chart = x;
    });
  }

  async ondivision(item?: IObjectModel) {
    this.selected.station = undefined;
    this.selected.division = undefined;
    if (item) {
      this.selected.division = await this.business.division(item.Id);
      this.stations = [];
      if (
        this.selected.division &&
        this.selected.division.DivisionType === DivisionType.Committees
      ) {
        this.business.stations(this.selected.division.Id).then((x) => {
          this.stations = x;
        });
      }
    }
  }

  onchange() {
    switch (this.args.unit) {
      case TimeUnit.Month:
        this.dateArgs.format = 'yyyy年MM月';
        this.dateArgs.view = DateTimePickerView.year;
        this.dateArgs.isweek = false;
        break;
      case TimeUnit.Week:
        this.dateArgs.format = 'yyyy年MM月dd日';
        this.dateArgs.view = DateTimePickerView.month;
        this.dateArgs.isweek = true;
        break;
      case TimeUnit.Year:
        this.dateArgs.format = 'yyyy年';
        this.dateArgs.view = DateTimePickerView.year;
        this.dateArgs.isweek = false;
        break;
      default:
        break;
    }
    this.loadData();
  }

  onsearch() {
    if (this.selected.station) {
      this.args.id = this.selected.station.Id;
      this.args.type.division = DivisionType.None;
    } else if (this.selected.division) {
      this.args.id = this.selected.division.Id;
      this.args.type.division = this.selected.division.DivisionType;
    } else {
      if (this.global.defaultDivisionId) {
        this.args.id = this.global.defaultDivisionId;
      }
      this.args.type.division = this.global.defaultDivisionType;
    }
    this.loadData();
  }
  async ondownload(type: ExportType) {
    if (this.chart) {
      this.business.download(type, this.args, this.chart.data);
    }
  }
}
