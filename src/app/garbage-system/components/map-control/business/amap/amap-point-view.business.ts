import { EventEmitter, Injectable } from '@angular/core';
import {
  MapControlButtonFilter,
  MapControlButtonFilterType as FilterType,
} from '../../../map-control-buttons-3/map-control-buttons-3.model';
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

  private _filter?: MapControlButtonFilter;

  onfilter(filter: MapControlButtonFilter): void {
    this._filter = filter;
    if (filter.types.includes(FilterType.station)) {
      this.station.normal(filter.normal);
      this.station.full(filter.full);
      this.station.drop(filter.drop);
      this.station.error(filter.error);
      if (filter.drop) {
        this.station.drop30in(filter.drop30in);
        this.station.drop30out(filter.drop30out);
      }
    } else {
      this.station.normal(false);
      this.station.full(false);

      this.station.error(false);
      this.station.drop30in(false);
      this.station.drop30out(false);
      this.station.drop(false);
    }
    if (filter.types.includes(FilterType.rfid)) {
      this.rfid.normal(filter.normal);
      this.rfid.full(filter.full);
      this.rfid.drop(filter.drop);
      this.rfid.error(filter.error);
      if (filter.drop) {
        this.rfid.drop30in(filter.drop30in);
        this.rfid.drop30out(filter.drop30out);
      }
    } else {
      this.rfid.normal(false);
      this.rfid.full(false);
      this.rfid.error(false);
      this.rfid.drop30in(false);
      this.rfid.drop30out(false);
      this.rfid.drop(false);
    }
    if (filter.types.includes(FilterType.construction)) {
      this.construction.normal(filter.normal);
      this.construction.full(filter.full);
      this.construction.drop(filter.drop);
      this.construction.error(filter.error);
    } else {
      this.construction.normal(false);
      this.construction.full(false);
      this.construction.drop(false);
      this.construction.error(false);
    }
  }

  filter() {
    if (this._filter) {
      this.onfilter(this._filter);
    }
  }
}
