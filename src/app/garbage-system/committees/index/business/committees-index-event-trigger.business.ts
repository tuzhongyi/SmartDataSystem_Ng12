import { Injectable } from '@angular/core';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { Division } from 'src/app/network/model/division.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';

import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexEventTriggerBusiness {
  constructor(private window: CommitteesWindowBussiness) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window);
  risposalCount = new RisposalCountEventTrigger(this.window);
  risposalRank = new RisposalRankEventTrigger(this.window);
}

export class DeviceStateEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

export class RetentionRankEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  onclick(args: RetentionRankArgs) {
    let type = DivisionType.None;
    if (args.model.data instanceof Division) {
      type = args.model.data.DivisionType;
    }
    this.window.drop.source = {
      id: args.model.id,
      type: type,
    };
    this.window.drop.show = true;
  }
}

class IllegalMixintoRankEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  onItemClicked(args: IllegalMixintoRankArgs) {
    this.window.record.count = args.model.value;

    this.window.record.type = args.eventType;
    this.window.record.divisionId = undefined;
    this.window.record.stationId = args.model.id;
    this.window.record.show = true;
  }
}
class RisposalCountEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  ontask() {
    this.window.stationInfo.index = GarbageStationWindowIndex.record;
    this.window.stationInfo.show = true;
  }
}
class RisposalRankEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.stationInfo.index = GarbageStationWindowIndex.stay;
    this.window.stationInfo.stationId = item.id;
    console.log(item.data);
    this.window.stationInfo.show = true;
  }
}
