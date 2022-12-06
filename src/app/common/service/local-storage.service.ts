import { Injectable } from '@angular/core';
import {
  ClassConstructor,
  classToPlain,
  ClassTransformer,
  plainToClass,
} from 'class-transformer';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { User, UserResource } from 'src/app/network/model/user.model';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-23 11:27:50
 */
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set user(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }
  get user(): User {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static Get<T>(key: string, cls: ClassConstructor<T>): T | undefined {
    let plain = localStorage.getItem(key);
    if (plain) {
      return plainToClass(cls, plain);
    }
    return;
  }

  static Set<T>(key: string, value: T) {
    let plain = classToPlain(value);
    localStorage.setItem(key, JSON.stringify(plain));
  }

  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      localStorage.clear();
    }
  }
}
