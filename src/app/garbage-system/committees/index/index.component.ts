/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: zzl
 * @Last Modified time: 2022-01-10 16:08:27
 */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';
import { CommitteesIndexEventTriggerBusiness } from '../business/committees-index-event-trigger.business';
import { CommitteesPatrolControlBusiness } from '../business/committees-patrol-control.business';
import { CommitteesWindowBussiness } from '../business/committees-window.business';
import { CommitteesDeviceWindowBusiness } from '../business/windows/committees-device-window.business';
import { CommitteesRecordWindowBusiness } from '../business/windows/committees-event-record-window.business';
import { CommitteesMediaMultipleWindowBusiness } from '../business/windows/committees-media-multiple-window.business';
import { CommitteesMediaSingleWindowBusiness } from '../business/windows/committees-media-single-window.business';
import { CommitteesMediaWindowBusiness } from '../business/windows/committees-media-window.business';
import { CommitteesGarbageStationDropWindowBusiness } from '../business/windows/committees-station-drop-window.business';
import { CommitteesGarbageStationFullWindowBusiness } from '../business/windows/committees-station-full-window.business';
import { CommitteesGarbageStationInfoWindowBusiness } from '../business/windows/committees-station-info-window.business';
import { CommitteesVideoControlWindowBusiness } from '../business/windows/committees-video-control-window.business';

@Component({
  selector: 'app-committees-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [
    CommitteesIndexEventTriggerBusiness,
    CommitteesPatrolControlBusiness,
    CommitteesVideoControlWindowBusiness,
    CommitteesRecordWindowBusiness,
    CommitteesMediaSingleWindowBusiness,
    CommitteesMediaMultipleWindowBusiness,
    CommitteesMediaWindowBusiness,
    CommitteesDeviceWindowBusiness,
    CommitteesGarbageStationFullWindowBusiness,
    CommitteesGarbageStationDropWindowBusiness,
    CommitteesGarbageStationInfoWindowBusiness,
    CommitteesWindowBussiness,
  ],
})
export class CommitteesIndexComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton():boolean{
    return this._storeService.HideButton;
  }
  get HideTitlebar():boolean{
    return this._storeService.HideTitlebar;
  }

  constructor(
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private _storeService: StoreService,
    public window: CommitteesWindowBussiness,
    public trigger: CommitteesIndexEventTriggerBusiness,    
    public patrol: CommitteesPatrolControlBusiness,
    public video: CommitteesVideoControlWindowBusiness,    
    private activatedRoute: ActivatedRoute
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
  }


  config(route: ActivatedRoute) {
    route.queryParams.subscribe((param) => {
      // console.log("HideButton:", param);
      for (const key in param) {
        let lower = key.toLocaleLowerCase();
        let value: any
        try {
          value = JSON.parse(param[key]);
          switch (lower) {
            case "hidebutton":
              this._storeService.HideButton = value;
              break;
            case "hidetitlebar":
              this._storeService.HideTitlebar = value;
              break;
            default:
              break;
          }
        } catch {
        }
      }
    });
  }


  ngOnInit(): void {

    this.config(this.activatedRoute);
    let user = this._localStorageService.user;
    if (user.Resources && user.Resources.length > 0) {
      let userDivisionId = user.Resources[0].Id;
      let resourceType = user.Resources[0].ResourceType;
      let userDivisionType =
        EnumHelper.ConvertUserResourceToDivision(resourceType);

      this._storeService.divisionId = userDivisionId;
      this._storeService.divisionType = userDivisionType;
    }
  }
}
