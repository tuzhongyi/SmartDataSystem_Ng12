import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ImageVideoControlModel } from '../image-video-control/image-video-control.model';

@Component({
  selector: 'app-image-video-mult-control',
  templateUrl: './image-video-mult-control.component.html',
  styleUrls: ['./image-video-mult-control.component.less'],
})
export class ImageVideoMultControlComponent implements OnInit, OnChanges {
  @Input()
  models?: ImageVideoControlModel[];
  sqrt = 1;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.models && this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel('', ''));
      }
    }
  }

  ngOnInit(): void {
    if (this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new ImageVideoControlModel('', ''));
      }
    }
  }

  onfullscreen(item: ImageVideoControlModel) {
    item.fulled = !item.fulled;
  }

  played?: ImageVideoControlModel;

  onplay(item: ImageVideoControlModel) {
    if (this.played) {
      this.played.video = undefined;
    }
    this.played = item;
  }
}
