import { Injectable } from '@angular/core';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { PagedArgs } from 'src/app/network/model/model.interface';

import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { GarbageDropStationWindowIndex } from '../../../windows/garbage-drop-window/garbage-drop-window.model';
import { MediaMultipleWindowArgs } from '../../../windows/media-multiple-window/media-multiple-window.model';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(
    private media: MonitorMediaWindowBusiness,
    private image: MonitorImageWindowBusiness,
    private video: MonitorVideoWindowBusiness
  ) {
    super();
  }
  args: GarbageDropStationTableArgs = {};

  index = GarbageDropStationWindowIndex.record;
  status?: GarbageTaskStatus;

  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };

  async onimage(
    model: PagedArgs<
      | GarbageDropStationTableModel
      | GarbageDropRecordViewModel
      | ImageControlModel
    >
  ) {
    this.image.open(model);
  }
  async onvideo(item: GarbageDropRecordViewModel) {
    let id = item.ResourceId ?? '';
    let name = item.ResourceName;
    if (item.ResourceType === ResourceType.GarbageStation) {
      if (item.Data.HandleImageUrls && item.Data.HandleImageUrls.length > 0) {
        id = item.Data.HandleImageUrls[0].CameraId;
        name = item.Data.HandleImageUrls[0].CameraName;
      }
    }
    this.video.title = name ?? '';
    this.video.mask = true;
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }

  onchartdblclick(args: LineZoomChartArgs) {
    if (args.statistic) {
      this.media.multiple.args = new MediaMultipleWindowArgs();
      this.media.multiple.args.stationId = args.statistic.Id;
      this.media.multiple.args.usage = [CameraUsage.GarbageFull];
      this.media.multiple.args.time = args.date;
      this.media.multiple.args.statistic = {
        GarbageCount: args.statistic.GarbageCount,
      };
    }
    this.media.multiple.date = args.date;
    this.media.multiple.fullplay = true;
    this.media.multiple.show = true;
  }
}
