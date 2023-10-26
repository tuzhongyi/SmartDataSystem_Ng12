import {
  IBusiness,
  ICreate,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/garbage-station/ai-camera.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';

export type TGarbageVehicleOperateBusiness = IBusiness<GarbageVehicle> &
  ICreate<GarbageVehicle> &
  IUpdate<GarbageVehicle>;

export interface IGarbageVehicleOperateBusiness
  extends TGarbageVehicleOperateBusiness {
  camera: IBusiness<AICamera, VehicleCamera>;
}

export interface IGarbageVehicleOperateComponent {
  business: IGarbageVehicleOperateBusiness;
}
