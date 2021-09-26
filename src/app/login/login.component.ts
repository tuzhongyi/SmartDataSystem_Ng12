/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-26 14:54:10
 */

import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import videojs, { VideoJsPlayer } from 'video.js';
import { AuthorizationService } from '../network/request/auth/auth-request.service';

import { ToastrService } from 'ngx-toastr';

import { Title } from '@angular/platform-browser';
import { AxiosError } from 'axios';
import { Router } from '@angular/router';

/**
 *  LoginComponent 需要用到 form 指令，所以必须在 app-routing中声明
 */
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

  constructor(
    private _titleService: Title,
    private _authorizationService: AuthorizationService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this._titleService.setTitle('用户登录');
  }

  ngAfterViewInit() {
    const _this = this;
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
  async login() {
    if (this._checkForm()) {
      this.disableLogin = true;
      try {
        let result = await this._authorizationService.login(
          'guangzhonglu',
          'yxotkccu7rc3ai1h'
        );
        console.log('登录成功', result);

        // 区分权限
        if (
          result.Role &&
          result.Role.length > 0 &&
          result.Role[0].PictureData === 1 &&
          result.Role[0].PrivacyData === 1 &&
          result.Role[0].StaticData === 1 &&
          result.Role[0].UserData === 1
        ) {
          this._router.navigateByUrl('aiop');
        } else {
          this._router.navigateByUrl('waste');
        }
      } catch (e: any) {
        if (this._isAxiosError(e)) {
          console.log(e.toJSON());
          if (e.response?.status == 403) {
            this._toastrService.error('账号或密码错误');
          }
        }
      }
      this.disableLogin = false;
    }
  }

  private _checkForm() {
    if (this.formGroup.get('username')?.invalid) {
      this._toastrService.warning('请输入账号');
      return;
    }
    if (this.formGroup.get('password')?.invalid) {
      this._toastrService.warning('请输入密码');
      return;
    }
    return true;
  }

  private _isAxiosError(cadidate: any): cadidate is AxiosError {
    return cadidate.isAxiosError === true;
  }
}
