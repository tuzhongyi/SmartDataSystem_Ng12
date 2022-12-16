import { Component, Input, OnInit } from '@angular/core';
import { WindowComponent } from 'src/app/common/components/window-control/window.component';
import { ImageResult } from '../../../../../view-model/image-result.model';

@Component({
  selector: 'app-picture-window',
  templateUrl: './picture-window.component.html',
  styleUrls: ['./picture-window.component.less'],
})
export class PictureWindowComponent extends WindowComponent implements OnInit {
  @Input()
  picture?: ImageResult;

  @Input() title = '';
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
