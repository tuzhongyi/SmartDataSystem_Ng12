import { Division } from 'src/app/network/model/division.model';
import { PagedList } from 'src/app/network/model/page_list.model';

import {
  GetDivisionEventNumbersParams,
  GetDivisionsParams,
  GetDivisionStatisticComparisonParams,
  GetDivisionStatisticNumbersParams,
  GetDivisionStatisticNumbersParamsV2,
  GetDivisionSumEventNumberParams,
  GetDivisionTreeParams,
  GetDivisionVolumesParams,
} from './division-request.params';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import { AbstractService } from 'src/app/business/Ibusiness';
import { DivisionUrl } from '../../url/garbage/division.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { BatchRequest } from '../../model/batch-request.model';
import { BatchResult } from '../../model/batch-result.model';
import { DivisionTree } from '../../model/division-tree.model';
import { GarbageVolume } from '../../model/garbage-volume.model';
import { EventNumberStatistic } from '../../model/event-number-statistic.model';
import { DivisionNumberStatistic } from '../../model/division-number-statistic.model';
import { SumEventNumber } from '../../model/sum-event-number.model';
import { DivisionNumberStatisticV2 } from '../../model/division-number-statistic-v2.model';
import { DivisionNumberStatisticComparison } from '../../model/division-number-statistic-comparison.model';
import { Injectable } from '@angular/core';
import { Cache } from '../cache/cache';
import { classToPlain } from 'class-transformer';

@Cache(DivisionUrl.basic(), Division)
@Injectable({
  providedIn: 'root',
})
export class DivisionRequestService extends AbstractService<Division> {
  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(Division);
  }

  private basic: BaseRequestService;
  private type: BaseTypeRequestService<Division>;
  create(data: Division): Promise<Division> {
    let url = DivisionUrl.basic();
    return this.type.post(url, data);
  }
  get(divisionId: string): Promise<Division> {
    let url = DivisionUrl.item(divisionId);
    return this.type.get(url);
  }
  update(data: Division): Promise<Division> {
    let url = DivisionUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(divisionId: string): Promise<Division> {
    let url = DivisionUrl.item(divisionId);
    return this.type.delete(url);
  }
  list(
    params: GetDivisionsParams = new GetDivisionsParams()
  ): Promise<PagedList<Division>> {
    let url = DivisionUrl.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }

  garbageStations(
    divisionId: string,
    batch: BatchRequest
  ): Promise<BatchResult> {
    let url = DivisionUrl.garbagestations(divisionId);
    return this.basic.post(url, BatchResult, batch);
  }

  tree(params?: GetDivisionTreeParams): Promise<DivisionTree> {
    let url = DivisionUrl.tree();
    if (params) {
      let data = classToPlain(params);
      return this.basic.post(url, DivisionTree, data);
    } else {
      return this.basic.get(url, DivisionTree);
    }
  }

  private _volume?: VolumesService;
  public get volume(): VolumesService {
    if (!this._volume) {
      this._volume = new VolumesService(this.basic);
    }
    return this._volume;
  }

  private _eventNumber?: EventNumbersService;
  public get eventNumber(): EventNumbersService {
    if (!this._eventNumber) {
      this._eventNumber = new EventNumbersService(this.basic);
    }
    return this._eventNumber;
  }

  private _statistic?: StatisticService;
  public get statistic(): StatisticService {
    if (!this._statistic) {
      this._statistic = new StatisticService(this.basic);
    }
    return this._statistic;
  }
}

@Cache(DivisionUrl.volume('ID').basic())
class VolumesService {
  constructor(private basic: BaseRequestService) {}

  private _history?: VolumesHistoryService;
  public get history(): VolumesHistoryService {
    if (!this._history) {
      this._history = new VolumesHistoryService(this.basic);
    }
    return this._history;
  }
}
@Cache(DivisionUrl.volume('ID').history.basic())
class VolumesHistoryService {
  constructor(private basic: BaseRequestService) {}
  list(
    divisionId: string,
    params: GetDivisionVolumesParams
  ): Promise<PagedList<GarbageVolume>> {
    let url = DivisionUrl.volume(divisionId).history.list();
    let data = classToPlain(params);
    return this.basic.paged(url, GarbageVolume, data);
  }
}
@Cache(DivisionUrl.eventnumber().basic())
class EventNumbersService {
  constructor(private basic: BaseRequestService) {}

  sum(params: GetDivisionSumEventNumberParams): Promise<SumEventNumber[]> {
    let url = DivisionUrl.eventnumber().sum();
    let data = classToPlain(params);
    return this.basic.array(url, SumEventNumber, data);
  }

  private _history?: EventNumbersHistoryService;
  public get history(): EventNumbersHistoryService {
    if (!this._history) {
      this._history = new EventNumbersHistoryService(this.basic);
    }
    return this._history;
  }
}
class EventNumbersHistoryService {
  constructor(private basic: BaseRequestService) {}
  list(
    divisionId: string,
    params: GetDivisionEventNumbersParams
  ): Promise<PagedList<EventNumberStatistic>> {
    let url = DivisionUrl.eventnumber(divisionId).history.list();
    let data = classToPlain(params);
    return this.basic.paged(url, EventNumberStatistic, data);
  }
}

class StatisticService {
  constructor(private basic: BaseRequestService) {}
  private _number?: StatisticNumberService;
  public get number(): StatisticNumberService {
    if (!this._number) {
      this._number = new StatisticNumberService(this.basic);
    }
    return this._number;
  }
}
class StatisticNumberService {
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(DivisionNumberStatistic);
  }
  type: BaseTypeRequestService<DivisionNumberStatistic>;
  get(divisionId: string): Promise<DivisionNumberStatistic> {
    let url = DivisionUrl.statistic(divisionId).number.basic();
    return this.type.get(url);
  }
  list(
    params: GetDivisionStatisticNumbersParams
  ): Promise<PagedList<DivisionNumberStatistic>> {
    let url = DivisionUrl.statistic().number.list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  comparison(
    params: GetDivisionStatisticComparisonParams
  ): Promise<DivisionNumberStatisticComparison[]> {
    let url = DivisionUrl.statistic().number.comparison();
    let data = classToPlain(params);
    return this.basic.array(url, DivisionNumberStatisticComparison, data);
  }

  private _history?: StatisticNumberHistoryService;
  public get history(): StatisticNumberHistoryService {
    if (!this._history) {
      this._history = new StatisticNumberHistoryService(this.basic);
    }
    return this._history;
  }
}
class StatisticNumberHistoryService {
  constructor(private basic: BaseRequestService) {}
  list(
    divisionId: string,
    params: GetDivisionStatisticNumbersParamsV2
  ): Promise<DivisionNumberStatisticV2[]> {
    let url = DivisionUrl.volume(divisionId).history.list();
    let data = classToPlain(params);
    return this.basic.array(url, DivisionNumberStatisticV2, data);
  }
}
