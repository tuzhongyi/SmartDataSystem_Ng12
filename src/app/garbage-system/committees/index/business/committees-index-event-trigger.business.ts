import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';

import { CommitteesWindowBussiness } from './committees-window.business';

@Injectable()
export class CommitteesIndexEventTriggerBusiness {
  constructor(
    private window: CommitteesWindowBussiness,
    private global: GlobalStorageService
  ) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window, this.global);
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
  constructor(
    private window: CommitteesWindowBussiness,
    private global: GlobalStorageService
  ) {}
  onclick(args: RetentionRankArgs) {
    let divisionId = this.global.divisionId;
    if (args.model.data instanceof DivisionNumberStatistic) {
      divisionId = args.model.id;
    }
    this.window.drop.args = {
      divisionId: divisionId,
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
