import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { VideoPresetPointControlModel } from '../video-preset-point-control/video-preset-point-control.model';
import {
  DirectionState,
  LensState,
  VideoSettingControlViewModel,
} from './video-setting-control.model';

@Component({
  selector: 'app-video-setting-control',
  templateUrl: './video-setting-control.component.html',
  styleUrls: ['./video-setting-control.component.less'],
})
export class VideoSettingControlComponent implements OnInit {
  StreamType = StreamType;
  constructor(
    private local: LocalStorageService,
    private userService: UserRequestService
  ) {}

  stream: StreamType = StreamType.sub;

  async loadStream() {
    try {
      let result = await this.userService.config.get(
        this.local.user.Id,
        UserConfigType.VideoStream
      );
      if (result) {
        this.stream = JSON.parse(result);
      }
    } catch (ex) {
      console.warn('loadSteam error', ex);
    }
  }

  loadPreset() {
    this.model.PTZ.presetControl = new Array();
    for (let i = 1; i <= 255; i++) {
      this.model.PTZ.presetControl.push(
        new VideoPresetPointControlModel(i, `预制点${i}`)
      );
    }
  }

  @Input()
  model: VideoSettingControlViewModel = new VideoSettingControlViewModel();

  ngOnInit(): void {
    this.loadStream();
    this.loadPreset();
  }

  direction(direction: DirectionState, speed: number) {}

  len(len: LensState, speed: number) {}

  speed(e: MatSliderChange) {
    if (e.value) {
      this.model.PTZ.speed = e.value;
    }
  }

  onstream(stream: StreamType) {}
}
