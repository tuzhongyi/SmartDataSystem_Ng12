import { Injectable } from '@angular/core';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { StreamType } from 'src/app/enum/stream-type.enum';
import { User } from 'src/app/network/model/garbage-station/user.model';

/*
 * @Author: pmx
 * @Date: 2021-09-14 14:59:21
 * @Last Modified by: zzl
 * @Last Modified time: 2023-01-05 16:46:59
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

  public get guide(): boolean {
    let guide = localStorage.getItem('guide');
    return guide ? JSON.parse(guide) : false;
  }
  public set guide(v: boolean) {
    localStorage.setItem('guide', JSON.stringify(v));
  }

  static Get<T>(key: string, cls: ClassConstructor<T>): T | undefined {
    let plain = localStorage.getItem(key);
    if (plain) {
      return plainToInstance(cls, plain);
    }
    return;
  }

  static Set<T>(key: string, value: T) {
    // let plain = instanceToPlain(value);
    // localStorage.setItem(key, JSON.stringify(plain));
    localStorage.setItem(key, JSON.stringify(value));
  }

  video = {
    stream: StreamType.main,
    rule: false,
  };

  clear(name?: string) {
    if (name) {
      localStorage.removeItem(name);
    } else {
      let guide = this.guide;
      localStorage.clear();
      this.guide = guide;
    }
  }
}
