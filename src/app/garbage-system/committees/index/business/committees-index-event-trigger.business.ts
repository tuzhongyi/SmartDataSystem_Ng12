import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';

import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
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
  disposalCount = new DisposalCountEventTrigger(this.window);
  disposalRank = new DisposalRankEventTrigger(this.window);
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
    this.global.division.selected.then((division) => {
      let divisionId = division.Id;
      if (args.model.data instanceof DivisionNumberStatistic) {
        divisionId = args.model.id;
      }
      this.window.drop.args = {
        divisionId: divisionId,
      };
      this.window.drop.show = true;
    });
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
class DisposalCountEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  ontask() {
    this.window.drop.index = GarbageDropStationWindowIndex.record;
    this.window.drop.show = true;
  }
}
class DisposalRankEventTrigger {
  constructor(private window: CommitteesWindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.drop.index = GarbageDropStationWindowIndex.duration;
    this.window.drop.show = true;
  }
}
