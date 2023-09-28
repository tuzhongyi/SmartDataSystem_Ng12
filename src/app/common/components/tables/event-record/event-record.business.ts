import { Injectable } from '@angular/core';
import { IBusiness, IGet } from 'src/app/common/interfaces/bussiness.interface';
import { Medium } from 'src/app/common/tools/medium';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedList } from 'src/app/network/model/page_list.model';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import {
  EventRecordPagedConverter,
  EventRecordType,
} from './event-record.converter';
import { EventRecordFilter } from './event-record.model';

@Injectable()
export class EventRecordBusiness
  implements
    IBusiness<PagedList<EventRecordType>, PagedList<EventRecordViewModel>>,
    IGet<PagedList<EventRecordViewModel>>
{
  constructor(
    private eventService: EventRequestService,
    private divisionService: DivisionRequestService,
    public Converter: EventRecordPagedConverter
  ) {}

  async load(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter
  ): Promise<PagedList<EventRecordViewModel>> {
    let data = await this.getData(type, page, opts);
    let models = await this.Converter.Convert(data);

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

  async get(
    time: Date,
    type: EventType
  ): Promise<PagedList<EventRecordViewModel<any>>> {
    let params = new GetEventRecordsParams();
    params.BeginTime = time;
    params.EndTime = time;
    params.PageIndex = 1;
    params.PageSize = 1;
    let paged: Promise<PagedList<EventRecordType>>;
    switch (type) {
      case EventType.IllegalDrop:
        paged = this.eventService.record.IllegalDrop.list(params);
        break;
      case EventType.MixedInto:
        paged = this.eventService.record.MixedInto.list(params);
        break;
      case EventType.GarbageFull:
        paged = this.eventService.record.GarbageFull.list(params);
        break;
      default:
        throw new Event('error event type');
    }
    let model = this.Converter.Convert(await paged);
    return model;
  }

  getParams(page: PagedParams, opts: EventRecordFilter) {
    let params = new GetEventRecordsParams();
    params = Object.assign(params, page);
    params.BeginTime = opts.duration.begin;
    params.EndTime = opts.duration.end;
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
      switch (opts.opts.propertyName) {
        case 'Name':
          params.StationName = opts.opts.text;
          break;
        case 'CommunityName':
          params.CommunityName = opts.opts.text;
          break;
        default:
          break;
      }
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
