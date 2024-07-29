import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { GarbageDropRecordFilter } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { IIdNameModel } from 'src/app/network/model/model.interface';

@Component({
  selector: 'garbage-drop-window-item-task',
  templateUrl: './garbage-drop-window-item-task.component.html',
  styleUrls: ['./garbage-drop-window-item-task.component.less'],
})
export class GarbageDropStationWindowItemTaskComponent implements OnInit {
  @Input() filter: GarbageDropRecordFilter = new GarbageDropRecordFilter();
  constructor() {}

  isfilter = false;
  sameDay = true;
  load: EventEmitter<GarbageDropRecordFilter> = new EventEmitter();
  DateTimePickerView = DateTimePickerView;
  ngOnInit(): void {}
  onsearch() {
    this.load.emit(this.filter);
  }
  changeBegin(date: Date) {
    if (this.sameDay && date.getDate() != this.filter.duration.end.getDate()) {
      let end = new Date(this.filter.duration.end.getTime());
      end.setDate(date.getDate());
      this.filter.duration.end = end;
    }
  }
  changeEnd(date: Date) {
    if (
      this.sameDay &&
      date.getDate() != this.filter.duration.begin.getDate()
    ) {
      let begin = new Date(this.filter.duration.begin.getTime());
      begin.setDate(date.getDate());
      this.filter.duration.begin = begin;
    }
  }
  ondivision(item?: IIdNameModel) {
    this.filter.divisionId = item?.Id;
  }
}
