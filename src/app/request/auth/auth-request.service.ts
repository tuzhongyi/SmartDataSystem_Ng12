import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios, { AxiosError, AxiosProxyConfig, AxiosRequestConfig } from 'axios';
import { BaseUser } from 'src/app/url/base.url';
import { UsersUrl } from 'src/app/url/users.url';
import { Md5 } from 'ts-md5';
import { DigestResponse } from './digest-response.class';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private _username: string = '';
  private _password: string = '';
  private _nc: number = 0;
  private _config: AxiosRequestConfig = {};
  private _challenge: DigestResponse = new DigestResponse();

  constructor() {}
  async login(username: string, password: string) {
    this._username = username;
    this._password = password;

    // 第一次发送请求
    if (this._nc == 0) {
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

          console.log(this._challenge);

          if (challenge.realm == '') {
            challenge.realm = '/howell/ver10/data';
          }

          this._config.headers['Authorization'] = this._generateChallengeHeader(
            challenge,
            'GET',
            UsersUrl.login() + '/' + this._username
          );
          Object.assign(this._challenge, challenge);
        }
        return axios(this._config).then((res) => res.data);
      });
    } else {
      // 重复发送 Digest请求,仅仅自增 nc,复用 challenge
      if (this._challenge) {
        this._config.headers['Authorization'] = this._generateChallengeHeader(
          this._challenge,
          'GET',
          UsersUrl.login() + '/' + this._username
        );
        return axios(this._config).then((res) => res.data);
      }
      return;
    }
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

    const authHeaders = `Digest  username="${this._username}",realm="${realm}",nonce="${nonce}",uri="${uri}",algorithm="MD5",response="${response}",opaque="${opaque}",qop="${qop}",nc="${nc}",cnonce="${cnonce}"`;
    console.log(authHeaders);
    return authHeaders;
  }
  public generateHttpHeader(method: string, uri: string) {
    const authHeader = this._generateChallengeHeader(
      this._challenge,
      method,
      uri
    );
    return new HttpHeaders({
      Authorization: authHeader,
      'X-WebBrowser-Authentication': 'Forbidden',
    });
  }
}
