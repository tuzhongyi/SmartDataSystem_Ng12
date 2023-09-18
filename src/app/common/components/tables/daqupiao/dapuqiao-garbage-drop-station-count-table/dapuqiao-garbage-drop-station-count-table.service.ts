import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EnumHelper } from 'src/app/enum/enum-helper';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { Division } from 'src/app/network/model/division.model';
import {
  GetDivisionsParams,
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DaPuQiaoGarbageDropStationCountTableArgs } from './dapuqiao-garbage-drop-station-count-table.model';

@Injectable()
export class DaPuQiaoGarbageDropStationCountTableService {
  constructor(
    division: DivisionRequestService,
    station: GarbageStationRequestService
  ) {
    this.service = {
      division: new DivisionService(division),
      station: new GarbageStationService(station),
    };
  }
  private service: {
    division: DivisionService;
    station: GarbageStationService;
  };

  async today(args: DaPuQiaoGarbageDropStationCountTableArgs) {
    let ids: string[];
    if (args.type === UserResourceType.Station) {
      let station = await this.service.station.list(args.parentId);
      ids = station.map((item) => item.Id);
      return this.service.station.today(ids);
    } else {
      let divisions = await this.service.division.list(
        EnumHelper.ConvertUserResourceToDivision(args.type),
        args.parentId
      );
      ids = divisions.map((item) => item.Id);
      return this.service.division.today(ids);
    }
  }
  async history(args: DaPuQiaoGarbageDropStationCountTableArgs) {
    let ids: string[];
    if (args.type === UserResourceType.Station) {
      let station = await this.service.station.list(args.parentId);
      ids = station.map((item) => item.Id);
      return this.service.station.history(ids, args.unit, args.date);
    } else {
      let divisions = await this.service.division.list(
        EnumHelper.ConvertUserResourceToDivision(args.type),
        args.parentId
      );
      ids = divisions.map((item) => item.Id);
      return this.service.division.history(ids, args.unit, args.date);
    }
  }

  division(id: string) {
    return this.service.division.get(id);
  }
  station(id: string) {
    return this.service.station.get(id);
  }

  parent(id: string, isstation: boolean) {
    if (isstation) {
      return new Promise<Division>((resolve) => {
        this.service.station.get(id).then((station) => {
          if (station.DivisionId) {
            this.service.division.get(station.DivisionId).then((parent) => {
              resolve(parent);
            });
          }
        });
      });
    } else {
      return new Promise<Division>((resolve) => {
        this.service.division.get(id).then((division) => {
          if (division.ParentId) {
            this.service.division.get(division.ParentId).then((parent) => {
              resolve(parent);
            });
          }
        });
      });
    }
  }
}
class DivisionService {
  constructor(private service: DivisionRequestService) {}

  async today(ids: string[]) {
    let params = new GetDivisionStatisticNumbersParams();
    params.Ids = ids;
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async history(ids: string[], unit: TimeUnit, date: Date = new Date()) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.DivisionIds = ids;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    return this.service.statistic.number.history.list(params);
  }

  async list(type: DivisionType, parentId?: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    params.DivisionType = type;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }
  get(id: string) {
    return this.service.cache.get(id);
  }
}
class GarbageStationService {
  constructor(private service: GarbageStationRequestService) {}

  async today(ids: string[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = ids;
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }

  async history(ids: string[], unit: TimeUnit, date: Date = new Date()) {
    let duration = DateTimeTool.TimeUnit(unit, date);
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.GarbageStationIds = ids;
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    return this.service.statistic.number.history.list(params);
  }

  async list(divisionId?: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  get(id: string) {
    return this.service.cache.get(id);
  }
}
