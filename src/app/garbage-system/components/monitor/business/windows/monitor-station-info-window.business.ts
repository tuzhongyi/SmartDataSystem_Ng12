import { Injectable } from '@angular/core';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MediaMultipleStatisticWindowArgs } from '../../../windows/media-multiple-statistic-window/media-multiple-statistic-window.model';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorGarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };

  index = GarbageStationWindowIndex.station;
  stationId?: string;
  divisionId?: string;

  constructor(
    private media: MonitorMediaWindowBusiness,
    private video: MonitorVideoWindowBusiness,
    private image: MonitorImageWindowBusiness
  ) {
    super();
  }
  onimage(args: PagedArgs<GarbageStationTableModel | EventRecordViewModel>) {
    this.image.open(args);
  }
  async onvideo(
    item:
      | GarbageDropRecordViewModel
      | AIGarbageRfidCardRecord
      | EventRecordViewModel
  ) {
    if (item instanceof AIGarbageRfidCardRecord) {
      this.media.multiple.args = new MediaMultipleStatisticWindowArgs();
      this.media.multiple.args.stationId = item.GarbageStationId;
      this.media.multiple.args.time = item.Time;
      this.media.multiple.fullplay = true;
      this.media.multiple.show = true;
    } else if (item instanceof EventRecordViewModel) {
      if (item.ResourceId) {
        this.video.title = item.ResourceName ?? '';
        this.video.mask = true;
        this.video.playback(
          item.ResourceId,
          DateTimeTool.beforeOrAfter(item.EventTime)
        );
      }
    }
  }
}
