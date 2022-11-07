import { Injectable } from '@angular/core';
import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';

@Injectable()
export class MediaMultipleWindowBusiness extends WindowViewModel {
  style = {
    width: '32%',
    height: '64%',
    top: '56%',
    padding: '10px 20px',
  };

  statistic?: GarbageStationGarbageCountStatistic;
  models: ImageVideoControlModel[] = [];
}
