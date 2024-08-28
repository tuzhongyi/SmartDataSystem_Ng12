import { Camera } from '../../../model/garbage-station/camera.model';
import { PagedList } from '../../../model/page_list.model';
import { GarbageStationUrl } from '../../../url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';
import { GetGarbageStationCamerasParams } from '../garbage-station-request.params';
import { GarbageStationCameraAbnormalRequestService } from './garbage-station-camera-abnormal-request.service';
import { GarbageStationCameraFileRequestService } from './garbage-station-camera-file-request.service';
import { GarbageStationCameraTrashCanRequestService } from './garbage-station-camera-trash-can-request.service';

export class GarbageStationCameraRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(Camera);
  }

  private basicType: HowellBaseTypeRequestService<Camera>;
  all(stationId: string): Promise<Camera[]> {
    let url = GarbageStationUrl.camera(stationId).basic();
    return this.basicType.getArray(url);
  }
  create(camera: Camera): Promise<Camera> {
    let url = GarbageStationUrl.camera(camera.GarbageStationId).basic();
    return this.basicType.post(url, camera);
  }
  get(stationId: string, cameraId: string): Promise<Camera> {
    let url = GarbageStationUrl.camera(stationId).item(cameraId);
    return this.basicType.get(url);
  }
  update(camera: Camera): Promise<Camera> {
    let url = GarbageStationUrl.camera(camera.GarbageStationId).item(camera.Id);
    return this.basicType.put(url, camera);
  }
  delete(stationId: string, cameraId: string): Promise<Camera> {
    let url = GarbageStationUrl.camera(stationId).item(cameraId);
    return this.basicType.delete(url);
  }
  list(
    params: GetGarbageStationCamerasParams = new GetGarbageStationCamerasParams(),
    stationId?: string
  ): Promise<PagedList<Camera>> {
    let url = GarbageStationUrl.camera(stationId).list();
    return this.basicType.paged(url, params);
  }

  private _trasCan?: GarbageStationCameraTrashCanRequestService;
  public get trasCan(): GarbageStationCameraTrashCanRequestService {
    if (!this._trasCan) {
      this._trasCan = new GarbageStationCameraTrashCanRequestService(
        this.basic
      );
    }
    return this._trasCan;
  }

  private _file?: GarbageStationCameraFileRequestService;
  public get file(): GarbageStationCameraFileRequestService {
    if (!this._file) {
      this._file = new GarbageStationCameraFileRequestService(this.basic);
    }
    return this._file;
  }

  private _abnormal?: GarbageStationCameraAbnormalRequestService;
  public get abnormal(): GarbageStationCameraAbnormalRequestService {
    if (!this._abnormal) {
      this._abnormal = new GarbageStationCameraAbnormalRequestService(
        this.basic
      );
    }
    return this._abnormal;
  }
}
