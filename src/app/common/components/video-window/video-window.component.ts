import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { wait } from '../../tools/tool';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { VideoWindowViewModel } from './video-window.model';

@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.less'],
})
export class VideoWindowComponent implements OnInit {
  PlayMode = PlayMode;

  @Input()
  title: string = '';
  @Input() mask = true;
  @Input() zindex?: number;
  @Input()
  model?: VideoModel;

  @Input()
  window: VideoWindowViewModel = new VideoWindowViewModel();

  @Output()
  download: EventEmitter<DurationParams> = new EventEmitter();

  constructor() {}

  loaded = false;

  play: EventEmitter<VideoModel> = new EventEmitter();

  ngOnInit(): void {
    wait(
      () => {
        return this.loaded || this.window.show;
      },
      () => {
        if (!this.window.show) return;
        if (this.model) {
          switch (location.hostname) {
            case 'localhost':
            case '127.0.0.1':
              this.model.web = undefined;
              break;
            default:
              break;
          }

          this.play.emit(this.model);
        }
      }
    );
  }
  onclose() {
    this.window.show = false;
  }
  topreview() {
    if (this.model) {
      this.model.mode = PlayMode.live;
      this.play.emit(this.model);
    }
  }
  onloaded() {
    this.loaded = true;
  }
}
