import { Injectable } from '@angular/core';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { AuditStatisticDataCameraService } from './audit-statistic-data-camera.service';
import { AuditStatisticDataDivisionService } from './audit-statistic-data-division.service';
import { AuditStatisticDataStationService } from './audit-statistic-data-station.service';

@Injectable()
export class AuditStatisticDataService {
  constructor(
    public sr: SRServerRequestService,
    public station: AuditStatisticDataStationService,
    public division: AuditStatisticDataDivisionService,
    public camera: AuditStatisticDataCameraService
  ) {}
}
export const AuditStatisticDataServices = [
  AuditStatisticDataService,
  AuditStatisticDataStationService,
  AuditStatisticDataDivisionService,
  AuditStatisticDataCameraService,
];
