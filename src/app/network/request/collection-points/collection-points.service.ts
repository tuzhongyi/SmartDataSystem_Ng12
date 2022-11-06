/*
 * @Author: pmx 
 * @Date: 2022-11-06 15:08:52 
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-06 16:13:36
 */
import { Injectable } from "@angular/core";
import { classToPlain } from "class-transformer";
import { ClassificationNumber } from "../../model/classification-number.mode";
import { CollectionPoint } from "../../model/collection-point.model";
import { PagedList } from "../../model/page_list.model";
import { ScoreTop } from "../../model/score-top.model";
import { TrashCan, VehicleTrashCan } from "../../model/trash-can.model";
import { WeightTop } from "../../model/weight-top.model";
import { GarbageVehicleCollectionPointUrl } from "../../url/garbage-vehicle/collection-point.url";
import { BaseRequestService, BaseTypeRequestService } from "../base-request.service";
import { HowellAuthHttpService } from "../howell-auth-http.service";
import { GetCollectionPointNumberParams, GetCollectionPointScoreTopListParams, GetCollectionPointsParams, GetCollectionPointWeightTopListParams, GetTrashCansParams } from "./collection-points.params";

@Injectable({
  providedIn: 'root',
})
export class CollectionPointsService {


  private basic: BaseRequestService;
  private type: BaseTypeRequestService<CollectionPoint>;

  constructor(private _http: HowellAuthHttpService) {
    this.basic = new BaseRequestService(_http);
    this.type = this.basic.type(CollectionPoint);

  }

  get(id: string): Promise<CollectionPoint> {
    let url = GarbageVehicleCollectionPointUrl.item(id)
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

  excel(data: BinaryData) {
    let url = GarbageVehicleCollectionPointUrl.excels()
    if (data)
      return this.basic.postReturnString(url, data);
    else
      return this.type.get(url)
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
  constructor(private basic: BaseRequestService) {
    this.type = basic.type(VehicleTrashCan);
  }

  type: BaseTypeRequestService<VehicleTrashCan>;

  create(id: string, data: VehicleTrashCan): Promise<VehicleTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan(id).basic();
    return this.type.post(url, data);
  }

  list(params: GetTrashCansParams): Promise<PagedList<VehicleTrashCan>> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().list();
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  get(id: string) {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(id)
    return this.type.get(url);
  }
  update(data: VehicleTrashCan): Promise<VehicleTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(data.Id);
    return this.type.put(url, data);
  }
  delete(id: string): Promise<VehicleTrashCan> {
    let url = GarbageVehicleCollectionPointUrl.trashcan().item(id)
    return this.type.delete(url);
  }
}


class StatisticsService {
  constructor(private basic: BaseRequestService) {
  }

  number(params: GetCollectionPointNumberParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.number()
    let data = classToPlain(params);
    return this.basic.paged(url, ClassificationNumber, data);
  }

  scoreTopList(params: GetCollectionPointScoreTopListParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.scoreTopList()
    let data = classToPlain(params);
    return this.basic.paged(url, ScoreTop, data);
  }
  WeightTopList(params: GetCollectionPointWeightTopListParams) {
    let url = GarbageVehicleCollectionPointUrl.statistics.weightTopList()
    let data = classToPlain(params);
    return this.basic.paged(url, WeightTop, data);
  }

}
