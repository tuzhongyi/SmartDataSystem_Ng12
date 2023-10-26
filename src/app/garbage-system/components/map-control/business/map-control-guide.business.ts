import { Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { wait } from 'src/app/common/tools/tool';
import { StationState } from 'src/app/enum/station-state.enum';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { AMapBusiness } from './amap.business';
import { PointInfoPanelBusiness } from './point-info-panel.business';

@Injectable()
export class MapControlGuideBusiness {
  constructor(
    private amap: AMapBusiness,
    private info: PointInfoPanelBusiness
  ) {}

  private _station?: GarbageStation;
  get station() {
    return new Promise<GarbageStation>((resolve) => {
      if (this._station) {
        resolve(this._station);
        return;
      }
      let index = 0;
      wait(
        () => {
          if (this.amap.source.all.length === 0) return false;
          do {
            let station = this.amap.source.all[index];
            if (!station.Cameras) {
              continue;
            }
            let flags = new Flags(station.StationState);
            if (flags.contains(StationState.Error)) {
              continue;
            }
            let point = this.amap.source.points[this.amap.source.all[index].Id];
            if (!!point) {
              this._station = station;
              return true;
            }
          } while (this.amap.source.all.length > index++);
          return false;
        },
        () => {
          let station = this.amap.source.all[index];
          resolve(station);
        }
      );
    });
  }
  get point() {
    return this.station.then((station) => {
      return this.amap.source.points[station.Id];
    });
  }

  async showmenu() {
    let point = await this.point;
    this.amap.point.menu.open(point);
  }
  closemenu() {
    this.amap.point.menu.close();
  }
  async showpointinfo() {
    this.info.station = await this.station;
  }
  closepointinfo() {
    this.info.station = undefined;
  }
}
