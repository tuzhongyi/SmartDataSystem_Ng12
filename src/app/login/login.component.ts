/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-13 17:31:03
 */

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import videojs, { VideoJsPlayer } from 'video.js';
import { MessageBar } from '../common/tool/message-bar';
import { AuthorizationService } from '../request/auth/auth-request.service';
import { UsersUrl } from '../url/users.url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('loginVideo')
  video?: ElementRef;
  // 在获得服务器返回前,登录按钮不能重复点击
  disableLogin: boolean = false;

  formGroup = new FormGroup({
    username: new FormControl('', [
      Validators.maxLength(15),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.maxLength(15),
      Validators.required,
    ]),
  });

  constructor(private _authorizationService: AuthorizationService) {}

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
        // console.log('onPlayerReady', this);
      }
    );
  }
  async login() {
    // console.log(this.formGroup.get('username'));
    // if (this.formGroup.valid) {
    //   console.log('hel');
    // } else {
    //   console.log('sdf');
    // }
    this._checkForm();
    //   this.disableLogin = true;
    //   try {
    //     let res = await this._authorizationService.login(
    //       'guangzhonglu',
    //       'yxotkccu7rc3ai1h'
    //     );
    //     console.log('登录成功', res);
    //   } catch (e) {
    //     console.log('error', e);
    //   }
    //   this.disableLogin = false;
  }

  private _checkForm() {
    if (this.formGroup.get('username')?.invalid) {
      MessageBar.response_warning('请输入账号');
    }
  }
}
