import { EventEmitter, Injectable } from '@angular/core';
import { SelectItem } from 'src/app/common/components/select-control/select-control.model';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStoreService } from 'src/app/common/service/global-store.service';
import { Camera } from 'src/app/network/model/camera.model';
import { Division } from 'src/app/network/model/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordFilterConverter } from './interval-division-station-filter.converter';
import {
  DivisionStationFilteModel,
  DivisionStationFilterOpts,
} from './interval-division-station-filter.model';

@Injectable()
export class EventRecordFilterBusiness
  implements IBusiness<string, DivisionStationFilteModel>
{
  constructor(
    private storeService: GlobalStoreService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) { }

  Converter: IConverter<string, DivisionStationFilteModel> =
    new EventRecordFilterConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;
  async load(
    opts: DivisionStationFilterOpts
  ): Promise<DivisionStationFilteModel> {
    let divisions: Division[];
    let stations: GarbageStation[];
    let cameras: Camera[] = [];

    if (opts) {
      divisions = await this.getDivisions(this.storeService.divisionId);
      stations = await this.getStation(opts.divisionId);
      if (opts.stationId) {
        let station = stations.find((x) => x.Id === opts.stationId);
        if (station && station.Cameras) {
          cameras = station.Cameras;
        }
      } else {
        stations.forEach((x) => {
          if (x.Cameras) {
            cameras = [...cameras, ...x.Cameras];
          }
        });
      }
    } else {
      divisions = await this.getDivisions(this.storeService.divisionId);
      stations = await this.getStation(this.storeService.divisionId);
      stations.forEach((x) => {
        if (x.Cameras) {
          cameras = [...cameras, ...x.Cameras];
        }
      });
    }

    divisions = divisions.sort((a, b) => {
      return a.Name.localeCompare(b.Name);
    });

    stations = stations.sort((a, b) => {
      return a.Name.localeCompare(b.Name);
    });
    cameras = cameras.sort((a, b) => {
      return a.Name.localeCompare(b.Name);
    });

    let model = this.Converter.Convert('', divisions, stations, cameras);

    model.divisions.unshift(
      new SelectItem('', undefined, '请选择')
    );
    model.stations.unshift(
      new SelectItem('', undefined, '请选择')
    );
    model.cameras.unshift(
      new SelectItem('', undefined, '请选择')
    );

    return model;
  }
  getData(...args: any): Promise<string> {
    throw new Error('Method not implemented.');
  }

  async getDivisions(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let response = await this.divisionService.cache.list(params);
    return response.Data;
  }

  async getDivision(id: string) {
    return await this.divisionService.cache.get(id);
  }

  async getStation(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let response = await this.stationService.cache.list(params);
    return response.Data;
  }
}
