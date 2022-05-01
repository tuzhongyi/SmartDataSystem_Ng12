import { Injectable } from "@angular/core";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";

@Injectable()
export class EventRecordWindowBusiness {
    constructor(private stationService: GarbageStationRequestService) {

    }

    getStation(id: string) {
        return this.stationService.cache.get(id)
    }
}