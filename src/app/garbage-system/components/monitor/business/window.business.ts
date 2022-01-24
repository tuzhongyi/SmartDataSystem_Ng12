import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { DeviceWindowBusiness } from './windows/device-window.business';
import { RecordWindowBusiness } from './windows/event-record-window.business';
import { MediaWindowBusiness } from './windows/media-window.business';
import { GarbageStationDropWindowBusiness } from './windows/station-drop-window.business';
import { GarbageStationFullWindowBusiness } from './windows/station-full-window.business';
import { GarbageStationInfoWindowBusiness } from './windows/station-info-window.business';

@Injectable()
export class WindowBussiness {
  constructor(
    public record: RecordWindowBusiness,
    public media: MediaWindowBusiness,
    public deivce: DeviceWindowBusiness,
    public full: GarbageStationFullWindowBusiness,
    public drop: GarbageStationDropWindowBusiness,
    public station: GarbageStationInfoWindowBusiness
  ) {}
}
