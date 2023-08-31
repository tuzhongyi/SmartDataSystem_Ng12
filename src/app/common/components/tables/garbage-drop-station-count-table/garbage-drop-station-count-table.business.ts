import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GetDivisionStatisticNumbersParamsV2 } from 'src/app/network/request/division/division-request.params';
import { GetGarbageStationStatisticNumbersParamsV2 } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { DurationParams } from 'src/app/network/request/IParams.interface';
import { NumberStatisticV2Type } from 'src/app/view-model/types/number-statistic-v2.type';
import { GarbageDropStationCountTableConverter } from './garbage-drop-station-count-table.converter';
import {
  GarbageDropStationCountTableArgs,
  GarbageDropStationCountTableModel,
} from './garbage-drop-station-count-table.model';
import { GarbageDropStationCountTableService } from './garbage-drop-station-count-table.service';

@Injectable()
export class GarbageDropStationCountTableBusiness
  implements
    IBusiness<NumberStatisticV2Type[], GarbageDropStationCountTableModel[]>
{
  constructor(
    private store: GlobalStorageService,
    private service: GarbageDropStationCountTableService,
    private converter: GarbageDropStationCountTableConverter
  ) {}
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    args: GarbageDropStationCountTableArgs
  ): Promise<GarbageDropStationCountTableModel[]> {
    let data = await this.getData(args);
    let model = await this.converter.Convert(
      data,
      this.store.defaultDivisionType
    );
    return model;
  }
  async getData(
    args: GarbageDropStationCountTableArgs
  ): Promise<NumberStatisticV2Type[]> {
    let duration = DurationParams.TimeUnit(args.unit, args.date);
    let divisionId = args.parentId;
    if (!divisionId) {
      divisionId = this.store.defaultDivisionId!;
    }

    if (args.type === DivisionType.None) {
      return this.getGarbageStationData(divisionId, duration, args.unit);
    } else {
      return this.getDivisionData(divisionId, duration, args.unit);
    }
  }

  async getGarbageStationData(
    parentId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let stations = await this.service.stations(parentId);
    let stationIds = stations.map((x) => x.Id);

    if (stationIds.length) {
      let params = new GetGarbageStationStatisticNumbersParamsV2();
      params = Object.assign(params, interval);
      params.TimeUnit = unit;
      params.GarbageStationIds = stationIds;
      let res = await this.service.station.statistic.number.history.list(
        params
      );
      return res;
    } else {
      return [];
    }
  }
  async getDivisionData(
    parentId: string,
    interval: DurationParams,
    unit: TimeUnit
  ) {
    let divisions = await this.service.divisions(parentId);
    let divisionIds = divisions.map((x) => x.Id);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params = Object.assign(params, interval);
    params.TimeUnit = unit;
    params.DivisionIds = divisionIds;
    return this.service.division.statistic.number.history.list(params);
  }
}
