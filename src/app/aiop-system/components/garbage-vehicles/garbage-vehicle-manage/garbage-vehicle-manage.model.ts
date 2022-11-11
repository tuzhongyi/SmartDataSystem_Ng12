import {
  IBusiness,
  IDelete,
} from 'src/app/common/interfaces/bussiness.interface';
import { IComponent } from 'src/app/common/interfaces/component.interfact';
import { VehicleType } from 'src/app/enum/vehicle-type.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { IModel } from 'src/app/network/model/model.interface';
import { PagedList } from 'src/app/network/model/page_list.model';
import { CommonModel } from 'src/app/view-model/common-model';

export class GarbageVehicleModel<T = any> implements CommonModel {
  data?: T;
  Id!: string;
  Name!: string;
  Type!: VehicleType;
}

export interface IGarbageVehicleManageComponent {
  business: IBusiness<
    PagedList<GarbageVehicle>,
    PagedList<GarbageVehicleModel>
  > &
    IDelete<GarbageVehicle>;
}
