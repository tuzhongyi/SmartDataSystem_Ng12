import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DisposalCountArgs } from 'src/app/garbage-system/components/disposal-count/disposal-count.model';
import { IllegalMixintoRankArgs } from 'src/app/garbage-system/components/illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from 'src/app/garbage-system/components/retention-rank/retention-rank.component';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-station-window/garbage-drop-station-window.component';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { DivisionNumberStatistic } from 'src/app/network/model/division-number-statistic.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { IndexWindowBussiness } from './index-window.business';

@Injectable()
export class IndexEventTriggerBusiness {
  constructor(
    private window: IndexWindowBussiness,
    private global: GlobalStorageService
  ) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window, this.global);
  risposalCount = new RisposalCountEventTrigger(this.window);
  risposalRank = new RisposalRankEventTrigger(this.window);
  dapuqiao = new DaPuQiaoEventTrigger(this.window);
}

export class DeviceStateEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

export class RetentionRankEventTrigger {
  constructor(
    private window: IndexWindowBussiness,
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
class DaPuQiaoEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  level = new DaPuQiaoPieLevelEventTrigger(this.window);
  statistic = new DaPuQiaoPieStatisticEventTrigger(this.window);
}
class DaPuQiaoPieLevelEventTrigger {
  constructor(private window: IndexWindowBussiness) {}

  ondetails(level?: number) {
    this.window.station.index = GarbageStationWindowIndex.dapuqiao_record;
    this.window.station.dapuqiao.level = level;
    this.window.station.show = true;
  }
}
class DaPuQiaoPieStatisticEventTrigger {
  constructor(private window: IndexWindowBussiness) {}
  ondetails() {
    this.window.drop.index = GarbageDropStationWindowIndex.dapuqiao_count;
    this.window.drop.show = true;
  }
}
