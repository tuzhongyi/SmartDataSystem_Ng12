import {
  ICreate,
  IDelete,
  IDownload,
  IGet,
  IUpdate,
  IUpload,
} from 'src/app/common/interfaces/bussiness.interface';
import { VehicleCamera } from 'src/app/network/model/garbage-station/vehicle-camera.model';

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
