import { Injectable } from '@angular/core';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GarbageDropRecordTaskTableDivisionService } from './service/garbage-drop-record-task-table-division.service';
import { GarbageDropRecordTaskTableStationService } from './service/garbage-drop-record-task-table-station.service';

@Injectable()
export class GarbageDropRecordTaskTableService {
  constructor(
    division: DivisionRequestService,
    station: GarbageStationRequestService
  ) {
    this.division = new GarbageDropRecordTaskTableDivisionService(division);
    this.station = new GarbageDropRecordTaskTableStationService(station);
  }
  division: GarbageDropRecordTaskTableDivisionService;
  station: GarbageDropRecordTaskTableStationService;
}
