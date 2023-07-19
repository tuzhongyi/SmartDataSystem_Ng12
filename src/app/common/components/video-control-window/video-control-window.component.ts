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
  PlayMode = PlayMode;

  @Input()
  title: string = '';
  @Input()
  mode: PlayMode = PlayMode.live;

  @Input()
  model?: VideoModel;

  preview?: VideoModel;
  playback?: VideoModel;

  @Input()
  window: VideoWindowViewModel = new VideoWindowViewModel();

  @Output()
  download: EventEmitter<DurationParams> = new EventEmitter();

  ngOnDestroy(): void {
    this.playback = undefined;
    this.preview = undefined;
  }
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && this.model) {
      this.model.mode = this.mode;
      switch (this.mode) {
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
  onclose() {
    this.window.show = false;
  }

  modechange() {
    this.mode = this.mode == PlayMode.live ? PlayMode.vod : PlayMode.live;
    if (this.model) {
      this.model.mode = this.mode;
    }
    this.preview = undefined;
    this.playback = undefined;
    if (this.mode === PlayMode.live) {
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
