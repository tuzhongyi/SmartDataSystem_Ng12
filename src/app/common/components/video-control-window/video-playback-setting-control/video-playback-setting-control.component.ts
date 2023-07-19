import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { TimeModel } from '../../time-control/time-control.model';

@Component({
  selector: 'app-video-playback-setting-control',
  templateUrl: './video-playback-setting-control.component.html',
  styleUrls: ['./video-playback-setting-control.component.less'],
})
export class VideoPlaybackSettingControlComponent implements OnInit, OnChanges {
  @Input()
  end: Date = new Date();

  @Input()
  begin: Date = new Date();

  @Input()
  date: Date = new Date();

  time = {
    begin: new TimeModel(),
    end: new TimeModel(),
  };

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.begin) {
      this.time.begin = new TimeModel(this.begin);
    }
    if (changes.end) {
      this.time.end = new TimeModel(this.end);
    }
  }

  ngOnInit(): void {
    let temp = this.time.end.toDate();
    temp.setMinutes(temp.getMinutes() - 5);
    this.time.begin = new TimeModel(temp);
  }

  @Output()
  playback: EventEmitter<DurationParams> = new EventEmitter();
  @Output()
  download: EventEmitter<DurationParams> = new EventEmitter();

  getParams() {
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
    let params = new DurationParams();
    params.BeginTime = begin;
    params.EndTime = end;
    return params;
  }

  playbackclick() {
    this.playback.emit(this.getParams());
  }
  downloadclick() {
    this.download.emit(this.getParams());
  }
}
