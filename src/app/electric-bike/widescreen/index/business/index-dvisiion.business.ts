import { Injectable } from '@angular/core';
import { classToPlain, plainToClass } from 'class-transformer';
import { SmokeEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { WindowBussiness } from './window/index-window.business';

@Injectable()
export class ElectricBikeIndexChildBusiness {
  constructor(private window: WindowBussiness) {}
  onvideo(station: GarbageStation) {
    let model = new GarbageStationGarbageCountStatistic();
    model.Id = station.Id;
    model.Name = station.Name;
    this.window.media.multiple.statistic = model;
    this.window.media.multiple.show = true;
  }
}
