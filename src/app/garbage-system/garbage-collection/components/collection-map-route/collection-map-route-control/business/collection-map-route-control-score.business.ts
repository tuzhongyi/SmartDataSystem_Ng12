import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { GarbageCollectionEventRecord } from 'src/app/network/model/vehicle-event-record.model';
import { GetGarbageCollectionEventRecordsParams } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.params';
import { CollectionEventRequestService } from 'src/app/network/request/garbage_vehicles/collection-event/collection-event.service';
import { DurationParams } from 'src/app/network/request/IParams.interface';

@Injectable()
export class CollectionMapRouteControlScoreBusiness
  implements IBusiness<GarbageCollectionEventRecord[]>
{
  constructor(private service: CollectionEventRequestService) {}
  load(vehicleId: string, date: Date): Promise<GarbageCollectionEventRecord[]> {
    let duration = DurationParams.allDay(date);
    return this.getData(vehicleId, duration);
  }
  async getData(
    vehicleId: string,
    duration: DurationParams
  ): Promise<GarbageCollectionEventRecord[]> {
    let params = new GetGarbageCollectionEventRecordsParams();
    params.VehicleIds = [vehicleId];
    params.BeginTime = duration.BeginTime;
    params.EndTime = duration.EndTime;
    let paged = await this.service.record.garbageCollection.list(params);
    return paged.Data;
  }
}
