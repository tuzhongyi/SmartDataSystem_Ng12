import { GarbageVehicle } from '../model/garbage-station/garbage-vehicle/garbage-vehicle.model';
import { VehicleCamera } from '../model/garbage-station/garbage-vehicle/vehicle-camera.model';

export class VehicleCameraModel extends VehicleCamera {
  GarbageVehicle!: Promise<GarbageVehicle>;
}
