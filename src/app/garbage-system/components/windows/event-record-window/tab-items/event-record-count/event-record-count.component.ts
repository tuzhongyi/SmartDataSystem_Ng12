import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import {
  EventRecordCountTableModel,
  EventRecordCountTableOptions,
} from 'src/app/common/components/tables/event-record-count-table/event-record-count-table.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { DivisionType } from 'src/app/enum/division-type.enum';

import { EnumTool } from 'src/app/common/tools/enum-tool/enum.tool';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { EventRecordCountExportConverter } from './event-record-count-export.converter';

@Component({
  selector: 'howell-event-record-count',
  templateUrl: './event-record-count.component.html',
  styleUrls: ['./event-record-count.component.less'],
})
export class EventRecordCountComponent implements OnInit {
  @Input('date') input_date?: Date;
  @Input('unit') input_unit?: TimeUnit;
  @Input('eventType') input_eventType?: EventType;

  constructor(
    private local: LocalStorageService,
    public global: GlobalStorageService,
    private exports: ExportBusiness
  ) {
    this.opts.type = EnumTool.division.child(
      global.division.selected.DivisionType
    );
  }

  config = {
    dateTimePicker: new DateTimePickerConfig({ format: 'yyyy年MM月dd日' }),
  };
  DateTimePickerView = DateTimePickerView;

  opts = new EventRecordCountTableOptions();
  load: EventEmitter<EventRecordCountTableOptions> = new EventEmitter();
  datas: EventRecordCountTableModel[] = [];
  converter = new EventRecordCountExportConverter();
  UserResourceType = UserResourceType;
  DivisionType = DivisionType;
  TimeUnit = TimeUnit;
  Language = Language;
  ngOnInit(): void {
    if (this.input_date) {
      this.opts.date = new Date(this.input_date.getTime());
    }
    if (this.input_unit) {
      this.opts.unit = this.input_unit;
    }
    if (this.input_eventType) {
      this.opts.eventType = this.input_eventType;
    }
  }

  ontimeunit() {
    switch (this.opts.unit) {
      case TimeUnit.Week:
        this.config.dateTimePicker.view = DateTimePickerView.month;
        this.config.dateTimePicker.format = 'yyyy年MM月dd日';
        this.config.dateTimePicker.week = true;
        break;
      case TimeUnit.Day:
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
  }
  search() {
    this.load.emit(this.opts);
  }
  onloaded(datas: EventRecordCountTableModel[]) {
    this.datas = datas;
  }
  private getTitle() {
    let eventType = Language.EventType(this.opts.eventType);
    let date = Language.Date(this.opts.date, this.opts.unit);
    let _userType = EnumTool.resource.from.division(this.opts.type!);
    let userType = Language.UserResourceType(_userType);
    return `${date}${userType}${eventType}总数据`;
  }
  exportExcel() {
    let title = this.getTitle();
    let headers = ['序号', '名称', '行政区', '单位（起）'];
    this.exports.excel(title, headers, this.datas, this.converter);
  }

  exportCSV() {
    let title = this.getTitle();
    let headers = ['序号', '名称', '行政区', '单位（起）'];
    this.exports.csv(title, headers, this.datas, this.converter);
  }
}
