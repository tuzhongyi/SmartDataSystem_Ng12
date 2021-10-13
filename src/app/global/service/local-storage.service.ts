import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResource } from 'src/app/network/model/user.model';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2021-10-13 13:41:27
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
