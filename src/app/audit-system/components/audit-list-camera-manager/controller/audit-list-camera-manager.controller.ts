import { Injectable } from '@angular/core';
import { AuditListCameraManagerDivisionController } from './audit-list-camera-manager-division.controller';
import {
  AuditListCameraManagerWindowController,
  AuditListCameraManagerWindowControllers,
} from './window/audit-list-camera-manager-window.controller';

@Injectable()
export class AuditListCameraManagerController {
  constructor(
    public division: AuditListCameraManagerDivisionController,
    public window: AuditListCameraManagerWindowController
  ) {}
}

export const AuditListCameraManagerControllers = [
  AuditListCameraManagerController,
  AuditListCameraManagerDivisionController,
  ...AuditListCameraManagerWindowControllers,
];
