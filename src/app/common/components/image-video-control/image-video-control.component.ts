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
import { ChangeControlModel } from 'src/app/view-model/change-control.model';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { ImageVideoControlBusiness } from './image-video-control.business';
import { ImageVideoControlModel } from './image-video-control.model';

@Component({
  selector: 'app-image-video-control',
  templateUrl: './image-video-control.component.html',
  styleUrls: ['./image-video-control.component.less'],
  providers: [ImageVideoControlBusiness],
})
export class ImageVideoControlComponent implements OnInit, OnChanges {
  playing = false;

  display = {
    operation: {
      play: false,
      fullscreen: false,
    },
    image: true,
    video: false,
  };

  @Input()
  fulled = false;

  @Input()
  model?: ImageVideoControlModel;

  @ViewChild(VideoPlayerComponent)
  player?: VideoPlayerComponent;

  @Output()
  play: EventEmitter<ImageVideoControlModel> = new EventEmitter();

  @Output()
  fullscreen: EventEmitter<ImageVideoControlModel> = new EventEmitter();

  constructor(private business: ImageVideoControlBusiness) {}
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
  }

  ngOnInit(): void {}

  playClicked(event: Event) {
    this.display.image = false;
    this.display.operation.play = false;
    this.display.video = true;

    if (this.model) {
      if (!this.model.video) {
        this.business.load(this.model.cameraId, PlayMode.live).then((x) => {
          if (this.model) {
            this.model.video = x;
            this.model.videoChanged = () => {
              if (this.player) this.player.stop();
            };
            this.playing = true;
          }
        });
      }
    }

    this.play.emit(this.model);
  }

  stop() {
    this.playing = false;
    this.display.image = true;
    this.display.video = false;
    this.display.operation.play = true;
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
