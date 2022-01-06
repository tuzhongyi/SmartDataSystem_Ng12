import { Component, Input, OnInit } from '@angular/core';
import { ImageVideoControlModel } from './image-video-control.model';

@Component({
  selector: 'app-image-video-control',
  templateUrl: './image-video-control.component.html',
  styleUrls: ['./image-video-control.component.less'],
})
export class ImageVideoControlComponent implements OnInit {
  playing = false;

  @Input()
  model?: ImageVideoControlModel;

  constructor() {}

  ngOnInit(): void {}
}
