import { Injectable } from '@angular/core';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapDivisionBusiness {
  constructor(private amap: AMapClient) {}

  async load(divisionId: string) {
    let client = await this.amap.client;

    client.Village.Select(divisionId, true);
    client.Viewer.Focus(divisionId);
  }
  async select(divisionId: string) {
    let client = await this.amap.client;
    client.Village.Select(divisionId, false);
    client.Viewer.Focus(divisionId);
  }
}
