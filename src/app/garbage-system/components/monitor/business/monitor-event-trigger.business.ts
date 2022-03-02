import { Injectable } from '@angular/core';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { IllegalMixintoRankArgs } from '../../illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from '../../retention-rank/retention-rank.component';
import { GarbageStationWindowIndex } from '../../windows/garbage-station-window/garbage-station-window.component';
import { WindowBussiness } from './window.business';

@Injectable()
export class MonitorEventTriggerBusiness {
  constructor(private window: WindowBussiness) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window);
  risposalCount = new RisposalCountEventTrigger(this.window);
  risposalRank = new RisposalRankEventTrigger(this.window);
}

export class DeviceStateEventTrigger {
  constructor(private window: WindowBussiness) {}
  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

export class RetentionRankEventTrigger {
  constructor(private window: WindowBussiness) {}
  onclick(args: RetentionRankArgs) {
    this.window.drop.divisionId = args.model.id;
    this.window.drop.show = true;
  }
}

class IllegalMixintoRankEventTrigger {
  constructor(private window: WindowBussiness) {}
  onItemClicked(args: IllegalMixintoRankArgs) {
    this.window.record.count = args.model.value;
    this.window.record.divisionId = args.model.id;
    this.window.record.type = args.eventType;
    this.window.record.divisionId = undefined;
    this.window.record.stationId = undefined;
    switch (args.resourceType) {
      case UserResourceType.Committees:
        this.window.record.divisionId = args.model.id;
        break;
      case UserResourceType.Station:
        this.window.record.stationId = args.model.id;
        break;
      default:
        break;
    }
    this.window.record.show = true;
  }
}
class RisposalCountEventTrigger {
  constructor(private window: WindowBussiness) {}
  ontask() {
    this.window.station.index = GarbageStationWindowIndex.record;
    this.window.station.show = true;
  }
}
class RisposalRankEventTrigger {
  constructor(private window: WindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.station.index = GarbageStationWindowIndex.stay;
    this.window.station.stationId = item.id;
    console.log(item.data);
    this.window.station.show = true;
  }
}
