import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { Language } from 'src/app/common/tools/language';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import {
  PointInfoPanelModel,
  PointInfoPanelModelState,
} from 'src/app/garbage-system/components/map-control/point-info-panel/point-info-panel.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehiclePointInfoPanelBusiness
  implements IBusiness<GarbageVehicle, PointInfoPanelModel>
{
  vehicle?: GarbageVehicle;

  constructor(private divisionService: CollectionDivisionRequestService) {}

  Converter = new PointInfoPanelConverter();
  async load(source: GarbageVehicle): Promise<PointInfoPanelModel> {
    let model = this.Converter.Convert(source, {
      division: (id: string) => {
        return this.divisionService.get(id);
      },
    });
    return model;
  }
  getData(...args: any): Promise<GarbageVehicle> {
    throw new Error('Method not implemented.');
  }
}

export class PointInfoPanelConverter
  implements IConverter<GarbageVehicle, PointInfoPanelModel>
{
  Convert(
    source: GarbageVehicle,
    getter: {
      division: (id: string) => Promise<Division>;
    }
  ): PointInfoPanelModel {
    let model = new PointInfoPanelModel();
    model.id = source.Id;
    model.name = source.Name;
    if (source.DivisionId) {
      model.committeeName = new Promise((got) => {
        getter.division(source.DivisionId!).then((division) => {
          got(division.Name);

          model.roadName = new Promise((gotRoadName) => {
            if (division.ParentId) {
              getter.division(division.ParentId).then((parent) => {
                gotRoadName(parent.Name);
              });
            }
          });
        });
      });
    }

    model.state = this.getState(source);
    return model;
  }

  private getState(station: GarbageVehicle) {
    let state: PointInfoPanelModelState = {
      language: '',
      className: 'normal',
    };
    if (station.State) {
      if (station.State.contains(VehicleState.Offline)) {
        state.className = 'error';
        state.language = Language.VehicleState(VehicleState.Offline);
      } else {
        state.language = '';
        state.className = 'normal';
      }
    }
    return state;
  }
}
