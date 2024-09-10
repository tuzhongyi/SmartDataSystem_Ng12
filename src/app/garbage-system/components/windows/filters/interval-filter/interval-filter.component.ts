import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';

@Component({
  selector: 'howell-interval-filter',
  templateUrl: './interval-filter.component.html',
  styleUrls: ['./interval-filter.component.less'],
})
export class IntervalFilterComponent implements OnInit, OnChanges {
  @Input() model: Duration;
  constructor() {
    this.model = DateTimeTool.allDay(new Date());
  }
  DateTimePickerView = DateTimePickerView;
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {}
}
