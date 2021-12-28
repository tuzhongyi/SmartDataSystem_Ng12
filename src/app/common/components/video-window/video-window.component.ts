import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { formatDate } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlayMode, VideoModel } from '../video-player/video.model';
import { UserConfigType } from 'src/app/enum/user-config-type.enum';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { UserRequestService } from 'src/app/network/request/user/user-request.service';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';

declare var $: any;

@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.css'],
})
export class VideoWindowComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}

enum DirectionEnum {
  stop,
  up,
  down,
  left,
  right,
  up_left,
  up_right,
  down_left,
  down_right,
}

enum LensEnum {
  stop,
  halo_on,
  halo_off,
  zoom_in,
  zoom_out,
  far,
  unfar,
}

enum RresetEnum {
  clear,
  set,
  do,
}

class ViewModel {
  clickTag = false;
  isFillVideo = false;
  recordFilePage = {
    index: 1,
    beginTime: '',
    endTime: '',
    list: new Array(),
  };
  PTZ = {
    direction: DirectionEnum,
    reset: RresetEnum,
    len: LensEnum,
    speed: 4,
    presetControl: new Array(),
  };
  scroll = {
    // 滚动条组件参数
    throttle: 300,
    scrollDistance: 1,
    scrollUpDistance: 2,
    scrollWindow: false,
  };
}
class PlayBackFile {
  labelText: string;
  beginTime: string;
  endTime: string;
  isSelect: boolean;
  constructor(labelText: string, beginTime: string, endTime: string) {
    this.labelText = labelText;
    this.beginTime = beginTime;
    this.endTime = endTime;
    this.isSelect = false;
  }
}

class PresetControl {
  no: number;
  isSet: boolean;
  constructor(no: number, isSet: boolean) {
    this.no = no;
    this.isSet = isSet;
  }
}

declare interface Event {
  date: Date;
}
