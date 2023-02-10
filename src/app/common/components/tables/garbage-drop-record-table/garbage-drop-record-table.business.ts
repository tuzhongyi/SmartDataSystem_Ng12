import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { SubscriptionService } from 'src/app/common/interfaces/subscribe.interface';
import { OrderType } from 'src/app/enum/order-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { GarbageDropEventRecordPagedConverter } from './garbage-drop-record-table.converter';
import {
  GarbageDropRecordFilter,
  GarbageDropRecordViewModel,
} from './garbage-drop-record.model';

@Injectable()
export class GarbageDropRecordTableBusiness
  implements
    IBusiness<
      PagedList<GarbageDropEventRecord>,
      PagedList<GarbageDropRecordViewModel>
    >
{
  constructor(
    private eventService: EventRequestService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService,
    public subscription: SubscriptionService
  ) {}
  Converter: IPromiseConverter<
    PagedList<GarbageDropEventRecord>,
    PagedList<GarbageDropRecordViewModel>
  > = new GarbageDropEventRecordPagedConverter();
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts: GarbageDropRecordFilter
  ): Promise<PagedList<GarbageDropRecordViewModel>> {
    let data = await this.getData(page, opts);
    let model = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
      camera: (stationId: string, cameraId: string) => {
        return this.stationService.camera.get(stationId, cameraId);
      },
    });
    return model;
  }
  async getData(
    page: PagedParams,
    opts: GarbageDropRecordFilter
  ): Promise<PagedList<GarbageDropEventRecord>> {
    let params = new GetGarbageDropEventRecordsParams();
    params = Object.assign(params, page);
    params.BeginTime = opts.BeginTime;
    params.EndTime = opts.EndTime;
    params.IsHandle = opts.IsHandle;
    params.IsTimeout = opts.IsTimeout;
    if (opts.divisionId) {
      params.DivisionIds = [opts.divisionId];
    }
    if (opts.stationId) {
      params.StationIds = [opts.stationId];
    }
    if (opts.cameraId) {
      params.ResourceIds = [opts.cameraId];
    }
    if (opts.community) {
      params.CommunityIds = [opts.community.Id];
    }
    if (opts.opts) {
      params.ResourceName = opts.opts.text;
    }
    params.TakeMinutes = opts.duration;
    params.DropTimeOrderBy = OrderType.Asc;

    return this.eventService.record.GarbageDrop.list(params);
  }
}
