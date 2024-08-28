import { Injectable } from '@angular/core';
import { AuditListCameraManagerConfigWindow } from './audit-list-camera-manager-config.window';
import { AuditListCameraManagerVideoWindow } from './audit-list-camera-manager-video.window';

@Injectable()
export class AuditListCameraManagerWindowController {
  constructor(
    public video: AuditListCameraManagerVideoWindow,
    public config: AuditListCameraManagerConfigWindow
  ) {}
}
export const AuditListCameraManagerWindowControllers = [
  AuditListCameraManagerWindowController,
  AuditListCameraManagerVideoWindow,
  AuditListCameraManagerConfigWindow,
];
