import { Injectable } from '@angular/core';
import { CommitteesDeviceWindowBusiness } from './windows/committees-device-window.business';
import { CommitteesRecordWindowBusiness } from './windows/committees-event-record-window.business';
import { CommitteesMediaWindowBusiness } from './windows/committees-media-window.business';
import { CommitteesGarbageStationDropWindowBusiness } from './windows/committees-station-drop-window.business';
import { CommitteesGarbageStationFullWindowBusiness } from './windows/committees-station-full-window.business';
import { CommitteesGarbageStationInfoWindowBusiness } from './windows/committees-station-info-window.business';

@Injectable()
export class CommitteesWindowBussiness {
  constructor(
    public record: CommitteesRecordWindowBusiness,
    public media: CommitteesMediaWindowBusiness,
    public device: CommitteesDeviceWindowBusiness,
    public full: CommitteesGarbageStationFullWindowBusiness,
    public drop: CommitteesGarbageStationDropWindowBusiness,
    public station: CommitteesGarbageStationInfoWindowBusiness
  ) {}
}
