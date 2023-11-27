import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import {
  GetDivisionEventNumbersParams,
  GetDivisionsParams,
  GetDivisionStatisticNumbersParamsV2,
} from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class AuditStatisticEventService {
  constructor(
    public sr: SRServerRequestService,
    division: DivisionRequestService,
    station: GarbageStationRequestService
  ) {
    this.division = new AuditStatisticEventDivisionService(division);
    this.station = new AuditStatisticEventStationService(station);
  }
  division: AuditStatisticEventDivisionService;
  station: AuditStatisticEventStationService;
}

class AuditStatisticEventStationService {
  constructor(private service: GarbageStationRequestService) {}
  async history(divisionId: string) {
    let duration = DateTimeTool.allDay(new Date());
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let stations = await this.list(divisionId);
    params.GarbageStationIds = stations.map((x) => x.Id);
    return this.service.statistic.number.history.list(params);
  }

  get(stationId: string) {
    return this.service.cache.get(stationId);
  }

  list(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.all(params);
  }
  manualCapture(stationId: string) {
    return this.service.manualCapture(stationId);
  }
}

class AuditStatisticEventDivisionService {
  constructor(private service: DivisionRequestService) {}
  today(divisionId: string) {
    let duration = DateTimeTool.allDay(new Date());
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    params.DivisionIds = [divisionId];
    return this.service.statistic.number.history.list(params);
  }
  private async _children(divisionId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = divisionId;
    let paged = await this.service.cache.list(params);
    return paged.Data;
  }

  async children(divisionId: string) {
    let duration = DateTimeTool.allDay(new Date());
    let params = new GetDivisionStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;
    let children = await this._children(divisionId);
    params.DivisionIds = children.map((x) => x.Id);
    return this.service.statistic.number.history.list(params);
  }

  async history(divisionId: string) {
    let duration = DateTimeTool.allDay(new Date());
    let params = new GetDivisionEventNumbersParams();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = TimeUnit.Hour;

    let response = await this.service.eventNumber.history.list(
      divisionId,
      params
    );
    return response.Data;
  }

  async default() {
    let params = new GetDivisionsParams();
    params.PageIndex = 1;
    params.PageSize = 1;
    params.DivisionType = DivisionType.City;
    let paged = await this.service.cache.list(params);
    return paged.Data.shift();
  }
}
