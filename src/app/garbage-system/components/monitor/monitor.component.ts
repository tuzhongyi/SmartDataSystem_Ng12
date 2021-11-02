/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: pmx
 * @Last Modified time: 2021-11-02 16:41:11
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from 'src/app/common/components/toolbar/toolbar.component';
import { EventType } from 'src/app/enum/event-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';

@Component({
  selector: 'app-waste-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.less'],
})
export class MonitorComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;

  @ViewChild(ToolbarComponent) toolbar?: ToolbarComponent;

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _storeService: StoreService
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }
  ngOnInit(): void {
    // 保存全局区划Id
    let userResource = this._localStorageService.userResource;
    let userDivisionType = this._localStorageService.userDivisionType;

    if (userResource && userResource.length > 0) {
      let userDivisionId = userResource[0].Id;
      this._storeService.divisionId = userDivisionId;
      this._storeService.divisionType = userDivisionType;
    }
  }
  clickMonitor() {
    console.log('click monitor');
    if (this.toolbar) {
      this.toolbar.showDropDown = false;
    }
  }
}
