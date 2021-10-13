import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';

@Component({
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
})
export class MonitorComponent implements OnInit {
  showDropDown = false;

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _storeService: StoreService
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }
  ngOnInit(): void {
    let userResource = this._localStorageService.userResource;
    let userDivisionType = this._localStorageService.userDivisionType;

    if (userResource && userResource.length > 0) {
      let userDivisionId = userResource[0].Id;
      this._storeService.divisionId = userDivisionId;
      this._storeService.divisionType = userDivisionType;
    }
  }
}
