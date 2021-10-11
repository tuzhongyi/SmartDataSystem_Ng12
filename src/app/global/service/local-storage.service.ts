import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResource } from 'src/app/network/model/user.model';

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

  // 用cookie代替，因为可以手动设置过期时间

  // set userName(userName: string) {
  //   localStorage.setItem('userName', userName);
  // }
  // get userName() {
  //   return localStorage.getItem('userName') ?? '';
  // }
  // set passWord(passWord: string) {
  //   localStorage.setItem('passWord', passWord);
  // }
  // get passWord() {
  //   return localStorage.getItem('passWord') ?? '';
  // }

  // set savePassWord(flag: boolean) {
  //   localStorage.setItem('savePassWord', JSON.stringify(flag));
  // }
  // get savePassWord() {
  //   let flag = localStorage.getItem('savePassWord');
  //   return flag == null ? false : JSON.parse(flag);
  // }
  // set autoLogin(flag: boolean) {
  //   localStorage.setItem('autoLogin', JSON.stringify(flag));
  // }
  // get autoLogin() {
  //   let flag = localStorage.getItem('autoLogin');
  //   return flag == null ? false : JSON.parse(flag);
  // }

  set userId(userId: string) {
    localStorage.setItem('userId', userId);
  }
  get userId() {
    return localStorage.getItem('userId') ?? '';
  }

  set userResource(userResource: Array<UserResource>) {
    localStorage.setItem('userResouce', JSON.stringify(userResource));
  }
  get userResource() {
    let userResource_str = localStorage.getItem('userResouce');

    return userResource_str == null ? null : JSON.parse(userResource_str);
  }

  set userDivisionType(divisionType: DivisionType) {
    localStorage.setItem('userDivisionType', JSON.stringify(divisionType));
  }
  get userDivisionType(): DivisionType {
    let divisionTypeStr = localStorage.getItem('userDivisionType');

    return divisionTypeStr == null ? null : JSON.parse(divisionTypeStr);
  }

  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
