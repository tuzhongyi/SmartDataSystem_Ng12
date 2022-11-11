import {
  IBusiness,
  ICreate,
  IDelete,
  IUpdate,
} from 'src/app/common/interfaces/bussiness.interface';
import { AICamera } from 'src/app/network/model/ai-camera.model';
import { Camera } from 'src/app/network/model/camera.model';
import {
  GarbageStation,
  GarbageStationType,
} from 'src/app/network/model/garbage-station.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { AICameraManageModel } from 'src/app/view-model/ai-camera-manage.model';

export type TGarbageStationOperateBusiness = IBusiness<GarbageStation> &
  ICreate<GarbageStation> &
  IUpdate<GarbageStation>;

export interface ICameraBusiness {
  ai: IBusiness<AICamera[]>;
  station: IBusiness<Camera[]> & ICreate<Camera> & IDelete<Camera>;
}
export interface IGarbageStationOperateBusiness
  extends TGarbageStationOperateBusiness {
  type: IBusiness<GarbageStationType[]>;
  camera: IBusiness<Array<Camera | AICamera>, Array<AICameraManageModel>> &
    ICameraBusiness;
}

export interface IGarbageStationOperateComponent {
  business: IGarbageStationOperateBusiness;
}
