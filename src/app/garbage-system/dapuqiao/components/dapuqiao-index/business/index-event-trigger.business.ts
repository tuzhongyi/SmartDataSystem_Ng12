import { Injectable } from '@angular/core';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DisposalCountArgs } from 'src/app/garbage-system/components/disposal-count/disposal-count.model';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { IndexWindowBussiness } from './index-window.business';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(private window: IndexWindowBussiness) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window);
  risposalCount = new RisposalCountEventTrigger(this.window);
  risposalRank = new RisposalRankEventTrigger(this.window);
}

export class DeviceStateEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

export class RetentionRankEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  onclick(args: RetentionRankArgs) {
    this.window.drop.divisionId = args.model.id;
    this.window.drop.show = true;
  }
}

class IllegalMixintoRankEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  onItemClicked(args: IllegalMixintoRankArgs) {
    this.window.record.count = args.model.value;
    this.window.record.type = args.eventType;
    this.window.record.divisionId = undefined;
    this.window.record.stationId = undefined;
    switch (args.resourceType) {
      case UserResourceType.County:
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
  constructor(private window: IndexWindowBussiness) {}
  ontask(args: DisposalCountArgs) {
    this.window.station.index = GarbageStationWindowIndex.record;
    this.window.station.divisionId = args.divisionId;
    this.window.station.status = args.status;
    this.window.station.show = true;
  }
}
class RisposalRankEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.record.stationId = item.id;
    this.window.record.show = true;
  }
}
