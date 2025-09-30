/*
 * @Author: pmx
 * @Date: 2021-09-06 17:08:43
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-09 10:03:04
 */

import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Md5 } from 'ts-md5';
import videojs, { VideoJsPlayer } from 'video.js';
import { RoutePath } from '../app-routing.path';
import { UserUIType } from '../enum/user-ui-type.enum';
import { User } from '../network/model/garbage-station/user.model';
import { AuthorizationService } from '../network/request/auth/auth-request.service';
import {
  LoginController,
  LoginControllerProvider,
} from './controller/login.controller';
import { LoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [...LoginControllerProvider],
})
export class LoginComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy
{
  constructor(
    title: Title,
    private authorization: AuthorizationService,
    private toastr: ToastrService,
    private router: Router,
    private cookie: CookieService,
    private controller: LoginController
  ) {
    title.setTitle('用户登录');
  }

  @ViewChild('loginVideo')
  video?: ElementRef;
  @ViewChild('username')
  username?: ElementRef;
  @ViewChild('password')
  password?: ElementRef;

  // 在获得服务器返回前,登录按钮不能重复点击
  disableLogin: boolean = false;
  model = new LoginModel();
  focus = {
    username: false,
    password: false,
  };

  keypressHandle?: (e: KeyboardEvent) => void;
  private get check() {
    if (!this.model.username) {
      this.toastr.warning('请输入账号');
      return false;
    }
    if (!this.model.password) {
      this.toastr.warning('请输入密码');
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.controller.init();
    this.load();

    this.keypressHandle = this.onkeypress.bind(this);
    window.addEventListener('keypress', this.keypressHandle);
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

    if (this.username && !this.model.username && !this.focus.username) {
      this.username.nativeElement.value = '';
    }
    if (this.password && !this.model.password && !this.focus.password) {
      this.password.nativeElement.value = '';
    }
  }
  ngAfterViewChecked(): void {
    if (this.username && !this.model.username && !this.focus.username) {
      this.username.nativeElement.value = '';
    }
    if (this.password && !this.model.password && !this.focus.password) {
      this.password.nativeElement.value = '';
    }
  }
  ngOnDestroy(): void {
    if (this.keypressHandle) {
      window.removeEventListener('keypress', this.keypressHandle);
    }
  }
  onkeypress(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.login();
    }
  }
  load() {
    this.model = this.controller.store.load();
    if (this.model.auto) {
      this.login();
    }
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
  route(user: User) {
    let path = this.authorization.getPath(user);
    this.router.navigateByUrl(path);
  }

  private auth() {
    let value = `${this.model.username}&${this.model.password}`;
    let base64 = base64encode(value);
    let code = encodeURIComponent(base64);
    // this._localStorageService.auth = code;
    return code;
  }

  async login() {
    // let nonce = 'fc5f3c277dba491eaeedd77d25e41dd1'; //'ad2af40c5f244b77afa15b0e62e572c0';
    // let nc = '00000001'; //'00000032';
    // let cnonce = '9p9xmi9o'; //'ne02coyj';
    // let request = this.test(nonce, nc, cnonce);
    // console.log('response:', request);
    // return;

    if (this.check) {
      this.disableLogin = true;

      this.authorization
        .login(this.model.username, this.model.password)
        .then((user) => {
          this.controller.config.load(user);
          this.controller.store.save.config(this.model.save, this.model.auto);

          if (user.UIType === UserUIType.dapuqiao) {
            let code = this.auth();
            let path = `${location.origin}/${RoutePath.dapuqiao}/index?auth=${code}`;
            location.href = path;
          } else {
            this.route(user);
          }
        })
        .catch((e: HttpErrorResponse) => {
          if (e.status == 403 || e.status == 500) {
            this.toastr.error('账号或密码错误');
          } else {
            this.toastr.error('登录失败');
          }
        })
        .finally(() => {
          this.disableLogin = false;
        });
    }
  }
}
