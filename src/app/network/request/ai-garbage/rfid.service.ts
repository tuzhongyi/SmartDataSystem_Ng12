import { Injectable } from '@angular/core';
import { AIGarbageRfidCardRecord } from '../../model/ai-garbage/rfid-card-record.model';
import { AIGarbageRfidCard } from '../../model/ai-garbage/rfid-card.model';
import { AIGarbageUrl } from '../../url/ai-garbage/ai-garbage.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { ExcelService } from '../excel.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetAIGarbageStationRfidCardRecordsParams,
  GetAIGarbageStationRfidCardsParams,
} from './ai-garbage.params';

@Injectable({
  providedIn: 'root',
})
export class AIGarbageRfidRequestService {
  private basic: BaseRequestService;
  constructor(http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.cards = new AIGarbageRfidCardsRequestService(this.basic);
  }
  cards: AIGarbageRfidCardsRequestService;
}

export class AIGarbageRfidCardsRequestService {
  type: BaseTypeRequestService<AIGarbageRfidCard>;
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(AIGarbageRfidCard);
  }
  create(item: AIGarbageRfidCard) {
    let url = AIGarbageUrl.rfid.cards.basic();
    return this.type.post(url, item);
  }
  update(item: AIGarbageRfidCard) {
    let url = AIGarbageUrl.rfid.cards.item(item.Id);
    return this.type.put(url, item);
  }
  get(id: string) {
    let url = AIGarbageUrl.rfid.cards.item(id);
    return this.type.get(url);
  }
  delete(id: string) {
    let url = AIGarbageUrl.rfid.cards.item(id);
    return this.type.delete(url);
  }
  list(params: GetAIGarbageStationRfidCardsParams) {
    let url = AIGarbageUrl.rfid.cards.list();
    return this.type.paged(url, params);
  }

  private _excel?: ExcelService;
  public get excel(): ExcelService {
    if (!this._excel) {
      this._excel = new ExcelService(
        this.basic.http,
        AIGarbageUrl.rfid.cards.excel()
      );
    }
    return this._excel;
  }

  private _records?: AIGarbageRfidCardsRecordsRequestService;
  public get records(): AIGarbageRfidCardsRecordsRequestService {
    if (!this._records) {
      this._records = new AIGarbageRfidCardsRecordsRequestService(this.basic);
    }
    return this._records;
  }
}

export class AIGarbageRfidCardsRecordsRequestService {
  type: BaseTypeRequestService<AIGarbageRfidCardRecord>;
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(AIGarbageRfidCardRecord);
  }
  list(params: GetAIGarbageStationRfidCardRecordsParams) {
    let url = AIGarbageUrl.rfid.cards.records.list();
    return this.type.paged(url, params);
  }
}
