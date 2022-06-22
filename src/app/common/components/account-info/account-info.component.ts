import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.less'],
})
export class AccountInfoComponent implements OnInit {
  desc: string = '生活垃圾分类全程监管平台';
  title: string = '';

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      this.title = user.Resources[0].Name ?? '';
    }

    if (user.Role && user.Role.length > 0) {
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
