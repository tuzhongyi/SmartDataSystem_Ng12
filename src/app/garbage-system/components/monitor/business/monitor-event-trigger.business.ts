import { Injectable } from '@angular/core';
import { RankModel } from 'src/app/view-model/rank.model';
import { WindowBussiness } from './window.business';

@Injectable()
export class MonitorEventTriggerBusiness {
  constructor(private window: WindowBussiness) {}
  illegalMixintoRank = new IllegalMixintoRankEventTrigger(this.window);
}

class IllegalMixintoRankEventTrigger {
  constructor(private window: WindowBussiness) {}
  onItemClicked(item: RankModel) {
    this.window.record.show = true;
  }
}
