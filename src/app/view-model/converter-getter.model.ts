import { Camera } from '../network/model/camera.model';
import { Division } from '../network/model/division.model';
import { GarbageStation } from '../network/model/garbage-station.model';

export interface ConvertGetter {
  station?: (id: string) => Promise<GarbageStation>;
  division?: (id: string) => Promise<Division>;
  camera?: (stationId: string, cameraId: string) => Promise<Camera>;
}
