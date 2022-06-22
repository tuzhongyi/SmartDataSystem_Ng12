import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { StoreService } from 'src/app/common/service/store.service';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { ConvertGetter } from 'src/app/view-model/converter-getter.model';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableConverter } from './garbage-drop-station-count-table.converter';
import { GarbageDropStationCountTableModel } from './garbage-drop-station-count-table.model';

@Injectable()
export class GarbageDropStationCountTableBusiness
  implements
    IBusiness<NumberStatisticV2Type[], GarbageDropStationCountTableModel[]>
{
  constructor(
    private store: StoreService,
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService
  ) {}

  Converter: IPromiseConverter<
    NumberStatisticV2Type[],
    GarbageDropStationCountTableModel[]
  > = new GarbageDropStationCountTableConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    date: Date,
    unit: TimeUnit,
    type: UserResourceType
  ): Promise<GarbageDropStationCountTableModel[]> {
    let duration = DurationParams.TimeUnit(unit, date);
    let data = await this.getData(this.store.divisionId, duration, type, unit);
    let getter: ConvertGetter = {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
    };
    let model = await this.Converter.Convert(data, getter);
    return model;
  }
  async getData(
    divisionId: string,
    duration: DurationParams,
    type: UserResourceType,
    unit: TimeUnit
  ): Promise<NumberStatisticV2Type[]> {
    if (type === UserResourceType.Station) {
      let stations = await this.getGarbageStationList(divisionId);
      let ids = stations.map((x) => x.Id);
      return this.getGarbageStationData(ids, duration, unit);
    } else {
      let divisionType = EnumHelper.ConvertUserResourceToDivision(type);
      let divisions = await this.getDivisionList(divisionId, divisionType);
      let ids = divisions.map((x) => x.Id);
      return this.getDivisionData(ids, duration, unit);
    }
  }

  async getGarbageStationList(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    let paged = await this.stationService.list(params);
    return paged.Data;
  }
  async getDivisionList(divisionId: string, divisionType: DivisionType) {
    let params = new GetDivisionsParams();
    params.DivisionType = divisionType;
    params.AncestorId = divisionId;
    let paged = await this.divisionService.list(params);
    return paged.Data;
  }

  getGarbageStationData(
    stationIds: string[],
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    params.GarbageStationIds = stationIds;
    return this.stationService.statistic.number.history.list(params);
  }
  getDivisionData(
    divisionIds: string[],
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let params = new GetDivisionStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    params.DivisionIds = divisionIds;
    return this.divisionService.statistic.number.history.list(params);
  }
}
