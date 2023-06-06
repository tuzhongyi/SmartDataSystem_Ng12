import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';

@Injectable()
export class MonitorGarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '88%',
    width: '93%',
    transform: 'translate(-50%, -44%)',
  };

  index = GarbageStationWindowIndex.station;
  stationId?: string;
  divisionId?: string;
  status?: GarbageTaskStatus;

  constructor(private media: MonitorMediaWindowBusiness) {
    super();
  }
  onimage(model: ImageControlModelArray) {
    this.media.single.camera = model.models;
    this.media.single.index = model.index;
    this.media.single.autoplay = model.autoplay;
    this.media.single.show = true;
  }
  onchartdblclick(args: LineZoomChartArgs) {
    this.media.multiple.statistic = args.statistic;
    this.media.multiple.date = args.date;
    this.media.multiple.show = true;
  }
}
