import { EventEmitter, Injectable } from '@angular/core';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MediaWindowBusiness } from './media-window.business';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { DivisionType } from 'src/app/enum/division-type.enum';
import { EventType } from 'src/app/enum/event-type.enum';

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
  eventType?: EventType;

  constructor(private media: MediaWindowBusiness) {
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
