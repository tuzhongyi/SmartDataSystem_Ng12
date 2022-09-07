import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { StoreService } from 'src/app/common/service/store.service';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DeviceStatisticConverter } from './device-statistic.converter';
import { DeviceStatisticModel } from './device-statistic.model';

@Injectable()
export class DeviceStatisticBusiness
  implements IBusiness<DivisionNumberStatistic, DeviceStatisticModel>
{
  constructor(
    private store: StoreService,
    private division: DivisionRequestService,
    private station: GarbageStationRequestService
  ) {}
  Converter: IConverter<DivisionNumberStatistic, DeviceStatisticModel> =
    new DeviceStatisticConverter();

  async load(divisionId?: string): Promise<DeviceStatisticModel> {
    if (!divisionId) {
      divisionId = this.store.divisionId;
    }
    let data = await this.getData(divisionId);

    let model = this.Converter.Convert(data);
    let stations = await this.getStation();
    model.smoke = 0;
    model.offline = 0;
    model.online = 0;
    stations.forEach((x) => {
      if (x.StationState === StationState.Normal) {
        model.online++;
        return;
      }
      let flags = new Flags(x.StationState);

      if (flags.contains(StationState.Smoke)) {
        model.smoke++;
      }
      if (flags.contains(StationState.Error)) {
        model.offline++;
      }
    });

    return model;
  }
  getData(divisionId: string): Promise<DivisionNumberStatistic> {
    return this.division.statistic.number.get(divisionId);
  }
  async getStation() {
    let params = new GetGarbageStationsParams();
    params.AncestorId = this.store.divisionId;
    let paged = await this.station.list(params);
    return paged.Data;
  }
}
