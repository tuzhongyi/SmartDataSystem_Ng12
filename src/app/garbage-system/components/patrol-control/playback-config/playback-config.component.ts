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
import { DateTimePickerView } from 'src/app/common/directives/date-time-picker.directive';
import { IntervalParams } from 'src/app/network/request/IParams.interface';

declare var $: any;

@Component({
  selector: 'app-playback-config',
  templateUrl: './playback-config.component.html',
  styleUrls: ['./playback-config.component.css'],
})
export class PlaybackConfigComponent implements OnInit, AfterViewInit {
  DateTimePickerView = DateTimePickerView;
  endTime: Date = new Date();
  beginTime: Date = new Date();

  form?: FormGroup;

  date: Date = new Date();

  @ViewChild('begin')
  beginControl?: ElementRef;
  @ViewChild('end')
  endControl?: ElementRef;

  @Output()
  OnOKClicked: EventEmitter<IntervalParams> = new EventEmitter();
  @Output()
  OnCancelClicked: EventEmitter<void> = new EventEmitter();

  constructor(private datePipe: DatePipe) {}
  ngAfterViewInit(): void {
    // let begin = this.initTimepicker(this.endControl, this.endTime);
    // let end = this.initTimepicker(this.beginControl, this.beginTime);
    if (this.beginControl) {
      this.beginControl.nativeElement.value = this.datePipe.transform(
        this.beginTime,
        'HH:mm:ss'
      );
    }
    if (this.endControl) {
      this.endControl.nativeElement.value = this.datePipe.transform(
        this.endTime,
        'HH:mm:ss'
      );
    }
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
    if (this.beginControl) {
      this.beginTime = this.getDate(
        this.date,
        this.beginControl.nativeElement.value
      );
    }
    if (this.endControl) {
      this.endTime = this.getDate(
        this.date,
        this.endControl.nativeElement.value
      );
      this.OnOKClicked.emit({
        BeginTime: this.beginTime,
        EndTime: this.endTime,
      });
    }
  }

  cancel() {
    this.OnCancelClicked.emit();
  }
}
