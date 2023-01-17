import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { EventRecordCountTableModel } from 'src/app/common/components/tables/event-record-count-table/event-record-count-table.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { EventType } from 'src/app/enum/event-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { Language } from 'src/app/common/tools/language';
import { EventRecordCountExportConverter } from './event-record-count-export.converter';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EnumHelper } from 'src/app/enum/enum-helper';

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
    private global: GlobalStorageService,
    private exports: ExportBusiness
  ) {
    if (local.user.Resources && local.user.Resources.length > 0) {
      this.userType = local.user.Resources[0].ResourceType;
    }
  }

  DateTimePickerView = DateTimePickerView;
  dateFormat = 'yyyy年MM月dd日';
  units: SelectItem[] = [];
  userTypes: SelectItem[] = [];
  load: EventEmitter<void> = new EventEmitter();
  datas: EventRecordCountTableModel[] = [];
  converter = new EventRecordCountExportConverter();
  ngOnInit(): void {
    this.initUnits();
    this.initUserResourceType();
  }

  initUnits() {
    this.units.push(
      new SelectItem(TimeUnit.Day.toString(), TimeUnit.Day, '日报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Week.toString(), TimeUnit.Week, '周报表')
    );
    this.units.push(
      new SelectItem(TimeUnit.Month.toString(), TimeUnit.Month, '月报表')
    );
  }
  initUserResourceType() {
    let type = EnumHelper.ConvertDivisionToUserResource(
      this.global.divisionType
    );
    if (type == UserResourceType.City) {
      this.userTypes.push(
        new SelectItem(
          UserResourceType.County.toString(),
          UserResourceType.County,
          Language.UserResourceType(UserResourceType.County)
        )
      );
    }

    for (
      let i = UserResourceType.Committees;
      i <= UserResourceType.Station;
      i++
    ) {
      this.userTypes.push(
        new SelectItem(i.toString(), i, Language.UserResourceType(i))
      );
    }
  }

  changeDate(date: Date) {
    this.date = date;
  }
  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
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
    let date = formatDate(this.date, this.dateFormat, 'en');
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
