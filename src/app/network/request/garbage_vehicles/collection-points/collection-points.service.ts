/*
 * @Author: pmx
 * @Date: 2022-11-06 15:08:52
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 16:13:36
 */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { instanceToPlain } from 'class-transformer';
import { ClassificationNumber } from '../../../model/garbage-station/classification-number.mode';
import { CollectionPoint } from '../../../model/garbage-station/collection-point.model';
import { ScoreTop } from '../../../model/garbage-station/score-top.model';
import { CollectionTrashCan } from '../../../model/garbage-station/trash-can.model';
import { WeightTop } from '../../../model/garbage-station/weight-top.model';
import { PagedList } from '../../../model/page_list.model';
import { GarbageVehicleCollectionPointUrl } from '../../../url/garbage-vehicle/collection-point.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import {
  GetCollectionPointNumberParams,
  GetCollectionPointScoreTopListParams,
  GetCollectionPointsParams,
  GetCollectionPointWeightTopListParams,
  GetTrashCansParams,
} from './collection-points.params';

@Injectable({
  providedIn: 'root',
})
export class CollectionPointsRequestService {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<CollectionPoint>;

  constructor(http: HowellAuthHttpService, router: Router) {
    this.basic = new HowellBaseRequestService(http, router);
    this.type = this.basic.type(CollectionPoint);
  }

  get(id: string): Promise<CollectionPoint> {
    let url = GarbageVehicleCollectionPointUrl.item(id);
    return this.type.get(url);
  }
  update(data: CollectionPoint): Promise<CollectionPoint> {
    let url = GarbageVehicleCollectionPointUrl.item(data.Id);
    return this.type.put(url, data);
  }
  create(data: CollectionPoint): Promise<CollectionPoint> {
    let url = GarbageVehicleCollectionPointUrl.basic();
    return this.type.post(url, data);
  }
  delete(id: string): Promise<CollectionPoint> {
    let url = GarbageVehicleCollectionPointUrl.item(id);
    return this.type.delete(url);
  }
  list(
    params: GetCollectionPointsParams = new GetCollectionPointsParams()
  ): Promise<PagedList<CollectionPoint>> {
    let url = GarbageVehicleCollectionPointUrl.list();
    return this.type.paged(url, params);
  }

  async excel(data?: BinaryData) {
    let url = GarbageVehicleCollectionPointUrl.excels();
    if (data) {
      return this.basic.postBinaryData<string>(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }

  private _trashCan?: TrashCanService;
  public get trashCan(): TrashCanService {
    if (!this._trashCan) {
      this._trashCan = new TrashCanService(this.basic);
    }
    return this._trashCan;
  }
  private _statistic?: StatisticsService;
  public get statistic(): StatisticsService {
    if (!this._statistic) {
      this._statistic = new StatisticsService(this.basic);
    }
    return this._statistic;
  }
}

class TrashCanService {
  constructor(private basic: HowellBaseRequestService) {
    this.type = basic.type(CollectionTrashCan);
  }

  type: HowellBaseTypeRequestService<CollectionTrashCan>;

  create(data: CollectionTrashCan): Promise<CollectionTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan(
      data.CollectionPointId
    ).basic();
    return this.type.post(url, data);
  }

  list(params: GetTrashCansParams): Promise<PagedList<CollectionTrashCan>> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string) {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(id);
    return this.type.get(url);
  }
  update(data: CollectionTrashCan): Promise<CollectionTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string): Promise<CollectionTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(id);
    return this.type.delete(url);
  }
  excel(data?: BinaryData) {
    let url = GarbageVehicleCollectionPointUrl.trashcan().excels();
    if (data) {
      return this.basic.postReturnString(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }
}

class StatisticsService {
  constructor(private basic: HowellBaseRequestService) {}

  number(params: GetCollectionPointNumberParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.number();
    let data = instanceToPlain(params);
    return this.basic.postArray(url, ClassificationNumber, data);
  }

  scoreTopList(params: GetCollectionPointScoreTopListParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.scoreTopList();
    let data = instanceToPlain(params);
    return this.basic.paged(url, ScoreTop, data);
  }
  WeightTopList(params: GetCollectionPointWeightTopListParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.weightTopList();
    let data = instanceToPlain(params);
    return this.basic.paged(url, WeightTop, data);
  }
}
