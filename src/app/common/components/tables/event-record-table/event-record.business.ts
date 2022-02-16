import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import {
  ISubscription,
  SubscriptionService,
} from 'src/app/common/interfaces/subscribe.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import {
  EventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from 'src/app/network/model/event-record.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import {
  IntervalParams,
  PagedParams,
} from 'src/app/network/request/IParams.interface';
import {
  EventRecordPagedConverter,
  EventRecordType,
} from './event-record.converter';
import { EventRecordFilter, EventRecordViewModel } from './event-record.model';

@Injectable()
export class EventRecordBusiness
  implements
    IBusiness<PagedList<EventRecordType>, PagedList<EventRecordViewModel>>
{
  constructor(
    private eventService: EventRequestService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService,
    public subscription: SubscriptionService
  ) {}
  Converter: IPromiseConverter<
    PagedList<EventRecordType>,
    PagedList<EventRecordViewModel>
  > = new EventRecordPagedConverter();

  async load(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter
  ): Promise<PagedList<EventRecordViewModel>> {
    let data = await this.getData(type, page, opts);
    let models = await this.Converter.Convert(data, {
      station: (id: string) => {
        return this.stationService.cache.get(id);
      },
      division: (id: string) => {
        return this.divisionService.cache.get(id);
      },
    });

    return models;
  }
  getData(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter
  ): Promise<PagedList<EventRecordType>> {
    this.eventService.record.IllegalDrop;
    let params = this.getParams(page, opts);
    switch (type) {
      case EventType.IllegalDrop:
        return this.eventService.record.IllegalDrop.list(params);
      case EventType.MixedInto:
        return this.eventService.record.MixedInto.list(params);
      case EventType.GarbageFull:
        return this.eventService.record.GarbageFull.list(params);
      default:
        throw new Event('error event type');
    }
  }

  getParams(page: PagedParams, opts: EventRecordFilter) {
    let params = new GetEventRecordsParams();
    params = Object.assign(params, page);
    params.BeginTime = opts.BeginTime;
    params.EndTime = opts.EndTime;
    if (opts.division) {
      params.DivisionIds = [opts.division.key];
    }
    if (opts.station) {
      params.StationIds = [opts.station.key];
    }
    if (opts.camera) {
      params.ResourceIds = [opts.camera.key];
    }
    if (opts.text) {
      params.ResourceName = opts.text;
    }
    return params;
  }
}
