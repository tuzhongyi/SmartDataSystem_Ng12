import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TimeModel } from 'src/app/common/components/time-control/time-control.model';
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker/date-time-picker.directive';
import { DurationParams } from 'src/app/network/request/IParams.interface';

declare var $: any;

@Component({
  selector: 'app-playback-config',
  templateUrl: './playback-config.component.html',
  styleUrls: ['./playback-config.component.less'],
})
export class PlaybackConfigComponent implements OnInit, AfterViewInit {
  DateTimePickerView = DateTimePickerView;
  endTime: Date = new Date();
  beginTime: Date = new Date();

  time = {
    begin: new TimeModel(),
    end: new TimeModel(),
  };

  form?: FormGroup;

  date: Date = new Date();

  // @ViewChild('begin')
  // beginControl?: ElementRef;
  // @ViewChild('end')
  // endControl?: ElementRef;

  @Output()
  OnOKClicked: EventEmitter<DurationParams> = new EventEmitter();
  @Output()
  OnCancelClicked: EventEmitter<void> = new EventEmitter();

  constructor(private datePipe: DatePipe) {}
  ngAfterViewInit(): void {
    // let begin = this.initTimepicker(this.endControl, this.endTime);
    // let end = this.initTimepicker(this.beginControl, this.beginTime);
    // if (this.beginControl) {
    //   this.beginControl.nativeElement.value = this.datePipe.transform(
    //     this.beginTime,
    //     'HH:mm:ss'
    //   );
    // }
    // if (this.endControl) {
    //   this.endControl.nativeElement.value = this.datePipe.transform(
    //     this.endTime,
    //     'HH:mm:ss'
    //   );
    // }

    this.time.begin = new TimeModel(this.beginTime);
    this.time.end = new TimeModel(this.endTime);
  }

  ngOnInit() {
    this.beginTime.setMinutes(this.endTime.getMinutes() - 5);

    // this.form = new FormGroup({
    //   begin: new FormControl(
    //     this.datePipe.transform(this.beginTime, "HH:mm:ss")
    //   ),
    //   end: new FormControl(this.datePipe.transform(this.endTime, "HH:mm:ss")),
    // });
  }

  initTimepicker(control: ElementRef, time: Date) {
    console.log(control.nativeElement);
    return $(control.nativeElement).timepicker({
      minuteStep: 1,
      showSeconds: true,
      showMeridian: false,
      defaultTime: time.getHours() + ':' + time.getMinutes() + ':' + '00',
    });
  }

  changeDate(date: Date) {
    this.date = date;
  }

  changeBeginTime(date: Date) {
    this.beginTime = date;
  }

  getDate(date: Date, time: string) {
    let split = time.split(':');
    let value = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(split[0]),
      parseInt(split[1]),
      parseInt(split[2])
    );
    return value;
  }

  ok() {
    let begin = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.time.begin.hour.value,
      this.time.begin.minute.value,
      this.time.begin.second.value
    );
    let end = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      this.date.getDate(),
      this.time.end.hour.value,
      this.time.end.minute.value,
      this.time.end.second.value
    );

    this.OnOKClicked.emit({
      BeginTime: begin,
      EndTime: end,
    });
  }

  cancel() {
    this.OnCancelClicked.emit();
  }
}
