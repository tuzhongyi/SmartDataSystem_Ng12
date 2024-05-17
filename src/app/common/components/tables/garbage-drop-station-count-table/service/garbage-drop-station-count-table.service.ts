import { Injectable } from '@angular/core';
import { GarbageDropStationCountTableDivisionService } from './garbage-drop-station-count-table-division.service';
import { GarbageDropStationCountTableStationService } from './garbage-drop-station-count-table-station.service';

@Injectable()
export class GarbageDropStationCountTableService {
  constructor(
    public division: GarbageDropStationCountTableDivisionService,
    public station: GarbageDropStationCountTableStationService
  ) {}
}
