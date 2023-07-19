/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-09 10:03:04
 */

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
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
import { Md5 } from 'ts-md5';
import videojs, { VideoJsPlayer } from 'video.js';
import { RoutePath } from '../app-routing.path';
import { GlobalStorageService } from '../common/service/global-storage.service';
import { LocalStorageService } from '../common/service/local-storage.service';
import { SessionStorageService } from '../common/service/session-storage.service';
import { StaticDataRole } from '../enum/role-static-data.enum';
import { UserResourceType } from '../enum/user-resource-type.enum';
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
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  systemManage = false;

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
    private _cookieService: CookieService,
    private _storeService: GlobalStorageService
  ) {
    this._titleService.setTitle('用户登录');
  }

  keypressHandle?: (e: KeyboardEvent) => void;

  ngOnInit() {
    this.fillForm();
    this.keypressHandle = this.onkeypress.bind(this);
    window.addEventListener('keypress', this.keypressHandle);
  }

  ngOnDestroy(): void {
    if (this.keypressHandle) {
      window.removeEventListener('keypress', this.keypressHandle);
    }
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
  onkeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.login();
    }
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
        /[a-zA-Z0-9+/=]{32}(?<userName>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      // console.log(res);
      userName = res.groups!['userName'];

      console.log(userName);

      let passWord = this._cookieService.get('passWord');
      // console.log(passWord);
      passWord = atob(passWord);
      // console.log(passWord);
      let res2 = passWord.match(
        /[a-zA-Z0-9+/=]{32}(?<passWord>[\w.]+)[a-zA-Z0-9+/=]{32}/
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
  forgetPassword() {
    this._router.navigateByUrl(RoutePath.password_get_back);
  }

  test(
    nonce: string,
    nc: string,
    cnonce: string,
    username: string = 'yangpuqu',
    password: string = '95buz5n8',
    qop: string = 'auth',
    method = 'GET',
    uri = '/howell/ver10/data_service/user_system/Users/Login/yangpuqu',
    realm: string = 'howell.net.cn'
  ) {
    const hash1 = Md5.hashStr(`${username}:${realm}:${password}`);
    console.log('hash1:', hash1);
    const hash2 = Md5.hashStr(`${method}:${uri}`);
    console.log('hash2:', hash2);
    let a = `${hash1}:${nonce}:${nc}:${cnonce}:${qop}:${hash2}`;
    console.log(a);
    const response = Md5.hashStr(a);
    return response;
  }

  async login() {
    // let nonce = 'fc5f3c277dba491eaeedd77d25e41dd1'; //'ad2af40c5f244b77afa15b0e62e572c0';
    // let nc = '00000001'; //'00000032';
    // let cnonce = '9p9xmi9o'; //'ne02coyj';
    // let request = this.test(nonce, nc, cnonce);
    // console.log('response:', request);
    // return;

    if (this._checkForm()) {
      this.disableLogin = true;
      try {
        // console.log(this.formGroup.value);
        let user: any = await this._authorizationService.login(
          this.formGroup.get('userName')?.value ?? '',
          this.formGroup.get('passWord')?.value ?? ''
        );
        if (user instanceof User) {
          // console.log('登录成功', result);
          switch (user.UserType) {
            case 3:
            case 2:
              this._router.navigateByUrl(RoutePath.garbage_vehicle);
              break;

            case 1:
            default:
              this._storeUserInfo(user, user.Id, user.Resources ?? []);

              // 区分权限
              if (!this.systemManage) {
                if (user.Role && user.Role.length > 0) {
                  if (user.Role[0].StaticData == StaticDataRole.enabled) {
                    this._router.navigateByUrl(RoutePath.aiop);
                  } else if (
                    user.Role[0].StaticData == StaticDataRole.disabled
                  ) {
                    if (
                      user.Resources &&
                      user.Resources.length > 0 &&
                      user.Resources[0].ResourceType ===
                        UserResourceType.Committees
                    ) {
                      this._router.navigateByUrl(
                        RoutePath.garbage_system_committees
                      );
                    } else {
                      this._router.navigateByUrl(RoutePath.garbage_system);
                    }
                  }
                } else if (
                  user.Resources &&
                  user.Resources.length > 0 &&
                  user.Resources[0].ResourceType === UserResourceType.Committees
                ) {
                  this._router.navigateByUrl(
                    RoutePath.garbage_system_committees
                  );
                } else {
                }
              } else {
                this._router.navigateByUrl(RoutePath.system_manage);
              }
              break;
          }
        }
      } catch (e: any) {
        if (this._isAxiosError(e)) {
          if (e.response?.status == 403 || e.response?.status == 500) {
            this._toastrService.error('账号或密码错误');
          }
        }
        // this._toastrService.error('账号或密码错误');
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
    this._storeService.password = passWord;
  }
}
