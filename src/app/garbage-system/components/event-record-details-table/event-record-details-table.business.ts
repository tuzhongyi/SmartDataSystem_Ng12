import { EventEmitter, Injectable } from '@angular/core';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IPromiseConverter } from 'src/app/common/interfaces/converter.interface';
import { ISubscription } from 'src/app/common/interfaces/subscribe.interface';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { SelectItemConverter } from 'src/app/converter/select-item.converter';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GetDivisionsParams } from 'src/app/network/request/division/division-request.params';
import { DivisionRequestService } from 'src/app/network/request/division/division-request.service';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { EventRecordDetailsTableOpts } from './event-record-details-table.component';
import { EventRecordDetailsTableModel } from './event-record-details-table.model';

@Injectable()
export class EventRecordDetailsTableBusiness
  implements IBusiness<string, EventRecordDetailsTableModel>
{
  constructor(
    private storeService: GlobalStorageService,
    private divisionService: DivisionRequestService,
    private stationService: GarbageStationRequestService
  ) {}
  Converter = new EventRecordDetailsTableConverter();
  subscription?: ISubscription | undefined;
  loading?: EventEmitter<void> | undefined;

  async load(
    opts?: EventRecordDetailsTableOpts
  ): Promise<EventRecordDetailsTableModel> {
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

    return model;
  }

  async getDivisions(parentId: string) {
    let params = new GetDivisionsParams();
    params.ParentId = parentId;
    let response = await this.divisionService.cache.list(params);
    return response.Data;
  }

  async getStation(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.DivisionId = divisionId;
    let response = await this.stationService.list(params);
    return response.Data;
  }

  getData(...args: any): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

class EventRecordDetailsTableConverter
  implements IPromiseConverter<string, EventRecordDetailsTableModel>
{
  converter = {
    item: new SelectItemConverter(),
  };

  async Convert(
    divisionId: string,
    divisions?: Division[],
    stations?: GarbageStation[],
    cameras?: Camera[]
  ): Promise<EventRecordDetailsTableModel> {
    let model = new EventRecordDetailsTableModel();

    if (divisions) {
      model.divisions = divisions;
    }

    if (stations) {
      model.stations = stations.map((x) => {
        return this.converter.item.Convert(x);
      });
    }
    if (cameras) {
      model.cameras = cameras.map((x) => {
        return this.converter.item.Convert(x);
      });
    }

    return model;
  }
}
