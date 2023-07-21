import { formatDate } from '@angular/common';
import { IllegalDropEventRecord } from 'src/app/network/model/garbage-event-record.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { TimeRange } from 'src/app/network/model/time-range.model';
import { ImageControlModel } from '../../../../view-model/image-control.model';
import { GarbageDropDurationPanelModel } from '../../panels/garbage-drop-duration-panel/garbage-drop-duration-panel.model';
import { ImageTimeData, ITimeData } from '../chart.model';

export interface LineZoomChartArgs {
  statistic?: GarbageStationGarbageCountStatistic;
  date: Date;
}

export type LineZoomChartSource = {
  count?: GarbageStationGarbageCountStatistic[];
  record?: IllegalDropEventRecord[];
};

export class LineZoomChartModel {
  count: ITimeData<GarbageStationGarbageCountStatistic>[] = [];
  record: ImageTimeData<IllegalDropEventRecord>[] = [];
  timeRange?: TimeRange;
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

export class TimeString extends Date {
  constructor(date: Date | number, format?: string) {
    super(date);
    if (format) {
      this.formater = format;
    }
    if (typeof date === 'number') {
      this.date = new Date(date);
    } else {
      this.date = date;
    }
  }

  formater = 'H:mm:ss';

  date: Date;
  toString() {
    return formatDate(this.date, this.formater, 'en');
  }
}
