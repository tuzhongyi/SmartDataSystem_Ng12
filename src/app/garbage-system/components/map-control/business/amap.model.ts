import { EventEmitter } from '@angular/core';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';

export class AMapVisibilityItem<T> {
  constructor(t: T) {
    this._value = t;
  }
  change: EventEmitter<T> = new EventEmitter();

  private _value: T;
  public get value(): T {
    return this._value;
  }
  public set value(v: T) {
    this._value = v;
    this.change.emit(v);
  }
}
export class AMapVisibility {
  label = new AMapLabelVisibility(false);
  station = new AMapVisibilityItem(true);
  construction = new AMapVisibilityItem(true);
}

export class AMapLabelVisibility<T> extends AMapVisibilityItem<T> {
  retention = new AMapVisibilityItem(GarbageTimeFilter.all);
  station = new AMapVisibilityItem(true);
}

export enum GarbageTimeFilter {
  all = 0,
  m30 = 30 - 1,
  h1 = 60 - 1,
  h2 = 120 - 1,
  h3 = 180 - 1,
  h4 = 240 - 1,
  none = -1,
}

export class PointCount {
  count: number = 0;
  normal: number = 0;
  full: number = 0;
  drop: number = 0;
  error: number = 0;
}
export interface IAMapPointViewBusiness {
  visibile: EventEmitter<AMapPointVisibleArgs>;
}
export interface AMapPointVisibleArgs {
  datas: GarbageStation[];
  show: boolean;
}

export class GarbageStationNumberStatisticModel extends GarbageStationNumberStatistic {
  GarbageStation!: GarbageStation;
}
