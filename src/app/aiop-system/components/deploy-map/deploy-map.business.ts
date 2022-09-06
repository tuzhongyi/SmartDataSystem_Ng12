import { Injectable } from "@angular/core";
import { GarbageStation } from "src/app/network/model/garbage-station.model";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";

@Injectable()
export class DeployMapBusiness {
  constructor(private _garbageStationRequest: GarbageStationRequestService) {

  }
  updateGarbageStation(station: GarbageStation) {
    return this._garbageStationRequest.update(station)
  }
}