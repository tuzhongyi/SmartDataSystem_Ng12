import { Language } from 'src/app/common/tools/language';
import {
  AbstractCommonModelConverter,
  AbstractCommonModelPromiseConverter,
  CommonModelSource,
} from 'src/app/converter/common-model.converter';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionVehicleWindowModel } from './collection-vehicle-window.model';
import ColorPalette from 'src/assets/json/color-palette.json';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { Division } from 'src/app/network/model/division.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CollectionVehicleWindowConverter extends AbstractCommonModelPromiseConverter<CollectionVehicleWindowModel> {
  private _divisonMap = new Map<string, Division>();

  constructor(
    private _collectionDivisionRequest: CollectionDivisionRequestService
  ) {
    super();
  }

  Convert(source: CommonModelSource, ...res: any[]) {
    if (source instanceof GarbageVehicle) {
      return this._fromGarbageVehicle(source);
    }
    throw new TypeError('类型出错');
  }

  private async _fromGarbageVehicle(source: GarbageVehicle) {
    let model = new CollectionVehicleWindowModel<GarbageVehicle>();
    model.Id = source.Id;
    model.Name = source.Name;
    model.State = Language.VehicleStateFlags(source.State);

    if (source.State) {
      if (source.State.contains(VehicleState.Offline)) {
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

    if (source.State) {
      if (source.State.contains(VehicleState.Offline)) {
        model.StateCls = 'powder-red-text';
      } else {
        model.StateCls = 'green-text';
      }
    } else {
      model.StateCls = 'powder-red-text';
    }

    model.Type = Language.VehicleType(source.VehicleType);

    model.No = source.No;
    model.PlatNo = source.PlateNo ?? Language.json.Unknow;

    model.DivisionName = Language.json.Unknow;

    if (source.DivisionId) {
      if (this._divisonMap.has(source.DivisionId)) {
        let division = this._divisonMap.get(source.DivisionId)!;
        model.DivisionName = division.Name;
      } else {
        let division = await this._collectionDivisionRequest.get(
          source.DivisionId
        );
        model.DivisionName = division.Name;

        this._divisonMap.set(source.DivisionId, division);
      }
    }

    model.rawData = source;

    return model;
  }
}
