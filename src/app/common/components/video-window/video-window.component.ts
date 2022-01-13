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
import { VideoWindowViewModel } from './video-window.model';

declare var $: any;

@Component({
  selector: 'app-video-window',
  templateUrl: './video-window.component.html',
  styleUrls: ['./video-window.component.less'],
})
export class VideoWindowComponent implements OnInit, OnDestroy {
  PlayMode = PlayMode;
  mode: PlayMode = PlayMode.vod;

  @Input()
  model?: VideoModel;
  @Input()
  window: VideoWindowViewModel = new VideoWindowViewModel();

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  onclose() {
    this.window.show = false;
  }

  modechange() {
    this.mode = this.mode == PlayMode.live ? PlayMode.vod : PlayMode.live;
  }
}
