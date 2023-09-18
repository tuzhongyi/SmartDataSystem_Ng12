import { EventEmitter } from '@angular/core';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

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

export interface AMapDataSource {
  all: GarbageStation[];
  construction: GarbageStation[];
  drop: { station: GarbageStation; statistic: GarbageStationNumberStatistic }[];
  plug: GarbageStationNumberStatistic[];
  points: Global.Dictionary<CesiumDataController.Point>;
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
  warm: number = 0;
  drop: number = 0;
  error: number = 0;
}
