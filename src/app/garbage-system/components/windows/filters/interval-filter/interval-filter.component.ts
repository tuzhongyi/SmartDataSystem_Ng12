import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Component({
  selector: 'howell-interval-filter',
  templateUrl: './interval-filter.component.html',
  styleUrls: ['./interval-filter.component.less'],
})
export class IntervalFilterComponent implements OnInit, OnChanges {
  @Input() model: DurationParams = new DurationParams();
  constructor() {}
  DateTimePickerView = DateTimePickerView;
  ngOnChanges(changes: SimpleChanges): void {
    let interval = DurationParams.allDay(new Date());
    this.model.BeginTime = interval.BeginTime;
    this.model.EndTime = interval.EndTime;
  }

  ngOnInit(): void {}
}
