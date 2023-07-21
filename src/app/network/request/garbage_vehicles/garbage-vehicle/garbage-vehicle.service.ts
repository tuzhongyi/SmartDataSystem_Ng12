/*
 * @Author: pmx
 * @Date: 2022-11-04 15:13:17
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-04 15:39:45
 */
import { Injectable } from '@angular/core';
import { instanceToPlain } from 'class-transformer';
import { AbstractService } from 'src/app/business/Ibusiness';
import { HowellResponse } from 'src/app/network/model/howell-response.model';
import { GarbageVehicle } from '../../../model/garbage-vehicle.model';
import { GisRoutePoint } from '../../../model/gis-point.model';
import { PagedList } from '../../../model/page_list.model';
import { VehicleCamera } from '../../../model/vehicle-camera.model';
import { GarbageVehicleUrl } from '../../../url/garbage-vehicle/garbage-vehicle.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { Cache } from '../../cache/cache';
import { HowellAuthHttpService } from '../../howell-auth-http.service';
import {
  GetGarbageVehicleCamerasParams,
  GetGarbageVehicleRouteParams,
  GetGarbageVehiclesParams,
  NBPowerOnParams,
  ResetRelayParams,
} from './garbage-vehicle.params';

@Cache(GarbageVehicleUrl.basic(), GarbageVehicle)
@Injectable({
  providedIn: 'root',
})
export class GarbageVehicleRequestService extends AbstractService<GarbageVehicle> {
  private basic: HowellBaseRequestService;
  private type: HowellBaseTypeRequestService<GarbageVehicle>;
  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new HowellBaseRequestService(_http);
    this.type = this.basic.type(GarbageVehicle);
  }
  create(data: GarbageVehicle): Promise<GarbageVehicle> {
    let url = GarbageVehicleUrl.basic();
    return this.type.post(url, data);
  }
  get(vehicleId: string): Promise<GarbageVehicle> {
    let url = GarbageVehicleUrl.item(vehicleId);
    return this.type.get(url);
  }
  update(data: GarbageVehicle): Promise<GarbageVehicle> {
    let url = GarbageVehicleUrl.item(data.Id);
    return this.type.put(url, data);
  }
  delete(vehicleId: string): Promise<GarbageVehicle> {
    let url = GarbageVehicleUrl.item(vehicleId);
    return this.type.delete(url);
  }
  list(
    params: GetGarbageVehiclesParams = new GetGarbageVehiclesParams()
  ): Promise<PagedList<GarbageVehicle>> {
    let url = GarbageVehicleUrl.list();
    let data = instanceToPlain(params);
    return this.type.paged(url, data);
  }
  excel(data?: BinaryData) {
    let url = GarbageVehicleUrl.excles();
    if (data) {
      return this.basic.postBinaryData(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }

  private _camera?: VehicleCameraService;
  get camera() {
    if (!this._camera) {
      this._camera = new VehicleCameraService(this.basic);
    }
    return this._camera;
  }
  private _route?: VehicleRouteService;
  get route() {
    if (!this._route) {
      this._route = new VehicleRouteService(this.basic);
    }
    return this._route;
  }
  private _relay?: VehicleRelayService;
  get relay() {
    if (!this._relay) {
      this._relay = new VehicleRelayService(this.basic);
    }
    return this._relay;
  }

  private _nb?: VehicleNBService;
  public get nb(): VehicleNBService {
    if (!this._nb) {
      this._nb = new VehicleNBService(this.basic);
    }
    return this._nb;
  }
}

class VehicleCameraService {
  private basicType: HowellBaseTypeRequestService<VehicleCamera>;
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(VehicleCamera);
  }

  all(vehicleId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).basic();
    return this.basicType.get(url);
  }

  list(
    params: GetGarbageVehicleCamerasParams = new GetGarbageVehicleCamerasParams()
  ) {
    let url = GarbageVehicleUrl.camera().list();
    let data = instanceToPlain(params);
    return this.basicType.paged(url, data);
  }
  create(camera: VehicleCamera) {
    let url = GarbageVehicleUrl.camera(camera.GarbageVehicleId).basic();
    return this.basicType.post(url, camera);
  }

  get(vehicleId: string, cameraId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).item(cameraId);
    return this.basicType.get(url);
  }
  update(camera: VehicleCamera) {
    let url = GarbageVehicleUrl.camera(camera.GarbageVehicleId).item(camera.Id);
    return this.basicType.put(url, camera);
  }
  delete(vehicleId: string, cameraId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).item(cameraId);
    return this.basicType.delete(url);
  }
  excel(data?: BinaryData) {
    let url = GarbageVehicleUrl.camera().excles();
    if (data) {
      return this.basic.postBinaryData(url, data);
    } else {
      return this.basic.getExcel(url);
    }
  }
}

class VehicleRouteService {
  private basicType: HowellBaseTypeRequestService<GisRoutePoint>;
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(GisRoutePoint);
  }

  list(
    params: GetGarbageVehicleRouteParams = new GetGarbageVehicleRouteParams()
  ) {
    let url = GarbageVehicleUrl.route().list();
    let data = instanceToPlain(params);
    return this.basicType.paged(url, data);
  }
}

class VehicleRelayService {
  constructor(private basic: HowellBaseRequestService) {}

  reset(vehicleId: string, params: ResetRelayParams) {
    let url = GarbageVehicleUrl.relay(vehicleId).reset();
    let data = instanceToPlain(params);
    return this.basic.postReturnString(url, data);
  }
}

class VehicleNBService {
  constructor(private basic: HowellBaseRequestService) {}

  power(id: string, params: NBPowerOnParams = new NBPowerOnParams()) {
    let url = GarbageVehicleUrl.nb(id).power();
    let data = instanceToPlain(params);
    return this.basic.http
      .howellPost<NBPowerOnParams, HowellResponse<string>>(
        url,
        data as NBPowerOnParams
      )
      .toPromise()
      .then((x) => {
        return x.FaultCode === 0;
      });
  }
}
