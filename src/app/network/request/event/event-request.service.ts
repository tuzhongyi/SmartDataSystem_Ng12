import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { EventInfo } from '../../model/event-info.model';
import {
  GarbageDropEventRecord,
  GarbageFullEventRecord,
  IllegalDropEventRecord,
  MixedIntoEventRecord,
} from '../../model/garbage-event-record.model';
import { PagedList } from '../../model/page_list.model';
import { EventUrl } from '../../url/garbage/event.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetEventInfosParams,
  GetEventRecordsParams,
  GetGarbageDropEventRecordsParams,
} from './event-request.params';

@Injectable({
  providedIn: 'root',
})
export class EventRequestService {
  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
  }

  private basic: BaseRequestService;

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
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(EventInfo);
  }

  type: BaseTypeRequestService<EventInfo>;

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
  constructor(private basic: BaseRequestService) {}

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
}

class RecordsIllegalDropService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(IllegalDropEventRecord);
  }

  type: BaseTypeRequestService<IllegalDropEventRecord>;

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
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(MixedIntoEventRecord);
  }

  type: BaseTypeRequestService<MixedIntoEventRecord>;

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
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(GarbageFullEventRecord);
  }

  type: BaseTypeRequestService<GarbageFullEventRecord>;

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
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(GarbageDropEventRecord);
  }

  type: BaseTypeRequestService<GarbageDropEventRecord>;

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
}
