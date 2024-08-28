import { Injectable } from '@angular/core';
import { GetCameraAbnormalsStatisticParams } from 'src/app/network/request/garbage-station/camera/garbage-station-camera-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AuditStatisticDataCameraService {
  constructor(private service: GarbageStationRequestService) {}

  manualCapture(stationId: string) {
    return this.service.manualCapture(stationId);
  }

  abnomal = {
    statistic: (divisionId?: string, hours: number = 72) => {
      let params = new GetCameraAbnormalsStatisticParams();
      params.DivisionId = divisionId;
      params.InHours = hours;
      return this.service.camera.abnormal.statistic(params);
    },
  };
}
