import { Injectable } from '@angular/core';
import { AuditListStationGarbageManagerDivisionController } from './audit-list-station-garbage-manager-division.controller';

@Injectable()
export class AuditListStationGarbageManagerController {
  constructor(
    public division: AuditListStationGarbageManagerDivisionController
  ) {}
}
