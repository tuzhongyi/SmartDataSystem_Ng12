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
import { AuditStatisticDataCountDeviceData } from './audit-statistic-data-count-device.model';

@Injectable()
export class AuditStatisticDataCountDeviceBusiness
  implements
    IBusiness<DivisionNumberStatistic, AuditStatisticDataCountDeviceData>
{
  constructor(
    private service: DivisionRequestService,
    private global: GlobalStorageService
  ) {}
  async load(
    data?: DivisionNumberStatistic
  ): Promise<AuditStatisticDataCountDeviceData> {
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
    statistic.CameraNumber = 0;
    statistic.OfflineCameraNumber = 0;

    for (let i = 0; i < paged.Data.length; i++) {
      const data = paged.Data[i];
      statistic.CameraNumber += data.CameraNumber;
      statistic.OfflineCameraNumber += data.OfflineCameraNumber;
    }
    return statistic;
  }
  private async divisions() {
    let params = new GetDivisionsParams();
    params.DivisionType = DivisionType.City;
    let paged = await this.service.list(params);
    return paged.Data;
  }

  private convert(source: DivisionNumberStatistic) {
    let data = new AuditStatisticDataCountDeviceData();
    data.all = source.CameraNumber;
    data.offline = source.OfflineCameraNumber;
    data.online = data.all - data.offline;
    return data;
  }
}
