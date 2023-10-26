import {
  IBusiness,
  ICreate,
  IDelete,
  IDownload,
  IUpdate,
  IUpload,
} from 'src/app/common/interfaces/bussiness.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-station/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CommonModel } from 'src/app/view-model/common-model';

export class GarbageVehicleModel<T = any> implements CommonModel {
  data?: T;
  Id: string = '';
  Name: string = '';
  Type: string = '';
  PlateNo: string = '';
  No: string = '';
  IMEI: string = '';
}

export interface IGarbageVehicleManageBusiness
  extends IBusiness<PagedList<GarbageVehicle>, PagedList<GarbageVehicleModel>>,
    IDelete<GarbageVehicle>,
    ICreate<GarbageVehicle>,
    IUpdate<GarbageVehicle>,
    IUpload,
    IDownload {}

export interface IGarbageVehicleManageComponent {
  business: IGarbageVehicleManageBusiness;
}
