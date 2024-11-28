/*
 * @Author: pmx
 * @Date: 2022-08-01 13:46:28
 * @Last Modified by: zzl
 * @Last Modified time: 2022-12-15 17:27:36
 */

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { plainToInstance } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
import { RoutePath } from 'src/app/app-routing.path';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { UserType } from 'src/app/enum/user-type.enum';
import { UserUIType } from 'src/app/enum/user-ui-type.enum';
import { UserUrl } from 'src/app/network/url/garbage/user.url';
import { HowellUrl } from 'src/app/view-model/howell-url';
import { User } from '../../model/garbage-station/user.model';
import { AuthorizationStore } from './authorization.store';
import { DigestResponse } from './digest-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(
    private local: LocalStorageService,
    private session: SessionStorageService,
    private cookie: CookieService,
    private router: Router,
    private global: GlobalStorageService,
    private http: HttpClient,
    private store: AuthorizationStore
  ) {
    this.init();
  }

  private init() {
    if (this.cookie.check('userName')) {
      let userName = this.cookie.get('userName');
      userName = atob(userName);
      let res = userName.match(
        /[a-zA-Z0-9+/=]{32}(?<userName>[\w.]+)[a-zA-Z0-9+/=]{32}/
      )!;
      userName = res.groups!['userName'];

      this.session.username = userName;
    }

    if (this.cookie.check('passWord')) {
      let password = this.cookie.get('passWord');
      password = atob(password);

      if (password && password.length > 64) {
        password = password.substring(32, password.length);
        password = password.substring(0, password.length - 32);
      }

      // let res2 = password.match(
      //   /[a-zA-Z0-9+/=]{32}(?<passWord>(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,30})[a-zA-Z0-9+/=]{32}/
      // )!;
      // password = res2.groups!['passWord'];

      this.session.password = password;
    }
  }

  toroute(user: User) {
    let path = this.getPath(user);
    return this.router.parseUrl(`/${path}`);
  }

  getPath(user: User): RoutePath {
    let role = user.Role[0];
    if (user.UIType === UserUIType.dapuqiao) {
      return RoutePath.dapuqiao;
    } else if (
      user.UserType === UserType.station_vehicle ||
      user.UserType === UserType.garbage_vehicle_system
    ) {
      return RoutePath.garbage_system;
    } else if (
      !!role &&
      role.PrivacyData === 1 &&
      role.UserData === 1 &&
      role.StaticData === 1 &&
      role.PictureData === 1
    ) {
      return RoutePath.aiop;
    } else if (
      !!role &&
      role.UserData === 1 &&
      role.StaticData === 1 &&
      role.PictureData === 1
    ) {
      return RoutePath.audit;
    } else if (user.Resources && user.Resources.length > 0) {
      let resource = user.Resources[0];
      switch (resource.ResourceType) {
        case UserResourceType.Committees:
          return RoutePath.garbage_system_committees;
        case UserResourceType.City:
        case UserResourceType.County:
        default:
          return RoutePath.garbage_system;
      }
    }
    return RoutePath.login;
  }

  login(url: string): Promise<User>;
  login(username: string, password: string): Promise<User>;
  login(username: string, password?: string): Promise<User> {
    // this.session.clear();
    // this.local.clear();
    // this.global.destroy();
    // this.service.clear();
    if (password) {
      return this.loginByUsername(username, password);
    } else {
      return this.loginByUrl(username);
    }
  }
  private async loginByUsername(username: string, password: string) {
    this.session.username = username;
    this.session.password = password;

    let url = UserUrl.login(username);
    let headers = new HttpHeaders({
      'X-Webbrowser-Authentication': 'Forbidden',
    });
    return new Promise<User>((resolve, reject) => {
      this.http
        .get(url, { headers: headers })
        .toPromise()
        .catch((error: HttpErrorResponse) => {
          if (error.status == 403) {
            let authenticateHeader =
              error.headers.get('www-authenticate') ?? '';
            let challenge = DigestResponse.parse(authenticateHeader);
            this.session.challenge = challenge;
            let authorization = challenge.ToString(
              'GET',
              url,
              username,
              password,
              this.session.nc
            );
            headers = headers.append('Authorization', authorization);
            this.http
              .get<User>(url, { headers: headers })
              .toPromise()
              .then((x) => {
                let result = plainToInstance(User, x);
                this.store.save.info(result, username, password);
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        });
    });
  }

  private loginByUrl(url: string): Promise<User> {
    let uri = new HowellUrl(url);
    if (uri.Querys) {
      try {
        let auto = false;
        for (const key in uri.Querys) {
          let lower = key.toLocaleLowerCase();
          let value = uri.Querys[key];
          switch (lower) {
            case 'auth':
              this.clear();
              let encode = decodeURIComponent(value);
              let urlParam = base64decode(encode);
              let paramSplit = urlParam.split('&');
              this.session.username = paramSplit[0];
              this.session.password = paramSplit[1];
              auto = true;
              break;
            case 'hidetitlebar':
              this.global.HideTitlebar = JSON.parse(value);
              break;
            case 'hidebutton':
              this.global.HideButton = JSON.parse(value);
              break;
            default:
              break;
          }
        }
        if (auto) {
          //this.sessionUser.clear();
        }
      } catch (error) {
        console.error('login by url: query is null');
        throw error;
      }
    }
    return this.login(this.session.username, this.session.password);
  }

  clear() {
    this.session.clear();
    this.local.clear();
    this.global.destroy();
  }
}
