import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { AbstractService } from 'src/app/business/Ibusiness';
import { CollectionDivisionStatisticNumber } from 'src/app/network/model/collection-division-statistic-number.model';
import { DivisionGarbageScore } from 'src/app/network/model/division-garbage-score.model';
import { DivisionGarbageWeight } from 'src/app/network/model/division-garbage-weight.model';
import { DivisionTree } from 'src/app/network/model/division-tree.model';
import { Division } from 'src/app/network/model/division.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageVehicleDivisionUrl } from 'src/app/network/url/garbage-vehicle/division.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { Cache } from '../../cache/cache';
import { GetDivisionTreeParams } from '../../division/division-request.params';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import {
  GetDivisionGarbageScoresParams,
  GetDivisionGarbageWeightsParams,
  GetDivisionsParams,
} from './collection-division-request.params';

@Cache(GarbageVehicleDivisionUrl.basic(), Division)
@Injectable({
  providedIn: 'root',
})
export class CollectionDivisionRequestService extends AbstractService<Division> {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<Division>;

  constructor(http: HowellAuthHttpService, router: Router) {
    super();
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(Division);
  }

  create(data: Division): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.basic();
    return this.type.post(url, data);
  }
  get(divisionId: string): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(divisionId);
    return this.type.get(url);
  }
  update(data: Division): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(divisionId: string): Promise<Division> {
    let url = GarbageVehicleDivisionUrl.item(divisionId);
    return this.type.delete(url);
  }
  list(
    params: GetDivisionsParams = new GetDivisionsParams()
  ): Promise<PagedList<Division>> {
    let url = GarbageVehicleDivisionUrl.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }

  excels(data?: BinaryData) {
    let url = GarbageVehicleDivisionUrl.excles();
    if (data) {
      return this.basic.postReturnString(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }

  private _garbage?: DivisionGarbage;
  get garbage() {
    if (!this._garbage) {
      this._garbage = new DivisionGarbage(this.basic);
    }
    return this._garbage;
  }

  private _statistic?: CollectionDivisionStatisticSerivce;
  public get statistic(): CollectionDivisionStatisticSerivce {
    if (!this._statistic) {
      this._statistic = new CollectionDivisionStatisticSerivce(this.basic);
    }
    return this._statistic;
  }

  tree(params?: GetDivisionTreeParams): Promise<DivisionTree> {
    let url = GarbageVehicleDivisionUrl.tree();
    if (params) {
      let data = instanceToPlain(params);
      return this.basic.post(url, DivisionTree, data);
    } else {
      return this.basic.get(url, DivisionTree);
    }
  }
}

class DivisionGarbage {
  weight = new GarbageVehicleWeightService(this.basic);
  score = new GarbageVehiclScoreService(this.basic);

  constructor(private basic: HowellBaseRequestService) {}
}

class GarbageVehicleWeightService {
  constructor(private basic: HowellBaseRequestService) {}

  get(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.garbage(divisionId).weight.basic();
    return this.basic.get(url, DivisionGarbageWeight);
  }
  list(params: GetDivisionGarbageWeightsParams) {
    let url = GarbageVehicleDivisionUrl.garbage().weight.basic();
    return this.basic.postArray(url, DivisionGarbageWeight, params);
  }
}

class GarbageVehiclScoreService {
  constructor(private basic: HowellBaseRequestService) {}

  get(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.garbage(divisionId).score.basic();
    return this.basic.get(url, DivisionGarbageScore);
  }
  list(params: GetDivisionGarbageScoresParams) {
    let url = GarbageVehicleDivisionUrl.garbage().score.basic();
    return this.basic.postArray(url, DivisionGarbageScore, params);
  }
}

class CollectionDivisionStatisticSerivce {
  constructor(private basic: HowellBaseRequestService) {}

  number(divisionId: string) {
    let url = GarbageVehicleDivisionUrl.statistic(divisionId).number();
    return this.basic.get(url, CollectionDivisionStatisticNumber);
  }
}
