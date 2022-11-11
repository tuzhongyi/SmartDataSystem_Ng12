import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { PagedList } from 'src/app/network/model/page_list.model';
import { GarbageVehicleModel } from './garbage-vehicle-manage.model';

export class GarbageVehicleManageConverter
  implements
    IConverter<PagedList<GarbageVehicle>, PagedList<GarbageVehicleModel>>
{
  item = new GarbageVehicleItemConverter();
  Convert(
    source: PagedList<GarbageVehicle>,
    ...res: any[]
  ): PagedList<GarbageVehicleModel> {
    let paged = new PagedList<GarbageVehicleModel<GarbageVehicle>>();
    paged.Page = source.Page;
    paged.Data = source.Data.map((x) => {
      return this.item.Convert(x);
    });
    return paged;
  }
}

class GarbageVehicleItemConverter
  implements IConverter<GarbageVehicle, GarbageVehicleModel<GarbageVehicle>>
{
  Convert(
    source: GarbageVehicle,
    ...res: any[]
  ): GarbageVehicleModel<GarbageVehicle> {
    let model = new GarbageVehicleModel<GarbageVehicle>();
    model.Id = source.Id;
    model.Name = source.Name;
    model.Type = source.VehicleType;
    model.data = source;
    return model;
  }
}
