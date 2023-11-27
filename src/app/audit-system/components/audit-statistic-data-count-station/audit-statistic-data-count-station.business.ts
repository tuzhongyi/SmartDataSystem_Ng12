import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { AuditStatisticDataCountStationData } from './audit-statistic-data-count-station.model';

@Injectable()
export class AuditStatisticDataCountStationBusiness
  implements
    IBusiness<DivisionNumberStatistic, AuditStatisticDataCountStationData>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}
  async load(
    data?: DivisionNumberStatistic
  ): Promise<AuditStatisticDataCountStationData> {
    if (!data) {
      data = await this.getData(this.global.divisionId);
    }
    let model = this.convert(data);
    return model;
  }
  async getData(divisionId?: string): Promise<DivisionNumberStatistic> {
    if (divisionId) {
      return this.service.statistic.number.get(divisionId);
    }
    let params = new GetDivisionStatisticNumbersParams();

    let divisions = await this.divisions();
    params.Ids = divisions.map((x) => x.Id);

    let paged = await this.service.statistic.number.list(params);
    let statistic = new DivisionNumberStatistic();
    statistic.StationNumber = 0;
    statistic.GarbageDropStationNumber = 0;
    statistic.DryFullStationNumber = 0;
    statistic.WetFullStationNumber = 0;

    for (let i = 0; i < paged.Data.length; i++) {
      const data = paged.Data[i];
      statistic.StationNumber += data.StationNumber;
      statistic.GarbageDropStationNumber += data.GarbageDropStationNumber ?? 0;
      statistic.DryFullStationNumber += data.DryFullStationNumber;
      statistic.WetFullStationNumber += data.WetFullStationNumber;
    }
    return statistic;
  }

  async divisions() {
    let params = new GetDivisionsParams();
    params.DivisionType = DivisionType.City;
    let paged = await this.service.list(params);
    return paged.Data;
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
