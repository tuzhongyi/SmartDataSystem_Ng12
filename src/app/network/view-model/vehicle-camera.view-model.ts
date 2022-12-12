import { GarbageVehicle } from '../model/garbage-vehicle.model';
import { VehicleCamera } from '../model/vehicle-camera.model';

export class VehicleCameraModel extends VehicleCamera {
  GarbageVehicle!: Promise<GarbageVehicle>;
}
