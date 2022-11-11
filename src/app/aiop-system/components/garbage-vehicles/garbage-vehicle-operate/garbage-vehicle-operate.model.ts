import {
  IBusiness,
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';

import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';

export type TGarbageVehicleOperateBusiness = IBusiness<GarbageVehicle> &
  ICreate<GarbageVehicle> &
  IUpdate<GarbageVehicle>;

export interface ICameraBusiness {
  ai: IBusiness<AICamera[]>;
  vehicle: IBusiness<VehicleCamera[]> &
    ICreate<VehicleCamera> &
    IDelete<VehicleCamera>;
}
export interface IGarbageVehicleOperateBusiness
  extends TGarbageVehicleOperateBusiness {
  camera: IBusiness<
    Array<VehicleCamera | AICamera>,
    Array<AICameraManageModel>
  > &
    ICameraBusiness;
}

export interface IGarbageVehicleOperateComponent {
  business: IGarbageVehicleOperateBusiness;
}
