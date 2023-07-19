import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import {
  GlobalStorageService,
  SystemType,
} from '../../service/global-storage.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less'],
})
export class AccountInfoComponent implements OnInit {
  desc: string = '生活垃圾分类全程监管平台';
  title: string = '';

  constructor(
    private _localStorageService: LocalStorageService,
    store: GlobalStorageService
  ) {
    switch (store.system) {
      case SystemType.garbage:
        this.desc = '生活垃圾分类全程监管平台';
        break;
      case SystemType.vehicle:
        this.desc = '生活垃圾清运监管平台';
        break;

      default:
        break;
    }
  }

  ngOnInit(): void {
    let user = this._localStorageService.user;
    if (user.Resources?.length) {
      this.title = user.Resources[0].Name ?? '';
    }

    if (user.Role.length) {
      let role = user.Role[0];
      if (
        role.PictureData &&
        role.PrivacyData &&
        role.UserData &&
        role.StaticData
      ) {
        // console.log('当前是管理员');
        this.title = this.desc;
        this.desc = '';
      }
    }
  }
}
