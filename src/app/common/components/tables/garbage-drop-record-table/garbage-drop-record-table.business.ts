import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { OrderType } from 'src/app/enum/order-type.enum';
import { GarbageDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GetGarbageDropEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
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
    private service: EventRequestService,
    private converter: GarbageDropEventRecordPagedConverter
  ) {}
  loading?: EventEmitter<void> | undefined;
  async load(
    page: PagedParams,
    opts: GarbageDropRecordFilter
  ): Promise<PagedList<GarbageDropRecordViewModel>> {
    let data = await this.getData(page, opts);
    let model = await this.converter.Convert(data);
    return model;
  }
  async getData(
    page: PagedParams,
    opts: GarbageDropRecordFilter
  ): Promise<PagedList<GarbageDropEventRecord>> {
    let params = new GetGarbageDropEventRecordsParams();
    params = Object.assign(params, page);
    params.BeginTime = opts.duration.begin;
    params.EndTime = opts.duration.end;
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
      if (opts.opts.propertyName) {
        switch (opts.opts.propertyName) {
          case 'Name':
            params.StationName = opts.opts.text;
            break;
          default:
            params[opts.opts.propertyName] = opts.opts.text;
            break;
        }
      } else {
        params.ResourceName = opts.opts.text;
      }
    }
    params.TakeMinutes = opts.range;
    params.DropTimeOrderBy = OrderType.Asc;

    return this.service.record.GarbageDrop.list(params);
  }
}
