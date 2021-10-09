import { Injectable } from '@angular/core';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-08 15:27:39
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
