import { Injectable } from '@angular/core';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

@Injectable()
export class PointInfoPanelBusiness {
  station?: GarbageStation;
}
