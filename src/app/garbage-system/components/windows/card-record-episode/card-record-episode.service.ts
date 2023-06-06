import { Injectable } from '@angular/core';
import { SRServerRequestService } from 'src/app/network/request/ai-sr-server/sr-server.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';

@Injectable()
export class CardRecordEpisodeService {
  constructor(
    public station: GarbageStationRequestService,
    public sr: SRServerRequestService
  ) {}
}
