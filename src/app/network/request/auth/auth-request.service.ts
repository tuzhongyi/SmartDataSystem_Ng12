import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { plainToClass } from 'class-transformer';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { SessionStorageService } from 'src/app/global/service/session-storage.service';
import { UsersUrl } from 'src/app/network/url/users.url';
import { Md5 } from 'ts-md5';
import { User } from '../../model/user.model';
import { DigestResponse } from './digest-response.class';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService implements CanActivate {
  private _username: string = '';
  private _password: string = '';
  private _nc: number = 0;
  private _config: AxiosRequestConfig = {};

  constructor(
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService,
    private _cookieService: CookieService,
    private _router: Router
  ) {
    if (this._cookieService.check('userName')) {
      let userName = this._cookieService.get('userName');
      userName = atob(userName);
      let res = userName.match(
        /[a-zA-Z0-9+/=]{32}(?<userName>\w*)[a-zA-Z0-9+/=]{32}/
      )!;
      userName = res.groups!['userName'];

      this._username = userName;
    }

    if (this._cookieService.check('passWord')) {
      let passWord = this._cookieService.get('passWord');
      passWord = atob(passWord);
      let res2 = passWord.match(
        /[a-zA-Z0-9+/=]{32}(?<passWord>\w*)[a-zA-Z0-9+/=]{32}/
      )!;
      passWord = res2.groups!['passWord'];

      this._password = passWord;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log(route, state);
    let challenge = this._sessionStorageService.challenge;
    let userId = this._localStorageService.userId;
    let holdCookie = this._cookieService.check('userName');
    // console.log(userResource);
    if (challenge && userId && holdCookie) {
      return true;
    }

    return this._router.parseUrl('/login');
  }
  async login(username: string, password: string) {
    this._username = username;
    this._password = password;
    this._config.url = UsersUrl.login() + '/' + username;

    this._config.headers = {
      'X-Webbrowser-Authentication': 'Forbidden',
    };

    return axios(this._config).catch((error: AxiosError) => {
      if (error.response?.status == 403) {
        let headers = error.response.headers;
        let authenticateHeader = Reflect.get(headers, 'www-authenticate');

        // 将 header字符串转成对象
        let challenge = this._parseAuthenticateHeader(authenticateHeader);

        console.log('challenge', challenge);

        this._config.headers['Authorization'] = this._generateChallengeHeader(
          challenge,
          'GET',
          UsersUrl.login() + '/' + username
        );
        this._sessionStorageService.challenge = challenge;
        return axios(this._config).then((res: AxiosResponse<User>) =>
          plainToClass(User, res.data)
        );
      }
      return null;
    });
  }

  /**
   *  自成一体的函数，可单独提出去使用
   * @param authenticate
   * @returns
   */
  private _parseAuthenticateHeader(authenticate: string): DigestResponse {
    let fields_str = authenticate.replace(/Digest\s/i, '');
    let fields_arr = fields_str.split(',');

    let challenge = new DigestResponse();

    let len = fields_arr.length;
    for (let i = 0; i < len; i++) {
      var values = /([a-zA-Z]+)=\"?([a-zA-Z0-9.@\/\s]+)\"?/.exec(fields_arr[i]);
      if (values) challenge[values[1]] = values[2];
    }
    // console.log(challenge);
    return challenge;
  }
  private _generateChallengeHeader(
    challenge: DigestResponse,
    method: string,
    uri: string
  ) {
    const realm = challenge.realm;
    const nonce = challenge.nonce;

    // 范围:[00000000,ffffffff]
    this._nc++;
    const nc = this._nc.toString(16).padStart(8, '0');

    // 16位随机数
    const cnonce = Md5.hashStr(
      ((Math.random() * 1e9) | 0).toString(16).padStart(8, '0')
    );

    const qop = challenge.qop;

    const opaque = challenge.opaque;

    const hash1 = Md5.hashStr(`${this._username}:${realm}:${this._password}`);

    const hash2 = Md5.hashStr(`${method}:${uri}`);
    const response = Md5.hashStr(
      `${hash1}:${nonce}:${nc}:${cnonce}:${qop}:${hash2}`
    );

    const authHeaders = `Digest username="${this._username}",realm="${realm}",nonce="${nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${nc}",cnonce="${cnonce}"`;
    // console.log('authHeaders', authHeaders);
    return authHeaders;
  }
  public generateHttpHeader(method: string, uri: string) {
    let chanllenge = this._sessionStorageService.challenge;
    // console.log(chanllenge);
    const authHeader = this._generateChallengeHeader(chanllenge, method, uri);
    return new HttpHeaders({
      Authorization: authHeader,
      'X-WebBrowser-Authentication': 'Forbidden',
    });
  }
}
