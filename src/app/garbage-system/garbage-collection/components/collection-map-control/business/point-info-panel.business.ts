import { Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Language } from 'src/app/common/tools/language';
import { VehicleState } from 'src/app/enum/vehicle-state.enum';
import {
  MapPointInfoPanelModel,
  PointInfoPanelModelOptionCommand,
  PointInfoPanelModelState,
} from 'src/app/garbage-system/components/map-control-point-info-panel/map-point-info-panel.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageVehicle } from 'src/app/network/model/garbage-vehicle.model';
import { NBStatus } from 'src/app/network/model/nb-status.model';
import { CollectionDivisionRequestService } from 'src/app/network/request/garbage_vehicles/divisions/collection-division-request.service';
import { GarbageVehicleRequestService } from 'src/app/network/request/garbage_vehicles/garbage-vehicle/garbage-vehicle.service';

@Injectable()
export class GarbageVehiclePointInfoPanelBusiness
  implements IBusiness<GarbageVehicle, MapPointInfoPanelModel>
{
  vehicle?: GarbageVehicle;

  constructor(
    private divisionService: CollectionDivisionRequestService,
    private vehicleService: GarbageVehicleRequestService
  ) {}

  Converter = new PointInfoPanelConverter();
  async load(source: GarbageVehicle): Promise<MapPointInfoPanelModel> {
    let data = await this.getData(source.Id);
    let model = this.Converter.Convert(data, {
      division: (id: string) => {
        return this.divisionService.get(id);
      },
      nbstatus: (id: string) => {
        return this.vehicleService.nb.status(id);
      },
    });
    return model;
  }
  getData(id: string): Promise<GarbageVehicle> {
    return this.vehicleService.get(id);
  }
}

export class PointInfoPanelConverter
  implements IConverter<GarbageVehicle, MapPointInfoPanelModel>
{
  Convert(
    source: GarbageVehicle,
    getter: {
      division: (id: string) => Promise<Division>;
      nbstatus: (id: string) => Promise<NBStatus>;
    }
  ): MapPointInfoPanelModel {
    let model = new MapPointInfoPanelModel();
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
    model.powerTime = source.NBPowerOnTime;
    model.powerOn = source.PowerOn;
    model.state = [this.getState(source)];
    model.options = [
      {
        className: 'mdi mdi-power-plug',
        command: PointInfoPanelModelOptionCommand.collection_power_on,
        data: source,
        title: '远程唤醒',
        language: '远程唤醒',
      },
      {
        className: 'mdi mdi-power-plug-off',
        command: PointInfoPanelModelOptionCommand.collection_power_off,
        data: source,
        title: '远程关闭',
        language: '远程关闭',
      },
    ];
    getter.nbstatus(source.Id).then((status) => {
      model.signal = status.Signal;
      model.heartbeatTime = status.LastHeartbeatTime;
    });
    return model;
  }

  private getState(source: GarbageVehicle) {
    let state: PointInfoPanelModelState = {
      language: '',
      className: 'normal',
    };
    if (source.State) {
      if (source.State.contains(VehicleState.Offline)) {
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
