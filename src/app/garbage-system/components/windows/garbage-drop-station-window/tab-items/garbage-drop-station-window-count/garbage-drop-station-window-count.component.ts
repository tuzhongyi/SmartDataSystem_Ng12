import { Component, EventEmitter, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker.directive';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { Language } from 'src/app/global/tool/language';

@Component({
  selector: 'howell-garbage-drop-station-window-count',
  templateUrl: './garbage-drop-station-window-count.component.html',
  styleUrls: ['./garbage-drop-station-window-count.component.less'],
})
export class GarbageDropStationWindowCountComponent implements OnInit {
  constructor(private local: LocalStorageService) {}

  DateTimePickerView = DateTimePickerView;
  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();
  TimeUnit = TimeUnit;
  units: SelectItem[] = [];
  unit: TimeUnit = TimeUnit.Day;
  date: Date = new Date();
  types: SelectItem[] = [];
  type: UserResourceType = UserResourceType.Committees;
  load: EventEmitter<void> = new EventEmitter();

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
  initUserResourceTypes() {
    this.types.push(
      new SelectItem(
        UserResourceType.Station.toString(),
        UserResourceType.Station,
        Language.UserResourceType(UserResourceType.Station)
      )
    );
    this.types.push(
      new SelectItem(
        UserResourceType.Committees.toString(),
        UserResourceType.Committees,
        Language.UserResourceType(UserResourceType.Committees)
      )
    );
    if (this.local.user.Resources && this.local.user.Resources.length > 0) {
      if (this.local.user.Resources[0].ResourceType === UserResourceType.City) {
        new SelectItem(
          UserResourceType.County.toString(),
          UserResourceType.County,
          Language.UserResourceType(UserResourceType.County)
        );
      }
    }
  }

  ngOnInit(): void {
    this.initUnits();
    this.initUserResourceTypes();
  }

  ontimeunit(unit: SelectItem) {
    this.unit = unit.value;
    switch (this.unit) {
      case TimeUnit.Week:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = true;
        break;
      case TimeUnit.Day:
        this.dateTimePickerConfig.view = DateTimePickerView.month;
        this.dateTimePickerConfig.format = 'yyyy-MM-dd';
        this.dateTimePickerConfig.week = false;
        break;
      case TimeUnit.Month:
        this.dateTimePickerConfig.view = DateTimePickerView.year;
        this.dateTimePickerConfig.format = 'yyyy-MM';
        this.dateTimePickerConfig.week = false;
        break;
      default:
        break;
    }
  }

  changeDate(date: Date) {
    this.date = date;
  }

  onTypeChange(item: SelectItem) {
    this.type = item.value;
  }

  search() {
    this.load.emit();
  }
  exportExcel() {}
  exportCSV() {}
}
