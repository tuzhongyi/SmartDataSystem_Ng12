import { Injectable } from '@angular/core';
import { GlobalStorageService } from 'src/app/common/service/global-storage.service';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { UserResourceType } from 'src/app/enum/user-resource-type.enum';
import { DivisionNumberStatistic } from 'src/app/network/model/garbage-station/division-number-statistic.model';
import { Division } from 'src/app/network/model/garbage-station/division.model';
import { IDeviceStateDes } from 'src/app/view-model/device-state-count.model';
import { RankModel } from 'src/app/view-model/rank.model';
import { DisposalCountArgs } from '../../disposal-count/disposal-count.model';
import { IllegalMixintoRankArgs } from '../../illegal-mixinto-rank/illegal-mixinto-rank.component';
import { RetentionRankArgs } from '../../retention-rank/retention-rank.component';
import { GarbageDropStationWindowIndex } from '../../windows/garbage-drop-window/garbage-drop-window.model';
import { MonitorWindowBussiness } from './window.business';

@Injectable()
export class MonitorEventTriggerBusiness {
  constructor(
    private window: MonitorWindowBussiness,
    private global: GlobalStorageService
  ) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
  deviceState = new DeviceStateEventTrigger(this.window);
  retentionRank = new RetentionRankEventTrigger(this.window, this.global);
  disposalCount = new DisposalCountEventTrigger(this.window);
  disposalRank = new DisposalRankEventTrigger(this.window);
  divisionList = new DivisionListEventTrigger(this.window);
}

class DeviceStateEventTrigger {
  constructor(private window: MonitorWindowBussiness) {}
  onclick(args: IDeviceStateDes) {
    this.window.device.status = args.status;
    this.window.device.show = true;
  }
}

class RetentionRankEventTrigger {
  constructor(
    private window: MonitorWindowBussiness,
    private global: GlobalStorageService
  ) {}
  onclick(args: RetentionRankArgs) {
    this.global.division.selected.then((x) => {
      let divisionId = x.Id;
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
  constructor(private window: MonitorWindowBussiness) {}
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
  constructor(private window: MonitorWindowBussiness) {}
  ontask(args: DisposalCountArgs) {
    this.window.drop.index = GarbageDropStationWindowIndex.record;
    this.window.drop.status = args.status;
    this.window.drop.show = true;
  }
}
class DisposalRankEventTrigger {
  constructor(private window: MonitorWindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.record.stationId = item.id;
    this.window.record.show = true;
  }
}

class DivisionListEventTrigger {
  constructor(private window: MonitorWindowBussiness) {}
  oninfo(division?: Division) {
    if (division) {
      switch (division.DivisionType) {
        case DivisionType.City:
          this.window.details.city.divisionId = division.Id;
          this.window.details.city.show = true;
          break;
        case DivisionType.County:
          this.window.details.county.divisionId = division.Id;
          this.window.details.county.show = true;
          break;
        case DivisionType.Committees:
          this.window.details.committees.divisionId = division.Id;
          this.window.details.committees.show = true;
          break;

        default:
          break;
      }
    }
  }
}
