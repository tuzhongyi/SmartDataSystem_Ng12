import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GisPoint } from 'src/app/network/model/garbage-station/gis-point.model';
import { GetGarbageStationsParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { GisMapRequestService } from 'src/app/network/request/gis-map/gis-map-request.service';

@Injectable()
export class DeployMapStationBusiness {
  constructor(
    private service: GarbageStationRequestService,
    private gis: GisMapRequestService
  ) {}
  update(station: GarbageStation) {
    return this.service.update(station);
  }
  get(id: string) {
    return this.service.cache.get(id);
  }

  array(divisionId: string) {
    let params = new GetGarbageStationsParams();
    params.AncestorId = divisionId;
    return this.service.cache.all(params);
  }

  sync = {
    division: async (divisionId: string) => {
      let points = await this.gis.division.point.array(divisionId);
      let stations = await this.array(divisionId);
      let count = 0;
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        let station = stations.find((station) => station.Id === point.id);
        if (station) {
          if (!station.GisPoint) {
            station.GisPoint = new GisPoint();
          }

          if (
            station.GisPoint.Longitude !== point.position.lon ||
            station.GisPoint.Latitude !== point.position.lat
          ) {
            station.GisPoint.Longitude = point.position.lon;
            station.GisPoint.Latitude = point.position.lat;
            try {
              await this.update(station);
              count++;
            } catch (error) {}
          }
        }
      }
      return count;
    },
    station: async (divisionId: string, stationId: string) => {
      let point = await this.gis.division.point.get(divisionId, stationId);
      let station = await this.get(stationId);
      if (station) {
        if (!station.GisPoint) {
          station.GisPoint = new GisPoint();
        }
        if (
          station.GisPoint.Longitude !== point.position.lon ||
          station.GisPoint.Latitude !== point.position.lat
        ) {
          station.GisPoint.Longitude = point.position.lon;
          station.GisPoint.Latitude = point.position.lat;
          try {
            await this.update(station);
            return true;
          } catch (error) {}
        }
      }
      return false;
    },
  };
}
