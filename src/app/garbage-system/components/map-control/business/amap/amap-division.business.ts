import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapDivisionBusiness {
  constructor(private amap: AMapClient, private global: GlobalStorageService) {}

  async load(divisionId: string) {
    let client = await this.amap.client;

    client.Village.Select(divisionId, true);
    client.Viewer.Focus(divisionId);
  }
  async select(divisionId: string) {
    let client = await this.amap.client;
    let defaultId = await this.global.defaultDivisionId;
    client.Village.Select(divisionId, divisionId === defaultId);
    client.Viewer.Focus(divisionId);
  }
}
