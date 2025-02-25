import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ExportBusiness } from 'src/app/common/business/export.business';
import { SubscriptionService } from 'src/app/common/interfaces/subscribe.interface';
import { Language } from 'src/app/common/tools/language';
import { EventType } from 'src/app/enum/event-type.enum';
import { PagedParams } from 'src/app/network/request/IParams.interface';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetEventRecordsParams } from 'src/app/network/request/event/event-request.params';
import { EventRequestService } from 'src/app/network/request/event/event-request.service';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordDownloadConverter } from './event-record-download.converter';
import {
  EventRecordPagedConverter,
  EventRecordType,
} from './event-record.converter';
import { EventRecordFilter } from './event-record.model';

@Injectable()
export class EventRecordDownloadBusiness {
  constructor(
    private eventService: EventRequestService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService,
    public subscription: SubscriptionService,
    private exports: ExportBusiness
  ) {}
  converter = new EventRecordPagedConverter();

  async download(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter,
    divisionId?: string,
    stationId?: string
  ) {
    let data = await this.all(type, page, opts, divisionId, stationId);
    let models = await this.converter.Convert(data, {
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

    let begin = formatDate(opts.BeginTime, 'yyyy_MM_dd', 'en');
    let end = formatDate(opts.EndTime, 'yyyy_MM_dd', 'en');

    let title = `${begin}_${end}_${Language.EventType(type)}事件记录`;
    let headers = [
      '序号',
      '车棚',
      '社区',
      '街道',
      '警务责任区',
      '开始时间',
      '结束时间',
    ];
    let converter = new EventRecordDownloadConverter();
    this.exports.csv(title, headers, models, converter);
  }

  all(
    type: EventType,
    page: PagedParams,
    opts: EventRecordFilter,
    divisionId?: string,
    stationId?: string
  ): Promise<EventRecordType[]> {
    this.eventService.record.IllegalDrop;
    let params = this.getParams(page, opts, divisionId, stationId);

    switch (type) {
      case EventType.IllegalDrop:
        return this.eventService.record.IllegalDrop.all(params);
      case EventType.MixedInto:
        return this.eventService.record.MixedInto.all(params);
      case EventType.GarbageFull:
        return this.eventService.record.GarbageFull.all(params);
      case EventType.Smoke:
        return this.eventService.record.Smoke.all(params);
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
    params.Desc = true;
    return params;
  }
}
