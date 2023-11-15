import {
  ICreate,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';

export interface IGarbageVehicleCameraBindingBusiness
  extends ICreate<VehicleCamera[]>,
    IDelete<VehicleCamera[]> {}

export interface IGarbageVehicleCameraBindingComponent {
  business: IGarbageVehicleCameraBindingBusiness;
}
