import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionVehicleWindowModel } from './collection-vehicle-window.model';
import ColorPalette from 'src/assets/json/color-palette.json';

export class CollectionVehicleWindowConverter extends AbstractCommonModelConverter<CollectionVehicleWindowModel> {
  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof GarbageVehicle) {
      return this._fromGarbageVehicle(source);
    }
    throw new TypeError('类型出错');
  }

  private _fromGarbageVehicle(item: GarbageVehicle) {
    let model = new CollectionVehicleWindowModel<GarbageVehicle>();
    model.Id = item.Id;
    model.Name = item.Name;
    model.State = Language.VehicleStateFlags(item.State);

    if (item.State) {
      if (item.State.contains(VehicleState.Offline)) {
        model.StateStyle = {
          color: ColorPalette.PowderRedText,
        };
      } else {
        model.StateStyle = {
          color: ColorPalette.GreenText,
        };
      }
    } else {
      model.StateStyle = {
        color: ColorPalette.PowderRedText,
      };
    }

    if (item.State) {
      if (item.State.contains(VehicleState.Offline)) {
        model.StateCls = 'powder-red-text';
      } else {
        model.StateCls = 'green-text';
      }
    } else {
      model.StateCls = 'powder-red-text';
    }

    model.Type = Language.VehicleType(item.VehicleType);
    model.DivisionName = '杨浦区';
    model.No = item.No;
    model.PlatNo = item.PlateNo ?? '未知';
    model.rawData = item;

    return model;
  }
}
