/*
 * @Author: pmx
 * @Date: 2021-10-13 15:02:28
 * @Last Modified by: zzl
 * @Last Modified time: 2022-01-10 16:08:27
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { EventType } from 'src/app/enum/event-type.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommitteesIndexEventTriggerBusiness } from './business/committees-index-event-trigger.business';
import { CommitteesIndexNavicationBusiness } from './business/committees-index-navication.business';
import { CommitteesIndexPatrolControlBusiness } from './business/committees-index-patrol-control.business';
import { CommitteesWindowBussiness } from './business/committees-window.business';
import { CommitteesDeviceWindowBusiness } from './business/windows/committees-device-window.business';
import { CommitteesRecordWindowBusiness } from './business/windows/committees-event-record-window.business';
import { CommitteesIndexImageArrayWindowBusiness } from './business/windows/committees-image-array-window.business';
import { CommitteesIndexImagePageWindowBusiness } from './business/windows/committees-image-page-window.business';
import { CommitteesIndexImageWindowBusiness } from './business/windows/committees-image-window.business';
import { CommitteesMediaMultipleWindowBusiness } from './business/windows/committees-media-multiple-window.business';
import { CommitteesMediaSingleWindowBusiness } from './business/windows/committees-media-single-window.business';
import { CommitteesMediaWindowBusiness } from './business/windows/committees-media-window.business';
import { CommitteesGarbageStationDropWindowBusiness } from './business/windows/committees-station-drop-window.business';
import { CommitteesGarbageStationFullWindowBusiness } from './business/windows/committees-station-full-window.business';
import { CommitteesGarbageStationInfoWindowBusiness } from './business/windows/committees-station-info-window.business';
import { CommitteesVideoControlWindowBusiness } from './business/windows/committees-video-control-window.business';
import { CommitteesVideoWindowBusiness } from './business/windows/committees-video-window.business';
import { CommitteesIndexBusiness } from './index.component.business';
import { CommitteesIndexService } from './index.component.service';

@Component({
  selector: 'app-committees-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less'],
  providers: [
    CommitteesIndexService,
    CommitteesIndexEventTriggerBusiness,
    CommitteesIndexPatrolControlBusiness,
    CommitteesVideoControlWindowBusiness,
    CommitteesVideoWindowBusiness,
    CommitteesRecordWindowBusiness,
    CommitteesMediaSingleWindowBusiness,
    CommitteesMediaMultipleWindowBusiness,
    CommitteesMediaWindowBusiness,
    CommitteesDeviceWindowBusiness,
    CommitteesGarbageStationFullWindowBusiness,
    CommitteesGarbageStationDropWindowBusiness,
    CommitteesGarbageStationInfoWindowBusiness,
    CommitteesWindowBussiness,
    CommitteesIndexNavicationBusiness,
    CommitteesIndexBusiness,

    CommitteesIndexImageWindowBusiness,
    CommitteesIndexImagePageWindowBusiness,
    CommitteesIndexImageArrayWindowBusiness,
  ],
})
export class CommitteesIndexComponent implements OnInit {
  public illegalDropType: EventType = EventType.IllegalDrop;
  public mixIntoType: EventType = EventType.MixedInto;
  get HideButton(): boolean {
    return this.global.HideButton;
  }
  get HideTitlebar(): boolean {
    return this.global.HideTitlebar;
  }

  constructor(
    private service: CommitteesIndexService,
    public business: CommitteesIndexBusiness,
    private _titleService: Title,
    private _localStorageService: LocalStorageService,
    private global: GlobalStorageService,
    public window: CommitteesWindowBussiness,
    public trigger: CommitteesIndexEventTriggerBusiness,
    public patrol: CommitteesIndexPatrolControlBusiness,
    public video: CommitteesVideoControlWindowBusiness,
    public navication: CommitteesIndexNavicationBusiness,
    private activatedRoute: ActivatedRoute
  ) {
    this._titleService.setTitle('生活垃圾分类全程监管平台');
    this.global.interval.run();
  }

  config(route: ActivatedRoute) {
    route.queryParams.subscribe((param) => {
      // console.log("HideButton:", param);
      for (const key in param) {
        let lower = key.toLocaleLowerCase();
        let value: any;
        try {
          value = JSON.parse(param[key]);
          switch (lower) {
            case 'hidebutton':
              this.global.HideButton = value;
              break;
            case 'hidetitlebar':
              this.global.HideTitlebar = value;
              break;
            default:
              break;
          }
        } catch {}
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

      this.global.divisionId = userDivisionId;
      this.global.divisionType = userDivisionType;
    }

    this.service.getCommittees(this.global.divisionId).then((x: Division) => {
      this.navication.committees = x;
    });
    this.service
      .getStationList(this.global.divisionId)
      .then((x: GarbageStation[]) => {
        this.navication.stations = x;
      });
  }
}
