import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordCountTableModel } from 'src/app/common/components/tables/event-record-count-table/event-record-count-table.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EnumHelper } from 'src/app/enum/enum-helper';
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
    public global: GlobalStorageService,
    private exports: ExportBusiness
  ) {
    this.userType = EnumHelper.GetResourceChildType(global.defaultResourceType);
  }
  config = {
    dateTimePicker: new DateTimePickerConfig(),
  };
  DateTimePickerView = DateTimePickerView;

  load: EventEmitter<void> = new EventEmitter();
  datas: EventRecordCountTableModel[] = [];
  converter = new EventRecordCountExportConverter();
  UserResourceType = UserResourceType;
  TimeUnit = TimeUnit;
  Language = Language;
  ngOnInit(): void {}

  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
    switch (this.unit) {
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
      default:
        break;
    }
  }
  onresourcetype(item: SelectItem) {
    this.userType = item.value;
  }
  search() {
    this.load.emit();
  }
  onloaded(datas: EventRecordCountTableModel[]) {
    this.datas = datas;
  }
  private getTitle() {
    let eventType = Language.EventType(this.eventType);
    let date = formatDate(this.date, this.config.dateTimePicker.format, 'en');
    let userType = Language.UserResourceType(this.userType);
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
