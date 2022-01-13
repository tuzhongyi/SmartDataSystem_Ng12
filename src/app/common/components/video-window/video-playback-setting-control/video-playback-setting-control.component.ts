import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
    this.time.begin = new TimeModel(
      parseInt(this.time.end.hour),
      parseInt(this.time.end.minute) - 5,
      parseInt(this.time.end.second)
    );
  }

  changeDate(date: Date) {
    this.date = date;
  }
}
