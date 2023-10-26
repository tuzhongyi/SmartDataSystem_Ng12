import { instanceToInstance } from 'class-transformer';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { GisRoutePoint } from 'src/app/network/model/garbage-station/gis-point.model';
import { GisRoutePointModel } from 'src/app/network/view-model/gis-route-point.view-model';

export class CollectionMapRouteControlConverter
  implements IConverter<GisRoutePoint[], GisRoutePointModel[]>
{
  private item = new CollectionMapRouteControlItemConverter();
  Convert(source: GisRoutePoint[], getter: {}): GisRoutePointModel[] {
    return source.map((x) => {
      return this.item.Convert(x);
    });
  }
}

export class CollectionMapRouteControlItemConverter
  implements IConverter<GisRoutePoint, GisRoutePointModel>
{
  Convert(source: GisRoutePoint, ...res: any[]): GisRoutePointModel {
    let model = new GisRoutePointModel();
    model = instanceToInstance(source);
    return model;
  }
}
