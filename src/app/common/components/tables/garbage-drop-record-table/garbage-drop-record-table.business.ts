import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { SubscriptionService } from 'src/app/common/interfaces/subscribe.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordBusiness } from '../event-record-table/event-record.business';
import { EventRecordConverter } from '../event-record-table/event-record.converter';
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
    if (opts.division) {
      params.DivisionIds = [opts.division.key];
    }
    if (opts.station) {
      params.StationIds = [opts.station.key];
    }
    if (opts.camera) {
      params.ResourceIds = [opts.camera.key];
    }
    if (opts.community) {
      params.CommunityIds = [opts.community.key];
    }
    if (opts.text) {
      params.ResourceName = opts.text;
    }
    return this.eventService.record.GarbageDrop.list(params);
  }
}
