import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionMapRouteDevice } from './collection-map-route-query.model';

export class CollectionMapRouteDeviceListConverter
  implements IConverter<GarbageVehicle[], CollectionMapRouteDevice[]>
{
  private item = new CollectionMapRouteDeviceConverter();
  Convert(
    source: GarbageVehicle[],
    ...res: any[]
  ): CollectionMapRouteDevice<any>[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

class CollectionMapRouteDeviceConverter
  implements
    IConverter<GarbageVehicle, CollectionMapRouteDevice<GarbageVehicle>>
{
  Convert(
    source: GarbageVehicle,
    ...res: any[]
  ): CollectionMapRouteDevice<GarbageVehicle> {
    let item = new CollectionMapRouteDevice<GarbageVehicle>();
    item.id = source.Id;
    item.name = source.Name;
    item.data = source;
    return item;
  }
}
