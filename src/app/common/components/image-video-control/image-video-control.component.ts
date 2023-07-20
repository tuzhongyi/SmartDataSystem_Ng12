import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ConfigRequestService } from 'src/app/network/request/config/config-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
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
  @Input() model?: ImageVideoControlModel;
  @Input() operation: ImageVideoControlOperation =
    new ImageVideoControlOperation();
  @Input() draw: boolean = false;
  @Input() playback?: EventEmitter<PlaybackInterval>;
  @Input() preview?: EventEmitter<string>;
  @Input() stop: EventEmitter<void> = new EventEmitter();
  @Input() fulled = false;
  @Output() fulledChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onplay: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Output() onstop: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private business: ImageVideoControlBusiness,
    private config: ConfigRequestService
  ) {}
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

  videoPlay: EventEmitter<VideoModel> = new EventEmitter();

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
    if (changes.operation) {
      this.display.operation.fullscreen = this.operation.fullscreen;
      this.display.operation.play = this.operation.play;
    }
    if (changes.playback && this.playback) {
      this.playback.subscribe((x) => {
        this.toplayback(x.CameraId, x);
      });
    }
    if (changes.playback && this.preview) {
      this.preview.subscribe((cameraId) => {
        this.topreview(cameraId);
      });
    }
  }

  ngOnInit(): void {
    this.display.operation.fullscreen = this.operation.fullscreen;
    this.display.operation.play = this.operation.play;
  }

  private async getDuration(date: Date) {
    let config = await this.config.getConfig();

    let begin = new Date(date.getTime());
    begin.setSeconds(begin.getSeconds() + config.playback.begin);
    let end = new Date(date.getTime());
    end.setSeconds(end.getSeconds() + config.playback.end);
    return {
      BeginTime: begin,
      EndTime: end,
    };
  }

  async playClicked(event: Event) {
    this.display.image = false;
    this.display.operation.play = false;
    this.display.video = true;

    if (this.model) {
      if (this.model.image && this.model.image.eventTime) {
        let duration = await this.getDuration(this.model.image.eventTime);
        this.toplayback(this.model.cameraId, duration);
      } else {
        this.topreview(this.model.cameraId);
      }
    }
  }

  topreview(cameraId: string) {
    this.display.image = false;
    this.display.video = true;
    this.business.load(cameraId, PlayMode.live).then((x) => {
      this.play(x);
    });
  }
  toplayback(cameraId: string, interval: DurationParams) {
    this.display.image = false;
    this.display.video = true;
    this.business.load(cameraId, PlayMode.vod, interval).then((x) => {
      this.play(x);
    });
  }
  play(video: VideoModel) {
    this.videoPlay.emit(video);
    this.playing = true;
    this.onplay.emit(this.model);
  }

  tostop() {
    this.stop.emit();
    this.playing = false;
    this.display.image = true;
    this.display.video = false;
    this.display.operation.play = true;
    this.onstop.emit(this.playing);
  }

  onVideoDestroy(model: VideoModel) {
    this.playing = false;
    this.display.image = true;
    this.display.video = false;
  }

  onfull() {
    this.fulled = !this.fulled;
    this.fulledChange.emit(this.fulled);
  }
}
