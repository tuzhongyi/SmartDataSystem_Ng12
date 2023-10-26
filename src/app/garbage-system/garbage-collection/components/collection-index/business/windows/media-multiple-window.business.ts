import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station/garbage-station-sarbage-count-statistic.model';

@Injectable()
export class MediaMultipleWindowBusiness extends WindowViewModel {
  style = {
    width: '64%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  statistic?: GarbageStationGarbageCountStatistic;
}
