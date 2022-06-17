import { Component, EventEmitter, OnInit } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import {
  DateTimePickerConfig,
  DateTimePickerView,
} from 'src/app/common/directives/date-time-picker.directive';
import { HorizontalAlign } from 'src/app/enum/direction.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/division.model';

@Component({
  selector: 'howell-garbage-station-window-general',
  templateUrl: './garbage-station-window-general.component.html',
  styleUrls: ['./garbage-station-window-general.component.less'],
})
export class GarbageStationWindowGeneralComponent implements OnInit {
  constructor() {}

  DateTimePickerView = DateTimePickerView;
  dateTimePickerConfig: DateTimePickerConfig = new DateTimePickerConfig();
  TimeUnit = TimeUnit;

  units: SelectItem[] = [];
  unit: TimeUnit = TimeUnit.Day;
  date: Date = new Date();
  treeAlign = HorizontalAlign.left;
  division?: Division;
  filterId?: string;
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

  ngOnInit(): void {
    this.initUnits();
  }

  changeDate(date: Date) {
    this.date = date;
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

  ondivisionselect(division: Division) {
    this.division = division;
    this.filterId = this.division.Id;
  }

  search() {
    this.load.emit();
  }
}
