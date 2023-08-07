import { Injectable } from "@angular/core";
import { GarbageStationWeightTableDivisionService } from "./service/garbage-station-weight-table-division.service";
import { GarbageStationWeightTableStationService } from "./service/garbage-station-weight-table-station.service";

@Injectable()
export class GarbageStationWeightTableService {
  constructor(
    public division: GarbageStationWeightTableDivisionService,
    public station: GarbageStationWeightTableStationService
  ) {}
}
