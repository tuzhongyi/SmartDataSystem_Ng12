import { EventEmitter, Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { AMapPointVisibleArgs, IAMapPointViewBusiness } from '../amap.model';
import { AMapPointPlugBusiness } from './amap-point-plug.business';
import { AMapClient } from './amap.client';

@Injectable()
export class AMapPointRfidViewBusiness implements IAMapPointViewBusiness {
  visibile: EventEmitter<AMapPointVisibleArgs> = new EventEmitter();
  display = {
    normal: true,
    full: true,
    drop: true,
    error: true,
    in30: false,
    out30: false,
  };
  constructor(private amap: AMapClient, private plug: AMapPointPlugBusiness) {}

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
    if (this.display.in30) {
      this.drop30in(true);
    }
    if (this.display.out30) {
      this.drop30out(true);
    }
  }

  async normal(show: boolean) {
    this.display.normal = show;
    let dropIds = this.amap.source.drop.rfid.map((x) => x.Id);
    let stations = this.amap.source.rfid.filter(
      (x) => x.StationState === 0 && !dropIds.includes(x.Id)
    );

    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }
  full(show: boolean) {
    this.display.full = show;
    let dropIds = this.amap.source.drop.rfid.map((x) => x.Id);
    let stations = this.amap.source.rfid.filter((x) => {
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
    let stations = this.amap.source.drop.rfid.map((x) => x.GarbageStation);
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
    let stations = this.amap.source.rfid.filter((x) => {
      let flags = new Flags(x.StationState);
      return flags.contains(StationState.Error);
    });
    this.visibile.emit({
      datas: stations,
      show: show,
    });
  }

  async drop30in(show: boolean) {
    this.display.in30 = show;
    let query = (time?: number) => {
      return time ? time < 30 : true;
    };
    this.plugarc(show, query);
    let in30 = this.amap.source.drop.rfid.filter((x) =>
      query(x.CurrentGarbageTime)
    );
    let stations = this.amap.source.all.filter(
      (x) => in30.findIndex((y) => y.Id == x.Id) >= 0
    );
    this.visibile.emit({
      datas: stations,
      show: show,
    });
    if (this.display.out30 === false) {
      if (show) {
        let out30 = this.amap.source.drop.rfid.filter(
          (x) => !query(x.CurrentGarbageTime)
        );
        stations = this.amap.source.all.filter(
          (x) => out30.findIndex((y) => y.Id == x.Id) >= 0
        );
        this.visibile.emit({
          datas: stations,
          show: false,
        });
      } else {
        stations = this.amap.source.all.filter(
          (x) => this.amap.source.drop.rfid.findIndex((y) => y.Id == x.Id) >= 0
        );
        this.visibile.emit({
          datas: stations,
          show: true,
        });
      }
    }
  }
  async drop30out(show: boolean) {
    this.display.out30 = show;
    let query = (time?: number) => {
      return time ? time >= 30 : false;
    };
    this.plugarc(show, query);
    let out30 = this.amap.source.drop.rfid.filter((x) =>
      query(x.CurrentGarbageTime)
    );
    let stations = this.amap.source.all.filter(
      (x) => out30.findIndex((y) => y.Id == x.Id) >= 0
    );
    this.visibile.emit({
      datas: stations,
      show: show,
    });
    if (this.display.in30 === false) {
      if (show) {
        let in30 = this.amap.source.drop.rfid.filter(
          (x) => !query(x.CurrentGarbageTime)
        );
        stations = this.amap.source.all.filter(
          (x) => in30.findIndex((y) => y.Id == x.Id) >= 0
        );
        this.visibile.emit({
          datas: stations,
          show: false,
        });
      } else {
        stations = this.amap.source.all.filter(
          (x) => this.amap.source.drop.rfid.findIndex((y) => y.Id == x.Id) >= 0
        );
        this.visibile.emit({
          datas: stations,
          show: true,
        });
      }
    }
  }

  private async plugarc(show: boolean, query: (time?: number) => boolean) {
    let models = this.amap.source.drop.rfid;

    if (show) {
      this.drop(show);
      let drops = models.filter((x) => query(x.CurrentGarbageTime));
      let surplus = this.amap.source.plug.rfid.filter((x) => {
        return (
          query(x.CurrentGarbageTime) &&
          drops.findIndex((drop) => drop.Id === x.Id) < 0
        );
      });
      await this.plug.ace.clear(surplus);
      await this.plug.ace.set(drops);
      this.plug.ace.show();
    } else {
      let drops = this.amap.source.plug.rfid.filter((x) =>
        query(x.CurrentGarbageTime)
      );
      await this.plug.ace.clear(drops);
    }
  }
}
