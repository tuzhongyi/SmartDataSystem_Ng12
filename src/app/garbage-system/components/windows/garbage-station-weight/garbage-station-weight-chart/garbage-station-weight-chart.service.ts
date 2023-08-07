import { Injectable } from "@angular/core";
import { GarbageStationWeightChartDivisionService } from "./garbage-station-weight-chart-service/garbage-station-weight-chart-division.service";
import { GarbageStationWeightChartStationService } from "./garbage-station-weight-chart-service/garbage-station-weight-chart-station.service";

@Injectable()
export class GarbageStationWeightChartService {
  constructor(
    public station: GarbageStationWeightChartStationService,
    public division: GarbageStationWeightChartDivisionService
  ) {}
}
