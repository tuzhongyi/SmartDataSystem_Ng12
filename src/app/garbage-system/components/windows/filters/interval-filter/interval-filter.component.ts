import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Component({
  selector: 'howell-interval-filter',
  templateUrl: './interval-filter.component.html',
  styleUrls: ['./interval-filter.component.less'],
})
export class IntervalFilterComponent implements OnInit, OnChanges {
  DateTimePickerView = DateTimePickerView;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    let interval = DurationParams.allDay(new Date());
    this.model.BeginTime = interval.BeginTime;
    this.model.EndTime = interval.EndTime;
  }

  @Input()
  model: DurationParams = new DurationParams();

  ngOnInit(): void {}
}
