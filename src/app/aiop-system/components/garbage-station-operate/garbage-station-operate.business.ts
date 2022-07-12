import { Injectable } from "@angular/core";
import { AICameraManageConverter } from "src/app/converter/ai-camera-manage.converter";
import { Camera } from "src/app/network/model/camera.model";
import { GarbageStation } from "src/app/network/model/garbage-station.model";
import { GetCamerasParams } from "src/app/network/request/ai-camera/ai-camera.params";
import { AICameraRequestService } from "src/app/network/request/ai-camera/ai-camera.service";
import { GarbageStationRequestService } from "src/app/network/request/garbage-station/garbage-station-request.service";

@Injectable()
export class GarbageStationOperateBusiness {

  constructor(private _garbageStationRequest: GarbageStationRequestService, private _aiCameraRequest: AICameraRequestService, private _converter: AICameraManageConverter) {

  }
  async listAvailableCameras(condition: string = '') {
    let aiopCameras = (await this._listAiopCameras(condition)).Data;
    // console.log('AIOPCameras', aiopCameras)
    let stationCameras = (await this._listStationCameras()).Data;
    // console.log('StationCameras', stationCameras)


    let available = aiopCameras.filter(aiopCamera => !stationCameras.some(stationCamera => stationCamera.Id == aiopCamera.Id))
    let res = this._converter.iterateToModel(available)

    return res;
  }

  listTypes() {
    return this._garbageStationRequest.type.list()
  }
  createGarbageStation(station: GarbageStation) {
    return this._garbageStationRequest.create(station)
  }
  getGarbageStation(id: string) {
    return this._garbageStationRequest.get(id)
  }
  addCameraToGarbageStation(camera: Camera) {
    return this._garbageStationRequest.camera.create(camera)
  }
  deleteCameraInGarbageStation(stationId: string, cameraId: string) {
    return this._garbageStationRequest.camera.delete(stationId, cameraId)
  }
  updateGarbageStation(station: GarbageStation) {
    return this._garbageStationRequest.update(station)
  }
  private _listAiopCameras(condition: string) {
    let params = new GetCamerasParams();
    params.Name = condition;
    return this._aiCameraRequest.list(params)
  }
  private _listStationCameras() {
    return this._garbageStationRequest.camera.list()
  }
}