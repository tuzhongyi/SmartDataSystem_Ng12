import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PasswordCheckCodeResult } from 'src/app/network/request/user/user-request.params';
import videojs, { VideoJsPlayer } from 'video.js';

@Component({
  selector: 'app-password-index',
  templateUrl: './password-index.component.html',
  styleUrls: ['./password-index.component.less'],
})
export class PasswordGetBackIndexComponent implements OnInit, AfterViewInit {
  constructor(private title: Title) {
    title.setTitle('找回密码');
  }

  @ViewChild('loginVideo')
  video?: ElementRef;

  ngAfterViewInit() {
    if (!this.video) return;

    // 自动循环播放视频
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
        // console.log('onPlayerReady', this);
      }
    );
  }

  passwordCheckCodeResult?: PasswordCheckCodeResult;
  mobileNoChecked = false;
  ngOnInit() {}

  onCheckMobileNoResult(checked: PasswordCheckCodeResult) {
    this.passwordCheckCodeResult = checked;
    this.mobileNoChecked = checked.Result;
  }
}
