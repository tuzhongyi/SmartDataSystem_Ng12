import { Injectable } from '@angular/core';
import { GetGarbageStationAbnormalsStatisticParams } from 'src/app/network/request/garbage-station/abnormal/garbage-station-abnormal-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AuditStatisticDataStationService {
  constructor(private service: GarbageStationRequestService) {}

  abnomal = {
    statistic: (divisionId?: string, hours: number = 72) => {
      let params = new GetGarbageStationAbnormalsStatisticParams();
      params.DivisionId = divisionId;
      params.InHours = hours;
      return this.service.abnormal.statistic(params);
    },
  };
}
