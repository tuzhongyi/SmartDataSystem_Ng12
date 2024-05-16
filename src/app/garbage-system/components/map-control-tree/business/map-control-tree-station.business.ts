import { Injectable } from '@angular/core';
import { Flags } from 'src/app/common/tools/flags';
import { StationState } from 'src/app/enum/station-state.enum';
import { StationType } from 'src/app/enum/station-type.enum';
import { GarbageStationNumberStatistic } from 'src/app/network/model/garbage-station/garbage-station-number-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import { GetGarbageStationStatisticNumbersParams } from 'src/app/network/request/garbage-station/garbage-station-request.params';
import { GarbageStationRequestService } from 'src/app/network/request/garbage-station/garbage-station-request.service';
import { MapControlTreeArgs } from '../map-control-tree.model';

@Injectable()
export class MapControlTreeStationBusiness {
  private datas?: GarbageStation[];
  private _drops?: GarbageStationNumberStatistic[];
  private handle: any;

  constructor(private service: GarbageStationRequestService) {
    this.init();
  }

  private init() {
    this.handle = setInterval(() => {
      this.datas = undefined;
      this._drops = undefined;
    }, 60 * 1000);
  }

  async load(args: MapControlTreeArgs, divisionId?: string) {
    let all = await this.all();
    if (divisionId) {
      all = all.filter((x) => x.DivisionId === divisionId);
    }

    let drops = await this.drops(args.refresh);
    let ids = drops.map((x) => x.Id);

    all = all.filter((station) => {
      if (!args.isgarbage) {
        if (station.StationType === StationType.Garbage) {
          return false;
        }
      }
      if (!args.isrfid) {
        if (
          station.StationType === StationType.Rfid ||
          station.StationType === StationType.Smart
        ) {
          return false;
        }
      }
      if (!args.isconstruction) {
        if (station.StationType === StationType.Construction) {
          return false;
        }
      }
      let flags = new Flags(station.StationState);

      if (args.isdrop) {
        if (ids.includes(station.Id)) {
          return true;
        }
      }
      if (args.isnormal) {
        if (station.StationState == 0) {
          return true;
        }
      }

      if (args.iserror) {
        if (flags.contains(StationState.Error)) {
          return true;
        }
      }

      if (args.isfull) {
        if (flags.contains(StationState.Full)) {
          return true;
        }
      }

      return false;
    });

    if (args.name) {
      all = all.filter((station) => {
        return station.Name.toLocaleLowerCase().includes(
          args.name!.toLocaleLowerCase()
        );
      });
    }
    return all;
  }

  async all() {
    if (!this.datas) {
      this.datas = await this.service.all();
    }
    return [...this.datas];
  }

  async drops(refresh: boolean = false) {
    if (!this._drops || refresh) {
      let params = new GetGarbageStationStatisticNumbersParams();
      params.GarbageDrop = true;
      let paged = await this.service.statistic.number.list(params);
      this._drops = paged.Data;
    }
    return this._drops;
  }

  destroy() {
    this.datas = undefined;
    this._drops = undefined;
    if (this.handle) {
      clearTimeout(this.handle);
    }
  }

  async statistic(ids: string[]) {
    let params = new GetGarbageStationStatisticNumbersParams();
    params.Ids = ids;
    let paged = await this.service.statistic.number.list(params);
    return paged.Data;
  }
}
