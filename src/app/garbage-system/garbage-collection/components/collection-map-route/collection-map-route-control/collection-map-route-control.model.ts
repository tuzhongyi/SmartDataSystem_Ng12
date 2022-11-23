import { EventEmitter } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { GisRoutePoint } from 'src/app/network/model/gis-point.model';
import { IModel } from 'src/app/network/model/model.interface';
import {
  GarbageCollectionEventRecord,
  VehicleOnlineEventRecord,
} from 'src/app/network/model/vehicle-event-record.model';

export class CollectionMapRouteControlSource {
  points: GisRoutePoint[] = [];
  collectionRecord: GarbageCollectionEventRecord[] = [];
  onlineRecord: VehicleOnlineEventRecord[] = [];
}

export interface ICollectionMapRouteControlComponent
  extends IComponent<IModel, CollectionMapRouteControlSource> {
  business: ICollectionMapRouteControlChartsBusiness;
}

export interface ICollectionMapRouteControlChartsBusiness
  extends IBusiness<CollectionMapRouteControlSource> {
  scoreclick: EventEmitter<any>;
  routeclick: EventEmitter<Date>;
  run(time: Date): void;
}
