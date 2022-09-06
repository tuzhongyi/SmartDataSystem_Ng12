import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { SubscriptionService } from 'src/app/common/interfaces/subscribe.interface';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { Medium } from 'src/app/common/tools/medium';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import {
  EventRecordPagedConverter,
  EventRecordType,
} from './event-record.converter';
import { EventRecordFilter } from './event-record.model';

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
    opts: EventRecordFilter,
    divisionId?: string,
    stationId?: string
  ): Promise<PagedList<EventRecordViewModel>> {
    let data = await this.getData(type, page, opts, divisionId, stationId);
    let models = await this.Converter.Convert(data, {
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

    return models;
  }
  getData(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter,
    divisionId?: string,
    stationId?: string
  ): Promise<PagedList<EventRecordType>> {
    this.eventService.record.IllegalDrop;
    let params = this.getParams(page, opts, divisionId, stationId);

    switch (type) {
      case EventType.IllegalDrop:
        return this.eventService.record.IllegalDrop.list(params);
      case EventType.MixedInto:
        return this.eventService.record.MixedInto.list(params);
      case EventType.GarbageFull:
        return this.eventService.record.GarbageFull.list(params);
      case EventType.Smoke:
        return this.eventService.record.Smoke.list(params);
      default:
        throw new Event('error event type');
    }
  }

  getParams(
    page: PagedParams,
    opts: EventRecordFilter,
    divisionId?: string,
    stationId?: string
  ) {
    let params = new GetEventRecordsParams();
    params = Object.assign(params, page);
    params.BeginTime = opts.BeginTime;
    params.EndTime = opts.EndTime;
    if (opts.divisionId) {
      params.DivisionIds = [opts.divisionId];
    }
    if (opts.stationId) {
      params.StationIds = [opts.stationId];
    }
    if (opts.cameraId) {
      params.ResourceIds = [opts.cameraId];
    }
    if (opts.opts) {
      params.ResourceName = opts.opts.text;
    }
    return params;
  }

  getDivision(id: string) {
    return this.divisionService.cache.get(id);
  }

  getImage(id: string) {
    return Medium.jpg(id);
  }
}
