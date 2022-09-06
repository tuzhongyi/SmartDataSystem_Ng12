import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ChangeControlModel } from 'src/app/view-model/change-control.model';
import { wait } from '../../tools/tool';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { ImageVideoControlBusiness } from './image-video-control.business';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from './image-video-control.model';

@Component({
  selector: 'app-image-video-control',
  templateUrl: './image-video-control.component.html',
  styleUrls: ['./image-video-control.component.less'],
  providers: [ImageVideoControlBusiness],
})
export class ImageVideoControlComponent implements OnInit, OnChanges {
  @Input()
  fulled = false;
  @Input()
  model?: ImageVideoControlModel;
  @Input()
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  @Input()
  draw: boolean = false;
  @Input()
  playback?: EventEmitter<PlaybackInterval>;

  @Output()
  onplay: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Output()
  onstop: EventEmitter<boolean> = new EventEmitter();
  @Output()
  fullscreen: EventEmitter<ImageVideoControlModel> = new EventEmitter();

  constructor(private business: ImageVideoControlBusiness) {}
  OnlineStatus = OnlineStatus;
  playing = false;
  display = {
    operation: {
      play: false,
      fullscreen: false,
    },
    image: true,
    video: false,
  };
  @ViewChild(VideoPlayerComponent)
  player?: VideoPlayerComponent;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.model && this.model) {
      this.display.image = true;
      this.display.video = false;
      if (this.model.image) {
        this.display.operation.play =
          this.model.image.status == OnlineStatus.Online;
        this.display.operation.fullscreen =
          this.model.image.status == OnlineStatus.Online;
      }
    }
    if (this.operation) {
      this.display.operation.fullscreen = this.operation.fullscreen;
      this.display.operation.play = this.operation.play;
    }
    if (changes.playback && changes.playback.firstChange && this.playback) {
      if (this.playback.length > 0) {
        this.playback.unsubscribe();
      }
      this.playback.subscribe((x) => {
        this.stop();
        if (this.model) {
          this.model.videoChanged = undefined;
        }
        this.onplayback(x.CameraId, x);
      });
    }
  }

  ngOnInit(): void {
    this.display.operation.fullscreen = this.operation.fullscreen;
    this.display.operation.play = this.operation.play;
  }

  playClicked(event: Event) {
    this.display.image = false;
    this.display.operation.play = false;
    this.display.video = true;

    if (this.model) {
      if (!this.model.video) {
        this.business.load(this.model.cameraId, PlayMode.live).then((x) => {
          this.play(x);
        });
      }
    }
  }

  preview(cameraId: string) {
    this.display.image = false;
    this.display.video = true;
    this.business.load(cameraId, PlayMode.live).then((x) => {
      this.play(x);
    });
  }
  onplayback(cameraId: string, interval: DurationParams) {
    this.display.image = false;
    this.display.video = true;
    this.business.load(cameraId, PlayMode.vod, interval).then((x) => {
      this.play(x);
    });
  }
  play(video: VideoModel) {
    if (this.model) {
      this.model.video = video;
      this.model.videoChanged = (x) => {
        if (this.player) {
          if (!x) this.player.stop();
        }
      };
      this.onplay.emit(this.model);
      this.playing = true;
    }
  }

  stop() {
    if (this.model) {
      this.model.video = undefined;
    }
    this.playing = false;
    this.display.image = true;
    this.display.video = false;
    this.display.operation.play = true;
    this.onstop.emit(this.playing);
  }

  fullscreenClicked(event: Event) {
    this.fullscreen.emit(this.model);
  }
  onVideoDestroy(model: VideoModel) {
    this.playing = false;
    this.display.image = true;
    this.display.video = false;
  }
}
