import { EventEmitter, Injectable } from '@angular/core';
import { AMapDragendArgs } from '../deploy-map.model';
import { DeployAMapClient } from './deploy-amap.client';

@Injectable()
export class DeployAMapBusiness {
  constructor(private amap: DeployAMapClient) {
    this.regist();
  }

  mouse = new CesiumDataController.Position();

  dragend: EventEmitter<AMapDragendArgs> = new EventEmitter();
  dblclick: EventEmitter<CesiumDataController.Position> = new EventEmitter();
  click: EventEmitter<CesiumDataController.Point> = new EventEmitter();

  get src() {
    return this.amap.src;
  }

  init(iframe: HTMLIFrameElement) {
    this.amap.init(iframe);
  }

  async regist() {
    let client = await this.amap.client;
    client.Events.OnMouseMoving = (lon: number, lat: number) => {
      this.mouse.lon = lon;
      this.mouse.lat = lat;
    };
    client.Events.OnElementDragend = (
      point: CesiumDataController.Point,
      position: CesiumDataController.Position
    ) => {
      this.dragend.emit({ point, position });
    };
    client.Events.OnElementsClicked = (objs) => {
      if (!objs || objs.length < 0) return;
      // console.log("点击: ", objs)
      let point = objs[0] as unknown as CesiumDataController.Point;
      client.Viewer.MoveTo(point.position);
      this.click.emit(point);
    };
    client.Events.OnMouseDoubleClick = (position) => {
      this.dblclick.emit(position);
    };
  }

  async drag(isdragging: boolean) {
    let client = await this.amap.client;
    client.Point.Draggable(isdragging);
  }

  async move(lon: number, lat: number) {
    let client = await this.amap.client;
    let position = new CesiumDataController.Position();
    position.lon = lon;
    position.lat = lat;
    client.Viewer.MoveTo(position);
  }
  async selectVillage(id: string) {
    let client = await this.amap.client;
    let controller = await this.amap.controller;
    let village = controller.Village.Get(id);
    client.Village.Select(id);
    client.Viewer.MoveTo(village.center);
    return village;
  }
  async selectPoint(villageId: string, pointId: string) {
    let client = await this.amap.client;
    let controller = await this.amap.controller;
    let point = controller.Village.Point.Get(villageId, pointId);
    client.Viewer.MoveTo(point.position);
    return point;
  }
  async remove(villageId: string, pointId: string) {
    let client = await this.amap.client;
    let controller = await this.amap.controller;
    let result = controller.Village.Point.Remove(villageId, pointId);
    if (result) {
      client.Point.Remove(pointId);
      return true;
    }
    return false;
  }
  async update(point: CesiumDataController.Point) {
    let client = await this.amap.client;
    let controller = await this.amap.controller;
    let result = controller.Village.Point.Update(
      point.villageId,
      point.id,
      point
    );
    if (result) {
      client.Point.Remove(point.id);
      client.Point.Create(point);
      return true;
    }
    return false;
  }
  async create(villageId: string, point: CesiumDataController.Point) {
    let controller = await this.amap.controller;
    let client = await this.amap.client;

    let result = controller.Village.Point.Create(villageId, point.id, point);
    if (result) {
      client.Point.Create(point);
      return true;
    }
    return false;
  }
  async refresh(point: CesiumDataController.Point) {
    let client = await this.amap.client;
    client.Point.Remove(point.id);
    client.Point.Create(point);
  }
}
