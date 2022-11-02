import {
  CommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { CollectionVehicleModel } from './collection-vehicle.model';

export class CollectionVehicleConverter extends CommonModelConverter<
  CollectionVehicleModel,
  any
> {
  Convert(source: CommonModelSource, ...res: any[]): CollectionVehicleModel {
    return new CollectionVehicleModel();
  }
}
