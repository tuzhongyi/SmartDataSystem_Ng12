import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { VideoWindowViewModel } from './video-control-window.model';

declare var $: any;

@Component({
  selector: 'app-video-control-window',
  templateUrl: './video-control-window.component.html',
  styleUrls: ['./video-control-window.component.less'],
})
export class VideoControlWindowComponent
  implements OnInit, OnDestroy, OnChanges
{
  @Input() set mode(v: PlayMode | undefined) {
    if (v === undefined) {
      return;
    }
    this._mode = v;
    this.modechange(v);
  }

  @Input()
  title: string = '';
  @Input()
  _mode: PlayMode = PlayMode.live;

  @Input()
  model?: VideoModel;

  preview?: VideoModel;
  playback?: VideoModel;

  @Input()
  window: VideoWindowViewModel = new VideoWindowViewModel();

  @Output()
  download: EventEmitter<DurationParams> = new EventEmitter();
  constructor() {}
  PlayMode = PlayMode;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && this.model) {
      this.model.mode = this._mode;
      switch (this._mode) {
        case PlayMode.live:
          this.preview = this.model;

          break;
        case PlayMode.vod:
          this.playback = this.model;

          break;

        default:
          break;
      }
    }
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.playback = undefined;
    this.preview = undefined;
  }

  onclose() {
    this.window.show = false;
  }

  modechange(m: PlayMode) {
    this._mode = m;
    if (this.model) {
      this.model.mode = this._mode;
    }
    this.preview = undefined;
    this.playback = undefined;
    if (this._mode === PlayMode.live) {
      this.preview = this.model;
    }
  }

  ondownload(interval: DurationParams) {
    this.download.emit(interval);
  }
  onplayback(interval: DurationParams) {
    if (this.model) {
      this.model.beginTime = interval.BeginTime;
      this.model.endTime = interval.EndTime;
      let url = this.model.toString(StreamType.main);
      let model = VideoModel.fromUrl(url);
      model.web = this.model.web;
      this.playback = model;
    }
  }
  onstreamchange(stream: StreamType) {
    if (this.model) {
      this.model.stream = stream;
      let url = this.model.toString(stream);
      let model = VideoModel.fromUrl(url);
      this.preview = model;
    }
  }
}
