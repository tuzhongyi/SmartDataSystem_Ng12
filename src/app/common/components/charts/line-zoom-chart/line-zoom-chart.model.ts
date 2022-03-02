import {
  GarbageDropEventRecord,
  IllegalDropEventRecord,
} from 'src/app/network/model/event-record.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { ImageControlModel } from '../../image-control/image-control.model';
import { GarbageDropDurationPanelModel } from '../../panels/garbage-drop-duration-panel/garbage-drop-duration-panel.model';

export type LineZoomChartSource = {
  count?: GarbageStationGarbageCountStatistic[];
  record?: IllegalDropEventRecord[];
};

export class LineZoomChartModel {
  count: TimeData<GarbageStationGarbageCountStatistic>[] = [];
  record: ImageTimeData<IllegalDropEventRecord>[] = [];
}

export interface TimeData<T> {
  time: Date;
  value: T;
  index?: number;
}

export interface ImageTimeData<T> extends TimeData<T> {
  image: ImageControlModel;
}

export class LineZoomLinePanel {
  model = new GarbageDropDurationPanelModel();
  display = false;
  position = { x: '0px', y: '0px' };
}

export class LineZoomScatterPanel {
  model!: ImageControlModel;
  display = false;
  position = { x: '0px', y: '0px' };
}
