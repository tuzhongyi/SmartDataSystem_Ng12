import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { LocalStorageService } from 'src/app/global/service/local-storage.service';
import { StoreService } from 'src/app/global/service/store.service';
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
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { EventRecordCountTableConverter } from './event-record-count-table.converter';
import {
  EventRecordCountTableModel,
  EventRecordCountTableOptions,
} from './event-record-count-table.model';

@Injectable()
export class EventRecordCountTableBusiness
  implements IBusiness<NumberStatisticV2Type[], EventRecordCountTableModel[]>
{
  constructor(
    private stationService: GarbageStationRequestService,
    private divisionService: DivisionRequestService,
    private store: StoreService,
    private local: LocalStorageService
  ) {}

  Converter = new EventRecordCountTableConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    opts: EventRecordCountTableOptions
  ): Promise<EventRecordCountTableModel[]> {
    let id = opts.id;
    if (!id) {
      id = this.store.divisionId;
    }
    let type = opts.type;
    if (!type) {
      type = this.local.user.Resources![0].ResourceType;
    }
    let data = await this.getData(id, type, opts);
    let getter = {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
    };
    let model = await this.Converter.Convert(data, opts.eventType, getter);
    return model;
  }
  async getData(
    id: string,
    type: UserResourceType,
    opts: EventRecordCountTableOptions
  ): Promise<NumberStatisticV2Type[]> {
    let interval = new DurationParams();
    interval.BeginTime = opts.BeginTime;
    interval.EndTime = opts.EndTime;
    if (opts.type === UserResourceType.Station) {
      let stations = await this.getGarbageStationList(id);
      let ids = stations.map((x) => x.Id);
      return this.getGarbageStationData(ids, interval, opts.unit);
    } else {
      let divisionType = EnumHelper.ConvertUserResourceToDivision(type);
      let divisions = await this.getDivisionList(id, divisionType);
      let ids = divisions.map((x) => x.Id);
      return this.getDivisionData(ids, interval, opts.unit);
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
