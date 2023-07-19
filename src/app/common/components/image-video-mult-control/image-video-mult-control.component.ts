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
  @Input()
  fullplay = false;

  @Output()
  onplayed: EventEmitter<ImageVideoControlModel> = new EventEmitter();
  @Output()
  onstoped: EventEmitter<ImageVideoControlModel> = new EventEmitter();

  constructor() {}

  sqrt = 1;
  played?: ImageVideoControlModel;

  @ViewChild('element')
  element?: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.models && this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel(''));
      }
    }
  }

  ngOnInit(): void {
    if (this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel(''));
      }
    }
  }

  onplay(item: ImageVideoControlModel) {
    this.played = item;
    if (this.fullplay) {
      item.fulled = true;
    }
    this.onplayed.emit(this.played);
  }
  onstop(playing: boolean) {
    this.onstoped.emit(this.played);
    this.played = undefined;
  }
}
