import { Injectable } from '@angular/core';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { AuditListStationGarbageManagerCameraWindow } from './windows/audit-list-station-garbage-manager-cameras.window';
import { AuditListStationGarbageManagerCommandWindow } from './windows/audit-list-station-garbage-manager-command.window';
import { AuditListStationGarbageManagerConfigWindow } from './windows/audit-list-station-garbage-manager-config.window';
import { AuditListStationGarbageManagerConstructionWindow } from './windows/audit-list-station-garbage-manager-construction.window';
import { AuditListStationGarbageManagerDeviceWindow } from './windows/audit-list-station-garbage-manager-device.window';
import { AuditListStationGarbageManagerDropWindowsWindow } from './windows/audit-list-station-garbage-manager-drop-windows.window';
import { AuditListStationGarbageManagerEventDisabledsWindow } from './windows/audit-list-station-garbage-manager-event-disableds.window';
import { AuditListStationGarbageManagerGCHAWindow } from './windows/audit-list-station-garbage-manager-gcha.window';
import { AuditListStationGarbageManagerMembersWindow } from './windows/audit-list-station-garbage-manager-members.window';
import { AuditListStationGarbageManagerNBBoxWindow } from './windows/audit-list-station-garbage-manager-nb-box.window';
import { AuditListStationGarbageManagerScheduleWindow } from './windows/audit-list-station-garbage-manager-schedule.window';
import { AuditListStationGarbageManagerStatusWindow } from './windows/audit-list-station-garbage-manager-status.window';
import { AuditListStationGarbageManagerTrashcansWindow } from './windows/audit-list-station-garbage-manager-trashcans.window';
import { AuditListStationGarbageManagerVideoMultipleWindow } from './windows/audit-list-station-garbage-manager-video-multiple.window';
import { AuditListStationGarbageManagerVideoSingleWindow } from './windows/audit-list-station-garbage-manager-video-single.window';
import { AuditListStationGarbageManagerVideoWindow } from './windows/audit-list-station-garbage-manager-video.window';

@Injectable()
export class AuditListStationGarbageManagerWindow {
  constructor(
    public video: AuditListStationGarbageManagerVideoWindow,
    public camera: AuditListStationGarbageManagerCameraWindow,
    public member: AuditListStationGarbageManagerMembersWindow,
    public trashcan: AuditListStationGarbageManagerTrashcansWindow,
    public dropwindow: AuditListStationGarbageManagerDropWindowsWindow,
    public schedule: AuditListStationGarbageManagerScheduleWindow,
    public command: AuditListStationGarbageManagerCommandWindow,
    public config: AuditListStationGarbageManagerConfigWindow,
    public eventdisabled: AuditListStationGarbageManagerEventDisabledsWindow,
    public construction: AuditListStationGarbageManagerConstructionWindow,
    public status: AuditListStationGarbageManagerStatusWindow,
    public nb: AuditListStationGarbageManagerNBBoxWindow,
    public gcha: AuditListStationGarbageManagerGCHAWindow,
    public device: AuditListStationGarbageManagerDeviceWindow
  ) {}

  onvideosingle(camera: Camera) {
    this.video.single.title = camera.Name;
    this.video.single.cameraId = camera.Id;
    this.video.single.show = true;
  }
}

export const AuditListStationGarbageManagerWindows = [
  AuditListStationGarbageManagerWindow,
  AuditListStationGarbageManagerCameraWindow,
  AuditListStationGarbageManagerMembersWindow,
  AuditListStationGarbageManagerTrashcansWindow,
  AuditListStationGarbageManagerDropWindowsWindow,
  AuditListStationGarbageManagerScheduleWindow,
  AuditListStationGarbageManagerCommandWindow,
  AuditListStationGarbageManagerConfigWindow,
  AuditListStationGarbageManagerVideoSingleWindow,
  AuditListStationGarbageManagerVideoMultipleWindow,
  AuditListStationGarbageManagerVideoWindow,
  AuditListStationGarbageManagerEventDisabledsWindow,
  AuditListStationGarbageManagerConstructionWindow,
  AuditListStationGarbageManagerStatusWindow,
  AuditListStationGarbageManagerNBBoxWindow,
  AuditListStationGarbageManagerGCHAWindow,
  AuditListStationGarbageManagerDeviceWindow,
];
