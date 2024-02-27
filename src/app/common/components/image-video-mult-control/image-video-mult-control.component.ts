import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
  PlaybackInterval,
} from '../image-video-control/image-video-control.model';

@Component({
  selector: 'app-image-video-mult-control',
  templateUrl: './image-video-mult-control.component.html',
  styleUrls: ['./image-video-mult-control.component.less'],
})
export class ImageVideoMultControlComponent implements OnInit, OnChanges {
  @Input('models')
  models?: ImageVideoControlModel[];
  @Input()
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  @Input()
  playback?: EventEmitter<PlaybackInterval>;
  @Input() is_playback_use_config = true;
  @Input()
  fullplay = false;

  @Output()
  onplayed: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Output()
  onstoped: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Input()
  change?: EventEmitter<ImageVideoControlModel[]>;

  constructor() {}

  _playback: EventEmitter<PlaybackInterval>[] = [];

  sqrt = 1;
  played?: ImageVideoControlModel;
  playing: (ImageVideoControlModel | undefined)[] = [];

  @ViewChild('element')
  element?: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.models && this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel(''));
      }
      this.playing = this.models.map((x) => undefined);
      this._playback = this.models.map((x) => new EventEmitter());
    }
  }

  ngOnInit(): void {
    if (this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel(''));
      }
      this.playing = this.models.map((x) => undefined);
    }
    if (this.change) {
      this.change.subscribe((x) => {
        this.onchange(x);
      });
    }
    if (this.playback) {
      this.playback.subscribe((x) => {
        let index = this.playing.findIndex(
          (y) => y && y.cameraId === x.CameraId
        );
        if (index >= 0) {
          this._playback[index].emit(x);
        }
      });
    }
  }

  onchange(models: ImageVideoControlModel[]) {
    if (this.models) {
      for (let i = 0; i < models.length; i++) {
        let index = this.models.findIndex(
          (x) => x.cameraId === models[i].cameraId
        );
        if (index >= 0) {
          let model = new ImageVideoControlModel(
            models[i].cameraId,
            models[i].source
          );
          model.image = models[i].image;
          model.fulled = models[i].fulled;
          this.models[index].image = model.image;
        }
      }
    }
  }

  onplay(item: ImageVideoControlModel) {
    this.played = item;
    if (this.fullplay) {
      item.fulled = true;
    }

    this.onplayed.emit(this.played);
    if (this.models) {
      let index = this.models.indexOf(item);
      if (index >= 0) {
        this.playing[index] = item;
      }
    }
  }
  onstop(index: number) {
    if (index >= 0) {
      let item = this.playing[index];

      this.playing[index] = undefined;
      this.onstoped.emit(item);
      this.played = undefined;
    }
  }
}
