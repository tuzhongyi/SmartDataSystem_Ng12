import { Injectable } from '@angular/core';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station/garbage-station-number-statistic-v2.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import {
  GetGarbageStationsParams,
  GetGarbageStationStatisticNumbersParamsV2,
} from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageStationStatisticTableSource } from './garbage-station-statistic.model';

@Injectable()
export class GarbageStationStatisticTableService {
  constructor(
    public division: DivisionRequestService,
    public station: GarbageStationRequestService
  ) {
    this.init();
  }

  async getDataByDay(divisionId: string, date: Date) {
    let source = new GarbageStationStatisticTableSource();
    let duration = DateTimeTool.allDay(date);
    let unit = TimeUnit.Day;
    source.current = await this.getHistory(divisionId, duration, unit);
    let end = new Date(duration.begin.getTime());
    end.setMilliseconds(-1);
    let begin = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    let yesterday: Duration = { begin, end };
    source.before = await this.getHistory(divisionId, yesterday, unit);
    return source;
  }

  async getDataByWeek(divisionId: string, date: Date) {
    let source = new GarbageStationStatisticTableSource();
    let duration = DateTimeTool.allWeek(date);
    let unit = TimeUnit.Week;
    source.current = await this.getHistory(divisionId, duration, unit);
    let end = new Date(duration.begin.getTime());
    end.setMilliseconds(-1);
    let begin = new Date(duration.begin.getTime());
    begin.setDate(begin.getDate() - 7);

    let beofre: Duration = { begin, end };
    source.before = await this.getHistory(divisionId, beofre, unit);
    return source;
  }
  async getDataByMonth(divisionId: string, date: Date) {
    let source = new GarbageStationStatisticTableSource();
    let duration = DateTimeTool.allMonth(date);
    let unit = TimeUnit.Month;
    source.current = await this.getHistory(divisionId, duration, unit);
    let end = new Date(duration.begin.getTime());
    end.setMilliseconds(-1);
    let begin = new Date(end.getFullYear(), end.getMonth(), 1);
    let before: Duration = { begin, end };
    source.before = await this.getHistory(divisionId, before, unit);
    return source;
  }

  async getDataByYear(divisionId: string, date: Date) {
    let source = new GarbageStationStatisticTableSource();
    let duration = DateTimeTool.allYear(date);
    let unit = TimeUnit.Year;
    source.current = await this.getHistory(divisionId, duration, unit);
    let end = new Date(duration.begin.getTime());
    end.setMilliseconds(-1);
    let begin = new Date(end.getFullYear(), end.getMonth(), 1);
    let before: Duration = { begin, end };
    source.before = await this.getHistory(divisionId, before, unit);
    return source;
  }

  async getHistory(
    divisionId: string,
    duration: Duration,
    unit: TimeUnit
  ): Promise<GarbageStationNumberStatisticV2[]> {
    let stations = await this.getStations(divisionId);
    if (stations.length == 0) return [];
    let params = new GetGarbageStationStatisticNumbersParamsV2();
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    params.TimeUnit = unit;
    params.GarbageStationIds = stations.map((x) => x.Id);

    return this.station.statistic.number.history.list(params);
  }

  async getStations(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let paged = await this.station.cache.list(params);
    return paged.Data;
  }

  async getStation(id: string) {
    return this.stations.find((x) => x.Id === id)!;
  }
  async getDivision(id: string) {
    return this.divisions.find((x) => x.Id === id)!;
  }

  async init() {
    this.stations = await this.station.cache.all();
    this.divisions = await this.division.cache.all();
  }

  private _stations: GarbageStation[] = [];
  public get stations(): GarbageStation[] {
    return this._stations;
  }
  public set stations(v: GarbageStation[]) {
    this._stations = v;
  }

  private _divisions: Division[] = [];
  public get divisions(): Division[] {
    return this._divisions;
  }
  public set divisions(v: Division[]) {
    this._divisions = v;
  }
}
