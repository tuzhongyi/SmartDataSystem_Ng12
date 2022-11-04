/*
 * @Author: pmx
 * @Date: 2022-11-04 15:13:17
 * @Last Modified by: pmx
 * @Last Modified time: 2022-11-04 15:39:45
 */
import { Injectable } from '@angular/core';
import { classToPlain } from 'class-transformer';
import { AbstractService } from 'src/app/business/Ibusiness';
import { GarbageVehicle } from '../../model/garbage-vehicle.model';
import { GisPoint } from '../../model/gis-point.model';
import { PagedList } from '../../model/page_list.model';
import { VehicleCamera } from '../../model/vehicle-camera.model';
import { GarbageVehicleUrl } from '../../url/garbage-vehicle/garbage-vehicle.url';
import {
  BaseRequestService,
  BaseTypeRequestService,
} from '../base-request.service';
import { Cache } from '../cache/cache';
import { HowellAuthHttpService } from '../howell-auth-http.service';
import {
  GetGarbageVehicleCamerasParams,
  GetGarbageVehicleRouteParams,
  GetGarbageVehiclesParams,
  ResetRelayParams,
} from './garbage-vehicle.params';

@Cache(GarbageVehicleUrl.basic(), GarbageVehicle)
@Injectable({
  providedIn: 'root',
})
export class GarbageVehicleService extends AbstractService<GarbageVehicle> {
  private basic: BaseRequestService;
  private type: BaseTypeRequestService<GarbageVehicle>;
  constructor(_http: HowellAuthHttpService) {
    super();
    this.basic = new BaseRequestService(_http);
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
    let data = classToPlain(params);
    return this.type.paged(url, data);
  }
  excels(data: BinaryData) {
    let url = GarbageVehicleUrl.excles();
    return this.basic.postReturnString(url, data);
  }

  private _vehicleCamera?: VehicleCameraService;
  get vehicleCamera() {
    if (this._vehicleCamera) {
      this._vehicleCamera = new VehicleCameraService(this.basic);
    }
    return this._vehicleCamera;
  }
  private _vehicleRoute?: VehicleRouteService;
  get vehicleRoute() {
    if (this._vehicleRoute) {
      this._vehicleRoute = new VehicleRouteService(this.basic);
    }
    return this._vehicleRoute;
  }
  private _vehicleRelay?: VehicleRelayService;
  get vehicleRelay() {
    if (this._vehicleRelay) {
      this._vehicleRelay = new VehicleRelayService(this.basic);
    }
    return this._vehicleRelay;
  }
}

class VehicleCameraService {
  private basicType: BaseTypeRequestService<VehicleCamera>;
  constructor(private basic: BaseRequestService) {
    this.basicType = basic.type(VehicleCamera);
  }

  all(vehicleId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).basic();
    return this.basicType.get(url);
  }

  list(
    params: GetGarbageVehicleCamerasParams = new GetGarbageVehicleCamerasParams()
  ) {
    let url = GarbageVehicleUrl.camera().basic();
    let data = classToPlain(params);
    return this.basicType.paged(url, data);
  }
  create(vehicleId: string, camera: VehicleCamera) {
    let url = GarbageVehicleUrl.camera(vehicleId).basic();
    return this.basicType.post(url, camera);
  }

  get(vehicleId: string, cameraId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).item(cameraId);
    return this.basicType.get(url);
  }
  update(vehicleId: string, camera: VehicleCamera) {
    let url = GarbageVehicleUrl.camera(vehicleId).item(camera.Id);
    return this.basicType.put(url, camera);
  }
  delete(vehicleId: string, cameraId: string) {
    let url = GarbageVehicleUrl.camera(vehicleId).item(cameraId);
    return this.basicType.delete(url);
  }
  excels(data: BinaryData) {
    let url = GarbageVehicleUrl.camera().excles();
    return this.basic.postReturnString(url, data);
  }
}

class VehicleRouteService {
  private basicType: BaseTypeRequestService<GisPoint>;
  constructor(private basic: BaseRequestService) {
    this.basicType = basic.type(GisPoint);
  }

  list(
    params: GetGarbageVehicleRouteParams = new GetGarbageVehicleRouteParams()
  ) {
    let url = GarbageVehicleUrl.route().list();
    let data = classToPlain(params);
    return this.basicType.paged(url, data);
  }
}

class VehicleRelayService {
  constructor(private basic: BaseRequestService) {}

  reset(vehicleId: string, params: ResetRelayParams) {
    let url = GarbageVehicleUrl.relay(vehicleId).reset();
    let data = classToPlain(params);
    return this.basic.postReturnString(url, data);
  }
}
