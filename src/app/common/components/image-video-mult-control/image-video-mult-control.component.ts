import { Component, Input, OnInit } from '@angular/core';
import { MediaControlViewModel } from 'src/app/garbage-system/components/media-control/media-control.model';

@Component({
  selector: 'app-image-video-mult-control',
  templateUrl: './image-video-mult-control.component.html',
  styleUrls: ['./image-video-mult-control.component.less'],
})
export class ImageVideoMultControlComponent implements OnInit {
  @Input()
  models?: MediaControlViewModel[];
  sqrt = 1;

  constructor() {}

  ngOnInit(): void {
    if (this.models) {
      this.sqrt = Math.ceil(Math.sqrt(this.models.length));
      let pow = Math.pow(this.sqrt, 2);
      for (let i = this.models.length; i < pow; i++) {
        this.models.push(new MediaControlViewModel());
      }
    }
  }
}
