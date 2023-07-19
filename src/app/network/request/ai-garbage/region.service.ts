import { Injectable } from '@angular/core';
import { AIGarbageAbbrInfo } from '../../model/ai-garbage/abbr-info.model';
import { AIGarbageRegion } from '../../model/ai-garbage/region.model';
import { AIGarbageUrl } from '../../url/ai-garbage/ai-garbage.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { ExcelService } from '../excel.service';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetAIGarbageStationAbbrRegionsParams,
  GetAIGarbageStationRegionsParams,
} from './ai-garbage.params';

@Injectable({
  providedIn: 'root',
})
export class AIGarbageRegionsRequestService {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<AIGarbageRegion>;
  constructor(private http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(http);
    this.type = this.basic.type(AIGarbageRegion);
  }
  create(item: AIGarbageRegion) {
    let url = AIGarbageUrl.regions.basic();
    return this.type.post(url, item);
  }
  update(item: AIGarbageRegion) {
    let url = AIGarbageUrl.regions.item(item.Id);
    return this.type.put(url, item);
  }
  get(id: string) {
    let url = AIGarbageUrl.regions.item(id);
    return this.type.get(url);
  }
  delete(id: string) {
    let url = AIGarbageUrl.regions.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetAIGarbageStationRegionsParams = new GetAIGarbageStationRegionsParams()
  ) {
    let url = AIGarbageUrl.regions.list();
    return this.type.paged(url, params);
  }

  abbrList(params: GetAIGarbageStationAbbrRegionsParams) {
    let url = AIGarbageUrl.regions.abbr();
    return this.basic.paged(url, AIGarbageAbbrInfo, params);
  }

  private _excel?: ExcelService;
  public get excel(): ExcelService {
    if (!this._excel) {
      this._excel = new ExcelService(this.http, AIGarbageUrl.regions.excel());
    }
    return this._excel;
  }
}
