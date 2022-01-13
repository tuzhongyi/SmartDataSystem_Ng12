import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { VideoPresetPointControlModel } from './video-preset-point-control.model';

@Component({
  selector: 'app-video-preset-point-control',
  templateUrl: './video-preset-point-control.component.html',
  styleUrls: ['./video-preset-point-control.component.less'],
})
export class VideoPresetPointControlComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Input()
  datas: VideoPresetPointControlModel[] = [];

  select: EventEmitter<VideoPresetPointControlModel> = new EventEmitter();
  goto: EventEmitter<VideoPresetPointControlModel> = new EventEmitter();
  set: EventEmitter<VideoPresetPointControlModel> = new EventEmitter();

  selected?: VideoPresetPointControlModel;

  onitemclicked(item: VideoPresetPointControlModel) {
    this.selected = item;
    this.select.emit(item);
  }

  ondo(item: VideoPresetPointControlModel) {
    this.selected = item;
    this.goto.emit(item);
  }

  onset(item: VideoPresetPointControlModel) {
    this.selected = item;
    this.set.emit(item);
  }
}
