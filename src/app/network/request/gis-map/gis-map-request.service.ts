import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { GisMapDivision } from './gis-map-division.model';
import { GisMapPoint } from './gis-map-point.model';

@Injectable({
  providedIn: 'root',
})
export class GisMapRequestService {
  constructor(private http: HttpClient) {}

  division = {
    array: async (id: string) => {
      let url = `/amap/amap_node/upload.js?type=village&id=${id}`;
      let response = await this.http.get<GisMapDivision[]>(url).toPromise();
      return plainToInstance(GisMapDivision, response);
    },
    point: {
      array: async (divisionId: string) => {
        let url = `/amap/amap_node/upload.js?type=point&id=${divisionId}`;
        let response = await this.http.get<GisMapPoint[]>(url).toPromise();
        return plainToInstance(GisMapPoint, response);
      },
      get: async (divisionId: string, stationId: string) => {
        let url = `/amap/models/villages/${divisionId}/points/${stationId}.json`;
        let response = await this.http.get<GisMapPoint>(url).toPromise();
        return plainToInstance(GisMapPoint, response);
      },
    },
  };
}
