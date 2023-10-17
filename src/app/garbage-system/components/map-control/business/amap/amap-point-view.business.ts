import { EventEmitter, Injectable } from '@angular/core';
import { AMapPointVisibleArgs, IAMapPointViewBusiness } from '../amap.model';
import { AMapPointConstructionViewBusiness } from './amap-point-view-construction.business';
import { AMapPointRfidViewBusiness } from './amap-point-view-rfid.business';
import { AMapPointStationViewBusiness } from './amap-point-view-station.business';

@Injectable()
export class AMapPointViewBusiness implements IAMapPointViewBusiness {
  constructor(
    public station: AMapPointStationViewBusiness,
    public rfid: AMapPointRfidViewBusiness,
    public construction: AMapPointConstructionViewBusiness
  ) {
    this.station.visibile.subscribe(this.visibile);
    this.rfid.visibile.subscribe(this.visibile);
    this.construction.visibile.subscribe(this.visibile);
  }
  visibile: EventEmitter<AMapPointVisibleArgs> = new EventEmitter();
}
