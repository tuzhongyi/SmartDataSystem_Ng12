/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-23 11:27:45
 */

import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AxiosError } from 'axios';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import videojs, { VideoJsPlayer } from 'video.js';
import { EnumHelper } from '../enum/enum-helper';
import { StaticDataRole } from '../enum/role-static-data.enum';
import { LocalStorageService } from '../global/service/local-storage.service';
import { SessionStorageService } from '../global/service/session-storage.service';
import { User, UserResource } from '../network/model/user.model';
import { AuthorizationService } from '../network/request/auth/auth-request.service';

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
    private _sessionStorageService: SessionStorageService,
    private _cookieService: CookieService
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
    let autoLogin = false;
    if (this._cookieService.check('autoLogin')) {
      autoLogin = JSON.parse(this._cookieService.get('autoLogin'));
    }

    let savePassWord = false;
    if (this._cookieService.check('savePassWord')) {
      savePassWord = JSON.parse(this._cookieService.get('savePassWord'));
    }

    // console.log(autoLogin, savePassWord);
    this.savePassWord = savePassWord;
    this.autoLogin = autoLogin;
    if (savePassWord) {
      let userName = this._cookieService.get('userName');
      // console.log(userName);
      userName = atob(userName);
      // console.log(userName);
      let res = userName.match(
        /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
      )!;
      // console.log(res);
      userName = res.groups!['userName'];

      console.log(userName);

      let passWord = this._cookieService.get('passWord');
      // console.log(passWord);
      passWord = atob(passWord);
      // console.log(passWord);
      let res2 = passWord.match(
        /[a-zA-Z0-9+/=]{32}(?<passWord>\w*)[a-zA-Z0-9+/=]{32}/
      )!;
      // console.log(res2);
      passWord = res2.groups!['passWord'];

      console.log(passWord);

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
        // console.log(this.formGroup.value);
        let result: any = await this._authorizationService.login(
          this.formGroup.get('userName')!.value,
          this.formGroup.get('passWord')!.value
        );
        if (result instanceof User) {
          console.log('登录成功', result);

          this._storeUserInfo(result, result.Id, result.Resources ?? []);

          // 区分权限
          if (result.Role && result.Role.length > 0) {
            if (result.Role[0].StaticData == StaticDataRole.enabled) {
              this._router.navigateByUrl('aiop');
            } else if (result.Role[0].StaticData == StaticDataRole.disabled) {
              this._router.navigateByUrl('garbage-system');
            }
          }
        }
      } catch (e: any) {
        if (this._isAxiosError(e)) {
          // console.log(e.toJSON());
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
  /**
   *  保存 cookie,60分钟后过期
   * @param userId
   * @param userResource
   */
  private _storeUserInfo(
    user: User,
    userId: string,
    userResource: Array<UserResource>
  ) {
    let options = {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: '/',
      secure: false,
    };
    this._cookieService.set(
      'savePassWord',
      JSON.stringify(this.savePassWord),
      options
    );
    this._cookieService.set(
      'autoLogin',
      JSON.stringify(this.autoLogin),
      options
    );
    // username
    let prefix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    let suffix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();

    let userName = btoa(
      prefix + this.formGroup.get('userName')!.value + suffix
    );
    this._cookieService.set('userName', userName, options);

    //password
    prefix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    suffix = CryptoJS.MD5(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    ).toString();
    let passWord = btoa(
      prefix + this.formGroup.get('passWord')!.value + suffix
    );
    this._cookieService.set('passWord', passWord, options);

    this._localStorageService.user = user;
  }
}
