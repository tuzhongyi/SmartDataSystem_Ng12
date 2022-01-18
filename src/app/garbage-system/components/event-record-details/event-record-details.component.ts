import { Component, OnInit } from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { EventType } from 'src/app/enum/event-type.enum';

@Component({
  selector: 'app-event-record-details',
  templateUrl: './event-record-details.component.html',
  styleUrls: ['./event-record-details.component.less'],
})
export class EventRecordDetailsComponent implements OnInit {
  DateTimePickerView = DateTimePickerView;

  type: EventType = EventType.IllegalDrop;

  constructor() {}

  ngOnInit(): void {}

  date: Date = new Date();
  changeDate(date: Date) {
    this.date = date;
  }

  display = {
    filter: true,
  };
}
