import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { EventType } from 'src/app/enum/event-type.enum';
import { GarbageStationWindowIndex } from '../../windows/garbage-station-window/garbage-station-window.component';
import { MonitorWindowBussiness } from './window.business';

@Injectable()
export class MonitorStatisticCardBussiness {
  constructor(
    private window: MonitorWindowBussiness,
    private global: GlobalStorageService
  ) {}

  onstationcount() {
    this.window.station.stationId = undefined;
    this.window.station.index = GarbageStationWindowIndex.station;
    this.window.station.show = true;
  }
  onstationdrop() {
    this.window.drop.clear();
    this.global.division.selected
      .then((x) => {
        this.window.drop.args.divisionId = x.Id;
      })
      .finally(() => {
        this.window.drop.show = true;
      });
  }
  onstationfull() {
    this.window.full.clear();
    this.global.division.selected
      .then((x) => {
        this.window.full.args.divisionId = x.Id;
      })
      .finally(() => {
        this.window.full.show = true;
      });
  }
  onrecordillegaldrop() {
    this.window.record.type = EventType.IllegalDrop;
    this.window.record.clear();
    this.global.division.selected
      .then((x) => {
        this.window.record.divisionId = x.Id;
      })
      .finally(() => {
        this.window.record.show = true;
      });
  }
  onrecordmixedinto() {
    this.window.record.type = EventType.MixedInto;
    this.window.record.clear();
    this.global.division.selected
      .then((x) => {
        this.window.record.divisionId = x.Id;
      })
      .finally(() => {
        this.window.record.show = true;
      });
  }
}
