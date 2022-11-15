import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { ICollectionMapRouteBusiness } from './collection-map-route.model';

@Injectable()
export class CollectionMapRouteBusiness implements ICollectionMapRouteBusiness {
  get src(): string {
    const host = document.location.hostname;
    const port = document.location.port;
    //let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    const date = formatDate(new Date(), 'yyyyMMddHHmmss', 'en');

    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }

  private client?: CesiumMapClient;

  load(iframe: HTMLIFrameElement): void {
    this.client = new CesiumMapClient(iframe);
  }
}
