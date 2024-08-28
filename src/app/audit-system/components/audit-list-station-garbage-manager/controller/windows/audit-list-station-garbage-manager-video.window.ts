import { Injectable } from '@angular/core';
import { AuditListStationGarbageManagerVideoMultipleWindow } from './audit-list-station-garbage-manager-video-multiple.window';
import { AuditListStationGarbageManagerVideoSingleWindow } from './audit-list-station-garbage-manager-video-single.window';
@Injectable()
export class AuditListStationGarbageManagerVideoWindow {
  constructor(
    public single: AuditListStationGarbageManagerVideoSingleWindow,
    public multiple: AuditListStationGarbageManagerVideoMultipleWindow
  ) {}
}
