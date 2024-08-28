import { Injectable } from '@angular/core';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { GetCameraAbnormalsStatisticParams } from 'src/app/network/request/garbage-station/camera/garbage-station-camera-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  AuditStatisticDataCountStationArgs,
  AuditStatisticDataCountStationData,
} from './audit-statistic-data-count-station.model';

@Injectable()
export class AuditStatisticDataCountStationBusiness {
  constructor(private service: GarbageStationRequestService) {}
  async load(
    data: DivisionNumberStatistic
  ): Promise<AuditStatisticDataCountStationData> {
    let model = this.convert(data);
    return model;
  }

  loadData(args: AuditStatisticDataCountStationArgs) {
    let params = new GetCameraAbnormalsStatisticParams();
    params.DivisionId = args.divisionId;
    return this.service.camera.abnormal.statistic(params);
  }

  convert(source: DivisionNumberStatistic) {
    let data = new AuditStatisticDataCountStationData();
    data.drop = source.GarbageDropStationNumber ?? 0;
    data.dryFull = source.DryFullStationNumber;
    data.wetFull = source.WetFullStationNumber;
    data.normal =
      source.StationNumber - data.drop - data.dryFull - data.wetFull;
    data.all = source.StationNumber;
    return data;
  }
}
