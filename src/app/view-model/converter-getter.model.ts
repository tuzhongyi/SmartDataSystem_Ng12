import { Camera } from '../network/model/garbage-station/camera.model';
import { Division } from '../network/model/garbage-station/division.model';
import { GarbageStation } from '../network/model/garbage-station/garbage-station.model';

export interface ConvertGetter {
  station?: (id: string) => Promise<GarbageStation>;
  division?: (id: string) => Promise<Division>;
  camera?: (stationId: string, cameraId: string) => Promise<Camera>;
}
