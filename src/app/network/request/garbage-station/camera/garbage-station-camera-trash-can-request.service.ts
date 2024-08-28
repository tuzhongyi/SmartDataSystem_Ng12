import { TrashCan } from 'src/app/network/model/garbage-station/trash-can.model';
import { GarbageStationUrl } from 'src/app/network/url/garbage/garbage-station.url';
import {
  HowellBaseRequestService,
  HowellBaseTypeRequestService,
} from '../../base-request-howell.service';

export class GarbageStationCameraTrashCanRequestService {
  constructor(private basic: HowellBaseRequestService) {
    this.basicType = basic.type(TrashCan);
  }

  private basicType: HowellBaseTypeRequestService<TrashCan>;
  all(stationId: string, cameraId: string): Promise<TrashCan[]> {
    let url = GarbageStationUrl.camera(stationId).trashcan(cameraId).basic();
    return this.basicType.getArray(url);
  }
  create(data: TrashCan): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(data.GarbageStationId)
      .trashcan(data.CameraId!)
      .basic();
    return this.basicType.post(url, data);
  }

  get(
    stationId: string,
    cameraId: string,
    trashCanId: string
  ): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(stationId)
      .trashcan(cameraId)
      .item(trashCanId);
    return this.basicType.get(url);
  }
  delete(
    stationId: string,
    cameraId: string,
    trashCanId: string
  ): Promise<TrashCan> {
    let url = GarbageStationUrl.camera(stationId)
      .trashcan(cameraId)
      .item(trashCanId);
    return this.basicType.delete(url);
  }
}
