import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { OrderType } from 'src/app/enum/order-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { StoreService } from 'src/app/global/service/store.service';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { IntervalParams } from 'src/app/network/request/IParams.interface';
import { OrderModel } from 'src/app/view-model/order.model';
import { GarbageStationModel } from '../garbage-station-table/garbage-station.model';
import { GarbageStationStatisticArrayConverter } from './garbage-station-statistic.converter';
import {
  GarbageStationStatisticModel,
  GarbageStationStatisticTableSource,
} from './garbage-station-statistic.model';

@Injectable()
export class GarbageStationStatisticTableBusiness
  implements
    IBusiness<
      GarbageStationStatisticTableSource,
      GarbageStationStatisticModel[]
    >
{
  constructor(
    private storeService: StoreService,
    private stationService: GarbageStationRequestService
  ) {}

  Converter: IConverter<
    GarbageStationStatisticTableSource,
    GarbageStationStatisticModel[]
  > = new GarbageStationStatisticArrayConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    duration: IntervalParams,
    unit: TimeUnit
  ): Promise<GarbageStationStatisticModel[]> {
    let data = await this.getData(this.storeService.divisionId, duration, unit);
    let model = this.Converter.Convert(data);
    return model;
  }
  async getData(
    divisionId: string,
    duration: IntervalParams,
    unit: TimeUnit
  ): Promise<GarbageStationStatisticTableSource> {
    let source = new GarbageStationStatisticTableSource();
    source.today = await this.getHistory(divisionId, duration, unit);
    let begin = new Date(duration.BeginTime);
    begin.setDate(begin.getDate() - 1);
    let end = new Date(duration.EndTime);
    end.setDate(end.getDate() - 1);
    let yesterday: IntervalParams = {
      BeginTime: begin,
      EndTime: end,
    };
    source.yesterday = await this.getHistory(divisionId, yesterday, unit);
    return source;
  }

  async getHistory(
    divisionId: string,
    duration: IntervalParams,
    unit: TimeUnit
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let stations = await this.getStations(divisionId);
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params = Object.assign(params, duration);
    params.TimeUnit = unit;
    params.GarbageStationIds = stations.map((x) => x.Id);
    return this.stationService.statistic.number.history.list(params);
  }

  async getStations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.stationService.list(params);
    return paged.Data;
  }
}
