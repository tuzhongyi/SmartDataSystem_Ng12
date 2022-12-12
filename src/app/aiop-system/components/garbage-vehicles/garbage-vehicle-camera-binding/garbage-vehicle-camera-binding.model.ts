import {
  IBusiness,
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';

export interface IGarbageVehicleCameraBindingBusiness
  extends ICreate<VehicleCamera[]>,
    IDelete<VehicleCamera[]> {}

export interface IGarbageVehicleCameraBindingComponent {
  business: IGarbageVehicleCameraBindingBusiness;
}
