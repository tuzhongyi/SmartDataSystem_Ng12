/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by:   pmx
 * @Last Modified time: 2021-09-06 17:08:43
 */

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import videojs, { VideoJsPlayer } from 'video.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginVideo')
  video?: ElementRef;
  constructor() {}

  ngAfterViewInit() {
    const _this = this;
    if (!this.video) return;
    videojs(
      this.video.nativeElement,
      {
        autoplay: true,
        loop: true,
        controls: false,
        muted: true,
        sources: [
          {
            src: 'assets/img/login.mp4',
            type: 'video/mp4',
          },
        ],
      },
      function onPlayerReady(this: VideoJsPlayer) {
        console.log('onPlayerReady', this);
      }
    );
  }
}
