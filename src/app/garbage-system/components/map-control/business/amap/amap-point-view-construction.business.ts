import { EventEmitter, Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { AMapPointVisibleArgs, IAMapPointViewBusiness } from '../amap.model';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapPointConstructionViewBusiness
  implements IAMapPointViewBusiness
{
  visibile: EventEmitter<AMapPointVisibleArgs> = new EventEmitter();
  display = {
    normal: true,
    full: true,
    drop: true,
    error: true,
  };
  constructor(private amap: AMapClient) {}

  keep() {
    if (this.display.normal) {
      this.normal(true);
    }
    if (this.display.full) {
      this.full(true);
    }
    if (this.display.drop) {
      this.drop(true);
    }
    if (this.display.error) {
      this.error(true);
    }
  }

  async normal(show: boolean) {
    this.display.normal = show;
    let dropIds = this.amap.source.drop.construction.map((x) => x.Id);
    let stations = this.amap.source.construction.filter(
      (x) => x.StationState === 0 && !dropIds.includes(x.Id)
    );

    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }
  full(show: boolean) {
    this.display.full = show;
    let dropIds = this.amap.source.drop.construction.map((x) => x.Id);
    let stations = this.amap.source.construction.filter((x) => {
      let flags = new Flags(x.StationState);
      return (
        flags.contains(StationState.Full) &&
        !(this.display.drop && dropIds.includes(x.Id))
      );
    });

    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }
  async drop(show: boolean) {
    this.display.drop = show;
    let stations = this.amap.source.drop.construction.map(
      (x) => x.GarbageStation
    );
    stations = stations.filter((x) => {
      let flags = new Flags(x.StationState);
      return !(this.display.full && flags.contains(StationState.Full));
    });
    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }

  error(show: boolean) {
    this.display.error = show;
    let stations = this.amap.source.construction.filter((x) => {
      let flags = new Flags(x.StationState);
      return flags.contains(StationState.Error);
    });
    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }
}
