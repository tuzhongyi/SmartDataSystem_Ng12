import { Injectable } from '@angular/core';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { ResourceRequestService } from 'src/app/network/request/resources/resource.service';

@Injectable()
export class AIOPGarbageStationDetailsCamerasService {
  constructor(
    public resource: ResourceRequestService,
    public station: GarbageStationRequestService
  ) {}
}
