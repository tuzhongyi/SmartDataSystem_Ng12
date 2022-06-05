import { Injectable } from '@angular/core';
import {
  ImageControlModelArray,
} from 'src/app/view-model/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { CommitteesMediaWindowBusiness } from './committees-media-window.business';

@Injectable()
export class CommitteesGarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  index = GarbageStationWindowIndex.station;
  stationId?: string;

  constructor(private media: CommitteesMediaWindowBusiness) {
    super();
  }
  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
  onchartdblclick(statistic: GarbageStationGarbageCountStatistic) {
    this.media.multiple.statistic = statistic;
    this.media.multiple.show = true;
  }
}
