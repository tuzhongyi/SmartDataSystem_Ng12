/*
 * @Author: pmx
 * @Date: 2022-11-06 15:08:52
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-22 15:13:02
 */
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { VehicleEventInfo } from '../../../model/event-info.model';
import { PagedList } from '../../../model/page_list.model';
import {
  CameraOnlineEventRecord,
  GarbageCollectionEventRecord,
  RelayStateChangeEventRecord,
  VehicleOnlineEventRecord,
} from '../../../model/vehicle-event-record.model';
import { GarbageVehicleEventUrl } from '../../../url/garbage-vehicle/events.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../../base-request.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import {
  GetEventInfosParams,
  GetGarbageCollectionEventRecordsParams,
  GetRelayStateChangeEventRecordsParams,
  GetVehicleOnlineEventRecordsParams,
} from './collection-event.params';

@Injectable({
  providedIn: 'root',
})
export class CollectionEventRequestService {
  private basic: BaseRequestService;

  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
  }

  private _info?: InfosService;
  public get info(): InfosService {
    if (!this._info) {
      this._info = new InfosService(this.basic);
    }
    return this._info;
  }
  private _record?: RecordsService;
  public get record(): RecordsService {
    if (!this._record) {
      this._record = new RecordsService(this.basic);
    }
    return this._record;
  }
}

class InfosService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(VehicleEventInfo);
  }

  type: BaseTypeRequestService<VehicleEventInfo>;

  list(params: GetEventInfosParams): Promise<PagedList<VehicleEventInfo>> {
    let url = GarbageVehicleEventUrl.info.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(type: number): Promise<VehicleEventInfo> {
    let url = GarbageVehicleEventUrl.info.item(type);
    return this.type.get(url);
  }
  update(data: VehicleEventInfo): Promise<VehicleEventInfo> {
    let url = GarbageVehicleEventUrl.info.item(data.Type);
    return this.type.put(url, data);
  }
}

class RecordsService {
  garbageCollection = new RecordsGarbageCollectionService(this.basic);
  relayStateChange = new RecordsRelayStateChangeService(this.basic);
  vehicleOnline = new RecordsVehicleOnlineService(this.basic);
  cameraOnline = new RecordsCameraOnlineService(this.basic);

  constructor(private basic: BaseRequestService) {}
}
class RecordsGarbageCollectionService {
  type: BaseTypeRequestService<GarbageCollectionEventRecord>;

  constructor(private basic: BaseRequestService) {
    this.type = basic.type(GarbageCollectionEventRecord);
  }

  list(
    params: GetGarbageCollectionEventRecordsParams
  ): Promise<PagedList<GarbageCollectionEventRecord>> {
    let url = GarbageVehicleEventUrl.record.garbageCollection.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<GarbageCollectionEventRecord> {
    let url = GarbageVehicleEventUrl.record.garbageCollection.item(id);
    return this.type.get(url);
  }
}

class RecordsRelayStateChangeService {
  type: BaseTypeRequestService<RelayStateChangeEventRecord>;

  constructor(private basic: BaseRequestService) {
    this.type = basic.type(RelayStateChangeEventRecord);
  }

  list(
    params: GetRelayStateChangeEventRecordsParams
  ): Promise<PagedList<RelayStateChangeEventRecord>> {
    let url = GarbageVehicleEventUrl.record.relayStateChange.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<RelayStateChangeEventRecord> {
    let url = GarbageVehicleEventUrl.record.relayStateChange.item(id);
    return this.type.get(url);
  }
}

class RecordsVehicleOnlineService {
  type: BaseTypeRequestService<VehicleOnlineEventRecord>;

  constructor(private basic: BaseRequestService) {
    this.type = basic.type(VehicleOnlineEventRecord);
  }

  list(
    params: GetVehicleOnlineEventRecordsParams
  ): Promise<PagedList<VehicleOnlineEventRecord>> {
    let url = GarbageVehicleEventUrl.record.vehicleOnline.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<VehicleOnlineEventRecord> {
    let url = GarbageVehicleEventUrl.record.vehicleOnline.item(id);
    return this.type.get(url);
  }
}

class RecordsCameraOnlineService {
  type: BaseTypeRequestService<CameraOnlineEventRecord>;

  constructor(private basic: BaseRequestService) {
    this.type = basic.type(CameraOnlineEventRecord);
  }

  list(
    params: GetVehicleOnlineEventRecordsParams
  ): Promise<PagedList<CameraOnlineEventRecord>> {
    let url = GarbageVehicleEventUrl.record.cameraOnline.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<CameraOnlineEventRecord> {
    let url = GarbageVehicleEventUrl.record.cameraOnline.item(id);
    return this.type.get(url);
  }
}
