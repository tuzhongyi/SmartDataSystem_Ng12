import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { EventInfo } from '../../model/garbage-station/event-info.model';
import { GarbageDropEventRecord } from '../../model/garbage-station/event-record/garbage-drop-event-record.model';
import { GarbageFullEventRecord } from '../../model/garbage-station/event-record/garbage-full-event-record.model';
import { IllegalDropEventRecord } from '../../model/garbage-station/event-record/illegal-drop-event-record.model';
import { MixedIntoEventRecord } from '../../model/garbage-station/event-record/mixed-into-event-record.model';
import { SewageEventRecord } from '../../model/garbage-station/event-record/sewage-event-record.model';
import { PagedList } from '../../model/page_list.model';
import { EventUrl } from '../../url/garbage/event.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../base-request-howell.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GarbageDropAcceptParams,
  GarbageDropSuperviseParams,
  GarbageDropSuperviseResultParams,
  GarbageFeedbackParams,
  GetEventInfosParams,
  GetEventRecordsParams,
  GetGarbageDropEventRecordsParams,
} from './event-request.params';

@Injectable({
  providedIn: 'root',
})
export class EventRequestService {
  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
  }

  private basic: HowellBaseRequestService;

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
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(EventInfo);
  }

  type: HowellBaseTypeRequestService<EventInfo>;

  list(params: GetEventInfosParams): Promise<PagedList<EventInfo>> {
    let url = EventUrl.info.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(type: number): Promise<EventInfo> {
    let url = EventUrl.info.item(type);
    return this.type.get(url);
  }
  update(data: EventInfo): Promise<EventInfo> {
    let url = EventUrl.info.item(data.Type);
    return this.type.put(url, data);
  }
}

class RecordsService {
  constructor(private basic: HowellBaseRequestService) {}

  private _IllegalDrop?: RecordsIllegalDropService;
  public get IllegalDrop(): RecordsIllegalDropService {
    if (!this._IllegalDrop) {
      this._IllegalDrop = new RecordsIllegalDropService(this.basic);
    }
    return this._IllegalDrop;
  }

  private _MixedInto?: RecordsMixedIntoService;
  public get MixedInto(): RecordsMixedIntoService {
    if (!this._MixedInto) {
      this._MixedInto = new RecordsMixedIntoService(this.basic);
    }
    return this._MixedInto;
  }

  private _GarbageFull?: RecordsGarbageFullService;
  public get GarbageFull(): RecordsGarbageFullService {
    if (!this._GarbageFull) {
      this._GarbageFull = new RecordsGarbageFullService(this.basic);
    }
    return this._GarbageFull;
  }

  private _GarbageDrop?: RecordsGarbageDropService;
  public get GarbageDrop(): RecordsGarbageDropService {
    if (!this._GarbageDrop) {
      this._GarbageDrop = new RecordsGarbageDropService(this.basic);
    }
    return this._GarbageDrop;
  }

  private _sewage?: RecordsSewageService;
  public get sewage(): RecordsSewageService {
    if (!this._sewage) {
      this._sewage = new RecordsSewageService(this.basic);
    }
    return this._sewage;
  }
}

class RecordsIllegalDropService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(IllegalDropEventRecord);
  }

  type: HowellBaseTypeRequestService<IllegalDropEventRecord>;

  list(
    params: GetEventRecordsParams
  ): Promise<PagedList<IllegalDropEventRecord>> {
    let url = EventUrl.record.illegaldrop.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string): Promise<IllegalDropEventRecord> {
    let url = EventUrl.record.illegaldrop.item(id);
    return this.type.get(url);
  }
}
class RecordsMixedIntoService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(MixedIntoEventRecord);
  }

  type: HowellBaseTypeRequestService<MixedIntoEventRecord>;

  list(
    params: GetEventRecordsParams
  ): Promise<PagedList<MixedIntoEventRecord>> {
    let url = EventUrl.record.mixedinto.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<MixedIntoEventRecord> {
    let url = EventUrl.record.mixedinto.item(id);
    return this.type.get(url);
  }
}
class RecordsGarbageFullService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(GarbageFullEventRecord);
  }

  type: HowellBaseTypeRequestService<GarbageFullEventRecord>;

  list(
    params: GetEventRecordsParams
  ): Promise<PagedList<GarbageFullEventRecord>> {
    let url = EventUrl.record.garbagefull.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<GarbageFullEventRecord> {
    let url = EventUrl.record.garbagefull.item(id);
    return this.type.get(url);
  }
}
class RecordsGarbageDropService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(GarbageDropEventRecord);
  }

  type: HowellBaseTypeRequestService<GarbageDropEventRecord>;

  async all(
    params: GetGarbageDropEventRecordsParams = new GetGarbageDropEventRecordsParams()
  ) {
    let data: GarbageDropEventRecord[] = [];
    let index = 1;
    let paged: PagedList<GarbageDropEventRecord>;
    do {
      params.PageIndex = index;
      paged = await this.list(params);
      data = data.concat(paged.Data);
      index++;
    } while (index <= paged.Page.PageCount);
    return data;
  }

  list(
    params: GetGarbageDropEventRecordsParams
  ): Promise<PagedList<GarbageDropEventRecord>> {
    let url = EventUrl.record.garbagedrop.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<GarbageDropEventRecord> {
    let url = EventUrl.record.garbagedrop.item(id);
    return this.type.get(url);
  }
  feedback(id: string, params: GarbageFeedbackParams) {
    let url = EventUrl.record.garbagedrop.feedback(id);
    return this.type.post(url, params);
  }
  supervise(id: string, params: GarbageDropSuperviseParams) {
    let url = EventUrl.record.garbagedrop.supervise(id);
    return this.type.post(url, params);
  }
  superviseResult(id: string, params: GarbageDropSuperviseResultParams) {
    let url = EventUrl.record.garbagedrop.superviseresult(id);
    return this.type.post(url, params);
  }
  accept(id: string, params: GarbageDropAcceptParams) {
    let url = EventUrl.record.garbagedrop.accept(id);
    return this.type.post(url, params);
  }
}
class RecordsSewageService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(SewageEventRecord);
  }

  type: HowellBaseTypeRequestService<SewageEventRecord>;

  list(params: GetEventRecordsParams): Promise<PagedList<SewageEventRecord>> {
    let url = EventUrl.record.sewage.list();
    return this.type.paged(url, params);
  }
  get(id: string): Promise<SewageEventRecord> {
    let url = EventUrl.record.sewage.item(id);
    return this.type.get(url);
  }
}
