import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { DeviceStatusConverter } from './device-status.converter';
import { DeviceStatusModel } from './device-status.model';

@Injectable()
export class DeviceStatusBusiness
  implements IBusiness<DivisionNumberStatistic, DeviceStatusModel>
{
  constructor(
    private store: StoreService,
    private division: DivisionRequestService
  ) {}
  Converter: IConverter<DivisionNumberStatistic, DeviceStatusModel> =
    new DeviceStatusConverter();
  async load(divisionId?: string): Promise<DeviceStatusModel> {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    let data = await this.getData(divisionId);
    let model = this.Converter.Convert(data);
    return model;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.division.statistic.number.get(divisionId);
  }
}
