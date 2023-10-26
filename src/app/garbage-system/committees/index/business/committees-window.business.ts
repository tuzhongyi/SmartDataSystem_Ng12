import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { CommitteesDeviceWindowBusiness } from './windows/committees-device-window.business';
import { CommitteesRecordWindowBusiness } from './windows/committees-event-record-window.business';
import { CommitteesIndexImageWindowBusiness } from './windows/committees-image-window.business';

import { CommitteesMediaWindowBusiness } from './windows/committees-media-window.business';
import { CommitteesGarbageStationDropWindowBusiness } from './windows/committees-station-drop-window.business';
import { CommitteesGarbageStationFullWindowBusiness } from './windows/committees-station-full-window.business';
import { CommitteesGarbageStationInfoWindowBusiness } from './windows/committees-station-info-window.business';
import { CommitteesVideoWindowBusiness } from './windows/committees-video-window.business';
import { MobileWindowViewModel } from './windows/mobile-window';
import { PasswordWindowViewModel } from './windows/password-window';
import { SummaryWindowViewModel } from './windows/summary-window';

@Injectable()
export class CommitteesWindowBussiness {
  constructor(
    public record: CommitteesRecordWindowBusiness,
    public media: CommitteesMediaWindowBusiness,
    public device: CommitteesDeviceWindowBusiness,
    public full: CommitteesGarbageStationFullWindowBusiness,
    public drop: CommitteesGarbageStationDropWindowBusiness,
    public stationInfo: CommitteesGarbageStationInfoWindowBusiness,
    public video: CommitteesVideoWindowBusiness,
    public image: CommitteesIndexImageWindowBusiness,
    private local: LocalStorageService
  ) {
    this.password = new PasswordWindowViewModel();
    this.mobile = new MobileWindowViewModel(local.user);
    this.summary = new SummaryWindowViewModel();
  }
  mobile: MobileWindowViewModel;
  password: PasswordWindowViewModel;
  summary: SummaryWindowViewModel;

  private _station?: GarbageStation;
  public get station(): GarbageStation | undefined {
    return this._station;
  }
  public set station(v: GarbageStation | undefined) {
    this._station = v;
    if (this._station) {
      this.record.stationId = this._station.Id;
      this.stationInfo.stationId = this._station.Id;
    }
  }
}
