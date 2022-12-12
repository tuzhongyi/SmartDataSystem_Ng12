import {
  ICreate,
  IUpdate,
  IDelete,
  IUpload,
  IGet,
  IDownload,
} from 'src/app/common/interfaces/bussiness.interface';
import { VehicleCamera } from 'src/app/network/model/vehicle-camera.model';

export interface IGarbageVehicleCameraManagerBusiness
  extends IGet<VehicleCamera>,
    ICreate<VehicleCamera>,
    IUpdate<VehicleCamera>,
    IDelete<VehicleCamera[]>,
    IUpload,
    IDownload {}

export interface IGarbageVehicleCameraManagerComponent {
  business: IGarbageVehicleCameraManagerBusiness;
}
