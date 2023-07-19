import { Injectable } from '@angular/core';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { MediaWindowBusiness } from './media-window.business';

@Injectable()
export class GarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '88%',
    width: '93%',
    transform: 'translate(-50%, -44%)',
  };

  index = GarbageStationWindowIndex.station;
  stationId?: string;
  divisionId?: string;

  constructor(private media: MediaWindowBusiness) {
    super();
  }
  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.show = true;
  }
  onchartdblclick(statistic: GarbageStationGarbageCountStatistic) {
    this.media.multiple.statistic = statistic;
    this.media.multiple.show = true;
  }
}
