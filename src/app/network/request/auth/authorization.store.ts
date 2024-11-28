import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { LoginModel } from 'src/app/login/login.model';
import { User } from '../../model/garbage-station/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationStore {
  constructor(
    private cookie: CookieService,
    private local: LocalStorageService,
    private global: GlobalStorageService
  ) {}

  load() {
    let model = new LoginModel();

    if (this.cookie.check('autoLogin')) {
      model.auto = JSON.parse(this.cookie.get('autoLogin'));
    }

    if (this.cookie.check('savePassWord')) {
      model.save = JSON.parse(this.cookie.get('savePassWord'));
    }

    // console.log(autoLogin, savePassWord);

    if (model.save) {
      let userName = this.cookie.get('userName');
      // console.log(userName);
      userName = atob(userName);
      // console.log(userName);
      let res = userName.match(
        /[a-zA-Z0-9+/=]{32}(?<userName>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      // console.log(res);
      userName = res.groups!['userName'];

      let passWord = this.cookie.get('passWord');

      passWord = atob(passWord);

      let res2 = passWord.match(
        /[a-zA-Z0-9+/=]{32}(?<passWord>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;

      passWord = res2.groups!['passWord'];
      model.username = userName;
      model.password = passWord;
    }
    return model;
  }

  save = {
    info: (user: User, username: string, password: string) => {
      // username
      let prefix = CryptoJS.MD5(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      ).toString();
      let suffix = CryptoJS.MD5(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      ).toString();

      let userName = btoa(`${prefix}${username}${suffix}`);
      this.cookie.set('userName', userName, this.options);

      //password
      prefix = CryptoJS.MD5(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      ).toString();
      suffix = CryptoJS.MD5(
        ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
      ).toString();
      let passWord = btoa(`${prefix}${password}${suffix}`);
      this.cookie.set('passWord', passWord, this.options);

      this.local.user = user;
      this.global.password = passWord;
    },
    config: (save: boolean, auto: boolean) => {
      this.cookie.set('savePassWord', JSON.stringify(save), this.options);
      this.cookie.set('autoLogin', JSON.stringify(auto), this.options);
    },
  };

  private options = {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    path: '/',
    secure: false,
  };
}
