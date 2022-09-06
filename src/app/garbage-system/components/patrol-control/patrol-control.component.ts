import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ImageVideoControlModel,
  PlaybackInterval,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';

import { PatrolControlBusiness } from './patrol-control.business';
import {
  PatrolControlConfig,
  PatrolControlModel,
  PatrolIntervalControl,
} from './patrol-control.model';
import { PlaybackConfigWindowViewModel } from './playback-config-window.model';

@Component({
  selector: 'app-patrol-control',
  templateUrl: './patrol-control.component.html',
  styleUrls: ['./patrol-control.component.less'],
  providers: [PatrolControlBusiness],
})
export class PatrolControlComponent implements OnInit, OnChanges {
  @Input()
  id?: string;
  @Input()
  config: PatrolControlConfig = new PatrolControlConfig();
  @Output()
  close: EventEmitter<void> = new EventEmitter();

  @Output()
  fullscreen: EventEmitter<void> = new EventEmitter();
  @Output()
  onselected: EventEmitter<PatrolControlModel> = new EventEmitter();

  constructor(private business: PatrolControlBusiness) {}
  loading = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.id && this.id) {
      if (this.models && this.models.length > 0) {
        let index = this.models.findIndex((x) => x.id == this.id);
        if (index >= 0) {
          this.selected = this.models[index];
          this.onselected.emit(this.selected);
        }
      }
    }
    if (changes.config) {
      if (this.config.autoplay) {
        this.run();
      } else {
        this.stop();
      }
    }
  }

  OnlineStatus = OnlineStatus;
  models?: PatrolControlModel[];
  selected?: PatrolControlModel;
  index = 0;
  manualCaptureing = false;
  interval = new PatrolIntervalControl();
  playback = new PlaybackConfigWindowViewModel();
  playing?: ImageVideoControlModel;
  toPlayback: EventEmitter<PlaybackInterval> = new EventEmitter();

  async ngOnInit() {
    this.loading = true;
    for (let i = 1; i <= 4; i++) {
      let time = 30 * i;
      let item = new SelectItem(time.toString(), time, time + 's');
      this.interval.times.push(item);
    }

    this.business.manualCaptureEvent.subscribe((x) => {
      this.manualCaptureing = x;
    });
    this.models = await this.business.load();
    this.loading = false;
    if (this.models.length > 0) {
      this.selected = this.models[this.index];
      this.onselected.emit(this.selected);
    }

    if (this.config.autoplay) {
      this.run();
    }

    this.playback.onOkClicked.subscribe((x) => {
      this.onplayback(x);
    });
  }

  async prev(event?: Event) {
    if (this.models) {
      this.index--;
      if (this.index < 0) {
        this.index = this.models.length - 1;
      }
      this.selected = this.models[this.index];
      this.onselected.emit(this.selected);
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }
  async next(event?: Event) {
    if (this.models) {
      this.index++;
      if (this.index >= this.models.length) {
        this.index = 0;
      }
      this.selected = this.models[this.index];
      this.onselected.emit(this.selected);
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }

  async onreflush() {
    if (this.selected) {
      this.selected.media = await this.business.manualCapture(this.selected);
    }
  }
  onfullscreen() {
    this.fullscreen.emit();
  }
  onclose() {
    this.close.emit();
  }

  run() {
    this.interval.runing = true;
    this.interval.handle = setInterval(() => {
      this.next();
    }, this.interval.time * 1000);
  }
  stop() {
    this.interval.runing = false;
    if (this.interval.handle) {
      clearInterval(this.interval.handle);
    }
  }

  timeSelect(item: SelectItem) {
    if (this.config.autoplay) {
      this.interval.time = item.value;
      this.stop();
      this.run();
    }
  }

  openplayback() {
    this.playback.show = true;
  }

  onvideoplayed(video: ImageVideoControlModel) {
    this.playing = video;
    this.playing.fulled = true;
  }
  onvideostoped(video: ImageVideoControlModel) {
    if (this.playing) {
      this.playing.fulled = false;
      this.playing = undefined;
    }
  }

  onplayback(params: DurationParams) {
    if (this.playing) {
      this.toPlayback.emit({
        CameraId: this.playing.cameraId,
        BeginTime: params.BeginTime,
        EndTime: params.EndTime,
      });
    }
  }
}
