import { Injectable } from '@angular/core';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2021-09-28 16:33:11
 */
import { Md5 } from 'ts-md5';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {
    console.log(Md5.hashAsciiStr('sdf'));
  }

  set userName(userName: string) {
    localStorage.setItem('userName', userName);
  }
  get userName() {
    return localStorage.getItem('userName') ?? '';
  }
  set passWord(passWord: string) {
    localStorage.setItem('passWord', passWord);
  }
  get passWord() {
    return localStorage.getItem('passWord') ?? '';
  }

  set savePassWord(flag: boolean) {
    localStorage.setItem('savePassWord', JSON.stringify(flag));
  }
  get savePassWord() {
    let flag = localStorage.getItem('savePassWord');
    return flag == null ? false : JSON.parse(flag);
  }
  set autoLogin(flag: boolean) {
    localStorage.setItem('autoLogin', JSON.stringify(flag));
  }
  get autoLogin() {
    let flag = localStorage.getItem('autoLogin');
    return flag == null ? false : JSON.parse(flag);
  }

  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
