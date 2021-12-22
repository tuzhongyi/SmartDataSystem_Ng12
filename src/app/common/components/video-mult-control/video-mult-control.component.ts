import { Component, Input, OnInit } from '@angular/core';
import { VideoModel } from '../video-player/video.model';
import { VideoControlModel } from './video-mult.model';

@Component({
  selector: 'app-video-mult-control',
  templateUrl: './video-mult-control.component.html',
  styleUrls: ['./video-mult-control.component.less'],
})
export class VideoMultControlComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  models: VideoModel[] = [];
}
