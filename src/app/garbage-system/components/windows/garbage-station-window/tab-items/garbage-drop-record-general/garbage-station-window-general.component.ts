import { Component, EventEmitter, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { GarbageStationStatisticModel } from 'src/app/common/components/tables/garbage-station-statistic-table/garbage-station-statistic.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { Language } from 'src/app/common/tools/language';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { ExportType } from 'src/app/enum/export-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IIdNameModel } from 'src/app/network/model/model.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { GarbageStationWindowGeneralExportConverter } from './garbage-station-window-general-export.converter';

@Component({
  selector: 'howell-garbage-station-window-general',
  templateUrl: './garbage-station-window-general.component.html',
  styleUrls: ['./garbage-station-window-general.component.less'],
})
export class GarbageStationWindowGeneralComponent implements OnInit {
  constructor(private exports: ExportBusiness) {
    this.dateTimePickerConfig = new DateTimePickerConfig();
    this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
  }

  DateTimePickerView = DateTimePickerView;
  dateTimePickerConfig: DateTimePickerConfig;
  TimeUnit = TimeUnit;

  units: SelectItem[] = [];
  unit: TimeUnit = TimeUnit.Day;
  date: Date = new Date();
  treeAlign = HorizontalAlign.left;
  division?: Division;
  filterId?: string;
  load: EventEmitter<void> = new EventEmitter();
  datas?: GarbageStationStatisticModel[];

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
    this.unit = TimeUnit.Hour;
  }

  ngOnInit(): void {
    this.initUnits();
  }

  ontimeunit() {
    switch (this.unit) {
      case TimeUnit.Week:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
        this.dateTimePickerConfig.week = true;
        break;
      case TimeUnit.Month:
        this.dateTimePickerConfig.view = DateTimePickerView.year;
        this.dateTimePickerConfig.format = 'yyyy年MM月';
        this.dateTimePickerConfig.week = false;
        break;
      case TimeUnit.Hour:
      case TimeUnit.Day:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy年MM月dd日';
        this.dateTimePickerConfig.week = false;
        break;
      default:
        break;
    }
  }

  ondivision(item?: IIdNameModel) {
    this.filterId = item?.Id;
  }

  search() {
    this.load.emit();
  }

  loaded(datas: GarbageStationStatisticModel[]) {
    this.datas = datas;
  }

  converter = new GarbageStationWindowGeneralExportConverter();

  getTitle() {
    let title = '';
    switch (this.unit) {
      case TimeUnit.Day:
      case TimeUnit.Hour:
        title = Language.Date(this.date);
        break;
      default:
        let duration = DurationParams.TimeUnit(this.unit, this.date);
        title = Language.Duration(duration.BeginTime, duration.EndTime);
        break;
    }

    title += ' 投放点';

    if (this.unit) {
      title += ' ' + Language.TimeUnit(this.unit);
    }
    return title;
  }

  toExport(type: ExportType) {
    if (!this.datas) return;
    let title = this.getTitle();
    let headers = [
      '序号',
      '名称',
      '居委会',
      '社区名称',
      '街道',
      '达标率',
      '平均滞留时长',
      '最大滞留时长',
      '总滞留时长',
      '垃圾落地',
      '混合投放',
    ];
    this.exports.export(type, title, headers, this.datas, this.converter);
  }

  exportExcel() {
    this.toExport(ExportType.excel);
  }
  exportCSV() {
    this.toExport(ExportType.csv);
  }
}
