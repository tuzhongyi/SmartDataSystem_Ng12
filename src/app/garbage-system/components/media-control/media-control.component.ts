import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { classToClass } from 'class-transformer';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { ImageVideoControlComponent } from 'src/app/common/components/image-video-control/image-video-control.component';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { wait } from 'src/app/common/tools/tool';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { MediaVideoControlBussiness } from './media-video-control.business';
import { ICamera } from 'src/app/network/model/camera.interface';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IMediaControlBusiness } from './media-control.model';

@Component({
  selector: 'app-media-control',
  templateUrl: './media-control.component.html',
  styleUrls: ['./media-control.component.less'],
  providers: [MediaVideoControlBussiness, DownloadBusiness],
})
export class MediaControlComponent
  implements
    OnInit,
    OnChanges,
    AfterViewInit,
    IComponent<Array<ICamera | ImageControlModel>, ImageVideoControlModel[]>
{
  @Input()
  business: IMediaControlBusiness;
  @Input()
  model?: Array<ICamera | ImageControlModel> = [];

  @Input()
  index = 0;

  @Input()
  stop?: EventEmitter<void>;
  @Input()
  autoplay: boolean = false;

  operation: ImageVideoControlOperation = new ImageVideoControlOperation();

  @Output()
  played: EventEmitter<void> = new EventEmitter();
  @Output()
  stoped: EventEmitter<void> = new EventEmitter();

  @ViewChild(ImageVideoControlComponent)
  player!: ImageVideoControlComponent;

  constructor(
    bussiness: MediaVideoControlBussiness,
    private download: DownloadBusiness
  ) {
    this.business = bussiness;
  }
  ngAfterViewInit(): void {
    if (this.autoplay) {
      wait(
        () => {
          return !!(this.current && this.current.image);
        },
        () => {
          if (this.current && this.current.image) {
            if (this.current.image.eventTime) {
              this.onplayback();
            } else {
              this.onpreview();
            }
          }
        }
      );
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stop && changes.stop.firstChange) {
      if (this.stop) {
        this.stop.subscribe((x) => {
          if (this.playing) {
            this.player.stop();
          }
        });
      }
    }
    if (this.model) {
      this.operation.fullscreen = this.model.length > 1;
    }
    if (changes.autoplay && changes.autoplay.firstChange) {
      this.playing = this.autoplay;
    }
  }

  datas: ImageVideoControlModel[] = [];

  img?: string;

  manualCaptureing = false;

  title?: string;

  draw = true;

  display = {
    object: false,
    download: {
      image: true,
      video: true,
    },
    preview: true,
    playback: false,
  };

  private _current?: ImageVideoControlModel;
  public get current(): ImageVideoControlModel | undefined {
    return this._current;
  }
  public set current(v: ImageVideoControlModel | undefined) {
    this._current = v;
    this.displayConfig(this._current);
  }

  private _playing: boolean = false;
  public get playing(): boolean {
    return this._playing;
  }
  public set playing(v: boolean) {
    this._playing = v;

    this.display.object = !this._playing;
    this.display.download.image = !this._playing;
    this.display.download.video = !this._playing;
    if (this.playing) {
      this.display.object = !this._playing;
      this.display.download.image = !this._playing;
      this.display.download.video = !this._playing;
    } else {
      this.displayConfig(this.current);
    }
    this.operation.play = !this._playing;
  }

  displayConfig(model?: ImageVideoControlModel) {
    if (model) {
      if (model.image) {
        this.display.object = !!(model.image.polygon || model.image.rules);
        this.display.download.image = true;
        this.display.download.video = true;
        if (model.image.eventTime) {
          this.display.preview = false;
          this.display.playback = true;
        } else {
          this.display.preview = true;
          this.display.playback = false;
        }
      } else {
        this.display.object = false;
        this.display.download.image = false;
        this.display.download.video = false;
      }
    } else {
      this.display.object = false;
      this.display.download.image = false;
      this.display.download.video = false;
      this.display.preview = false;
      this.display.playback = false;
    }
  }

  ngOnInit() {
    if (this.model) {
      let promise = this.business.load(this.model);
      promise.then((x) => {
        this.datas = x;
        if (this.datas.length > 0) {
          this.current = this.datas[this.index];
          this.title = this.current.image ? this.current.image.name : '';

          if (
            this.current.image &&
            !this.current.image.eventTime &&
            this.current.stationId
          ) {
            this.business
              .manualCapture(this.current.stationId, this.datas)
              .then((y) => {
                this.datas = y;
                this.current = classToClass(this.datas[this.index]);
              });
          }
        }
      });
      this.business.manualCaptureEvent.subscribe((x) => {
        this.manualCaptureing = x;
      });
    }
  }

  onpreview(event?: Event) {
    if (this.current) {
      this.player.preview(this.current.cameraId);
    }
    this.display.preview = false;
  }
  onplayback(event?: Event) {
    if (this.current && this.current.image && this.current.image.eventTime) {
      let interval = DurationParams.beforeAndAfter(
        this.current.image.eventTime
      );
      this.player.onplayback(this.current.cameraId, interval);
    }
    this.display.playback = false;
    this.display.preview = true;
  }

  async onimagedownload() {
    if (this.current) {
      if (this.current && this.current.image) {
        let time = this.current.image.eventTime ?? new Date();
        let src = await this.current.image.src;
        this.download.image(src, this.current.image.name, time);
      }
    }
  }

  onvideodownload() {
    if (this.current) {
      if (this.current && this.current.image && this.current.image.eventTime) {
        let interval = DurationParams.beforeAndAfter(
          this.current.image.eventTime
        );
        if (this.current.stationId) {
          this.download.video(
            this.current.stationId,
            this.current.cameraId,
            interval
          );
        }
      }
    }
  }

  onprev() {
    this.index--;
    if (this.index < 0) {
      this.index = this.datas.length - 1;
    }
    this.current = this.datas[this.index];
    if (this.current.image) {
      this.title = this.current.image.name;
    }
  }
  onnext() {
    this.index++;
    if (this.index == this.datas.length) {
      this.index = 0;
    }
    this.current = this.datas[this.index];
    if (this.current.image) {
      this.title = this.current.image.name;
    }
  }
  onplayed(model: ImageVideoControlModel) {
    this.playing = true;
    this.played.emit();
  }
  onstoped(playing: boolean) {
    this.playing = playing;
    this.stoped.emit();
  }

  ondrawchange(draw: any) {
    console.log(draw);
    this.draw = draw;
  }
}
