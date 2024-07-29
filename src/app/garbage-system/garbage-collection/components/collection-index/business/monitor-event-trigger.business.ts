import { Injectable } from '@angular/core';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { WindowBussiness } from './window.business';

@Injectable()
export class MonitorEventTriggerBusiness {
  constructor(private window: WindowBussiness) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window);
  disposalCount = new DisposalCountEventTrigger(this.window);
  disposalRank = new DisposalRankEventTrigger(this.window);
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
class DisposalCountEventTrigger {
  constructor(private window: WindowBussiness) {}
  ontask() {
    this.window.drop.index = GarbageDropStationWindowIndex.record;
    this.window.drop.show = true;
  }
}
class DisposalRankEventTrigger {
  constructor(private window: WindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.drop.index = GarbageDropStationWindowIndex.duration;
    this.window.drop.show = true;
  }
}
