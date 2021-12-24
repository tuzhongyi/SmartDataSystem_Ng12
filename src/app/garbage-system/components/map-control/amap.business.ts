import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class AMapBusiness {
  constructor(private datePipe: DatePipe) {}

  getSrc() {
    const host = document.location.hostname;
    const port = document.location.port;
    let date = this.datePipe.transform(new Date(), 'yyyyMMddHHmmss');
    // const date = formatDate(new Date(), 'yyyyMMddHHmmss');

    return `http://${host}:${port}/amap/map_ts.html?v=${date}`;
  }
}
