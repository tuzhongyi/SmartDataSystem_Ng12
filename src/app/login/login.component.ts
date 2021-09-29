/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-28 16:20:30
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import videojs, { VideoJsPlayer } from 'video.js';
import { AuthorizationService } from '../network/request/auth/auth-request.service';

import { ToastrService } from 'ngx-toastr';

import { Title } from '@angular/platform-browser';
import { AxiosError } from 'axios';
import { Router } from '@angular/router';
import { User, UserResource } from '../network/model/user.model';
import { LocalStorageService } from '../global/service/local-storage.service';
import { SessionStorageService } from '../global/service/session-storage.service';
import { EnumHelper } from '../enum/enum-helper';

/**
 *  LoginComponent 需要用到 form 指令，
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('loginVideo')
  video?: ElementRef;

  // 在获得服务器返回前,登录按钮不能重复点击
  disableLogin: boolean = false;
  savePassWord: boolean = false;
  autoLogin: boolean = false;

  formGroup = new FormGroup({
    userName: new FormControl('', [
      Validators.maxLength(15),
      Validators.required,
    ]),
    passWord: new FormControl('', [Validators.required]),
  });

  constructor(
    private _titleService: Title,
    private _authorizationService: AuthorizationService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) {
    this._titleService.setTitle('用户登录');
  }

  ngOnInit() {
    this.fillForm();
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
  fillForm() {
    let autoLogin = this._localStorageService.autoLogin;
    let savePassWord = this._localStorageService.savePassWord;

    console.log(autoLogin, savePassWord);

    this.savePassWord = savePassWord;
    this.autoLogin = autoLogin;

    if (savePassWord) {
      let userName = this._localStorageService.userName;
      let passWord = this._localStorageService.passWord;
      this.formGroup.patchValue({
        userName: userName,
        passWord: passWord,
      });
      if (autoLogin) {
        this.login();
      }
    }
  }
  onSavePassWordChange(checked: boolean) {
    this.savePassWord = checked;
    if (!checked) {
      this.autoLogin = checked;
    }
  }
  onAutoLoginChange(checked: boolean) {
    this.savePassWord = this.autoLogin = checked;
  }
  // 'guangzhonglu',
  // 'yxotkccu7rc3ai1h'
  async login() {
    if (this._checkForm()) {
      this.disableLogin = true;
      try {
        console.log(this.formGroup.value);
        let result: User = await this._authorizationService.login(
          this.formGroup.get('userName')!.value,
          this.formGroup.get('passWord')!.value
        );
        console.log('登录成功', result);

        this._storeUserInfo(result.Id, result.Resources ?? []);

        // 区分权限
        if (result.Role && result.Role.length > 0) {
          if (result.Role[0].Name == '管理员') {
            this._router.navigateByUrl('aiop');
          } else if (result.Role[0].Name == '操作者') {
            this._router.navigateByUrl('waste');
          }
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
    if (this.formGroup.get('userName')?.invalid) {
      this._toastrService.warning('请输入账号');
      return;
    }
    if (this.formGroup.get('passWord')?.invalid) {
      this._toastrService.warning('请输入密码');
      return;
    }
    return true;
  }

  private _isAxiosError(cadidate: any): cadidate is AxiosError {
    return cadidate.isAxiosError === true;
  }
  private _storeUserInfo(userId: string, userResource: Array<UserResource>) {
    // LocalStorage
    this._localStorageService.savePassWord = this.savePassWord;
    this._localStorageService.autoLogin = this.autoLogin;

    if (this.savePassWord) {
      this._localStorageService.userName =
        this.formGroup.get('userName')!.value;
      this._localStorageService.passWord =
        this.formGroup.get('passWord')!.value;
    } else {
      this._localStorageService.clear('userName');
      this._localStorageService.clear('passWord');
    }

    // SessionStorage
    this._sessionStorageService.userResource = userResource;

    userResource.sort(function (a, b) {
      return b.ResourceType - a.ResourceType;
    });

    this._sessionStorageService.userResourceType = EnumHelper.Convert(
      userResource[0].ResourceType
    );
    this._sessionStorageService.userId = userId;
  }
}
