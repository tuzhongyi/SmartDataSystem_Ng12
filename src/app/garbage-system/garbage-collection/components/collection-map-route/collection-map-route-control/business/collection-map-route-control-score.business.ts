import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageCollectionEventRecord } from 'src/app/network/model/garbage-station/vehicle-event-record.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';

@Injectable()
export class CollectionMapRouteControlScoreBusiness
  implements IBusiness<GarbageCollectionEventRecord[]>
{
  constructor(private service: CollectionEventRequestService) {}
  async load(
    vehicleId: string,
    duration: Duration
  ): Promise<GarbageCollectionEventRecord[]> {
    let data = await this.getData(vehicleId, duration);
    data.map((x) => {
      let second = x.EventTime.getSeconds() % 5;
      x.EventTime.setSeconds(x.EventTime.getSeconds() - second, 0);
      return x;
    });
    return data;
  }
  async getData(
    vehicleId: string,
    duration: Duration
  ): Promise<GarbageCollectionEventRecord[]> {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.VehicleIds = [vehicleId];
    params.BeginTime = duration.begin;
    params.EndTime = duration.end;
    let paged = await this.service.record.garbageCollection.list(params);
    return paged.Data;
  }
}
