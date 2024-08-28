import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
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
  @Input() model: VideoSettingControlViewModel =
    new VideoSettingControlViewModel();

  @Output() streamChange: EventEmitter<StreamType> = new EventEmitter();

  constructor(
    private local: LocalStorageService,
    private userService: UserRequestService
  ) {}
  StreamType = StreamType;

  public get stream(): StreamType {
    return this.local.video.stream;
  }
  public set stream(v: StreamType) {
    if (v) {
      this.local.video.stream = v;
    }
  }

  async saveStream(stream: StreamType) {
    const fault = await this.userService.config.update(
      this.local.user.Id,
      UserConfigType.VideoStream,
      stream.toString()
    );
    if (fault && fault.FaultCode === 0) {
      this.stream = stream;
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

  ngOnInit(): void {
    this.loadPreset();
  }

  direction(direction: DirectionState, speed: number) {}

  len(len: LensState, speed: number) {}

  speed(e: MatSliderChange) {
    if (e.value) {
      this.model.PTZ.speed = e.value;
    }
  }

  async onstream(stream: StreamType) {
    this.stream = stream;
    await this.saveStream(stream).then((x) => {
      this.streamChange.emit(stream);
    });
  }
}
