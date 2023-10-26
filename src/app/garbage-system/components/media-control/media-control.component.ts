import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from 'src/app/common/components/image-video-control/image-video-control.model';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { wait } from 'src/app/common/tools/tool';
import { ICamera } from 'src/app/network/model/garbage-station/camera.interface';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { IMediaControlBusiness } from './media-control.model';
import { MediaVideoControlBussiness } from './media-video-control.business';

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
  stop: EventEmitter<void> = new EventEmitter();
  @Input()
  autoplay: boolean = false;
  @Input()
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  @Output()
  played: EventEmitter<void> = new EventEmitter();
  @Output()
  stoped: EventEmitter<void> = new EventEmitter();
  @Input()
  page = true;
  @Output()
  next: EventEmitter<ICamera | ImageControlModel> = new EventEmitter();
  @Output()
  prev: EventEmitter<ICamera | ImageControlModel> = new EventEmitter();

  constructor(
    bussiness: MediaVideoControlBussiness,
    protected download: DownloadBusiness
  ) {
    this.business = bussiness;
    this.operation.fullscreen = false;
  }

  preview: EventEmitter<string> = new EventEmitter();
  playback: EventEmitter<PlaybackInterval> = new EventEmitter();

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
    if (this.model) {
      this.operation.fullscreen = this.model.length > 1;

      if (!changes.model.firstChange) {
        this.loadData();
      }
    }
    if (changes.autoplay && changes.autoplay.firstChange) {
      this.playing = this.autoplay;
    }
  }

  ngOnInit() {
    this.loadData();
  }
  displayConfig(model?: ImageVideoControlModel) {
    if (model) {
      if (model.image) {
        this.display.object = !!(model.image.polygon || model.image.rules);
        this.display.download.image = true;
        if (model.image.eventTime) {
          this.display.download.video = true;
          this.display.preview = true;
          this.display.playback = false;
        } else {
          this.display.preview = false;
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

  loadData() {
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
            this.current.source
          ) {
            this.business
              .manualCapture(this.current.source, this.datas)
              .then((y) => {
                if (this.current) {
                  this.current.image = this.datas[this.index].image;
                }
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
      this.preview.emit(this.current.cameraId);
    }
    this.display.preview = false;
  }
  onplayback(event?: Event) {
    if (this.current && this.current.image && this.current.image.eventTime) {
      let interval = DurationParams.beforeAndAfter(
        this.current.image.eventTime
      );
      this.playback.emit({
        CameraId: this.current.cameraId,
        BeginTime: interval.BeginTime,
        EndTime: interval.EndTime,
      });
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
        if (this.current.source) {
          this.download.video(
            this.current.source,
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
    this.prev.emit();
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
    this.next.emit();
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
