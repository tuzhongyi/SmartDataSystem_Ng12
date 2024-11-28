import { EventEmitter, Injectable } from '@angular/core';
import { GarbageDropStationTableModel } from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { PagedArgs } from 'src/app/network/model/model.interface';

import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import {
  GarbageDropStationWindowArgs,
  GarbageDropStationWindowIndex,
} from '../../../windows/garbage-drop-window/garbage-drop-window.model';
import { MediaMultipleStatisticWindowArgs } from '../../../windows/media-multiple-statistic-window/media-multiple-statistic-window.model';
import { MonitorRecordHandleCompleteWindowBusiness } from './monitor-event-record-handle-complete-window.business';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

@Injectable()
export class MonitorGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(
    private media: MonitorMediaWindowBusiness,
    private image: MonitorImageWindowBusiness,
    private video: MonitorVideoWindowBusiness,
    private complete: MonitorRecordHandleCompleteWindowBusiness
  ) {
    super();
    this.image.getData.subscribe((x) => {
      this.data.get.emit(x);
    });
    this.complete.data.get.subscribe((x) => {
      this.data.get.emit(x);
    });
  }
  args: GarbageDropStationWindowArgs = {};

  index = GarbageDropStationWindowIndex.record;
  status?: GarbageTaskStatus;

  style = {
    height: '85%',
    width: '90%',
    transform: 'translate(-50%, -48%)',
  };

  data = {
    get: new EventEmitter<Page>(),
    got: (paged: PagedList<GarbageDropRecordViewModel>) => {
      if (this.image.show) {
        this.image.gotData(paged);
      }
      if (this.complete.show) {
        this.complete.data.got(paged);
      }
    },
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
      this.media.multiple.args = new MediaMultipleStatisticWindowArgs();
      this.media.multiple.args.stationId = args.statistic.Id;
      this.media.multiple.args.usage = [CameraUsage.GarbageFull];
      this.media.multiple.args.time = args.date;
      this.media.multiple.args.statistic = {
        GarbageCount: args.statistic.GarbageCount,
      };
    }
    this.media.multiple.fullplay = true;
    this.media.multiple.show = true;
  }
  clear() {
    this.args.divisionId = undefined;
    this.args.stationId = undefined;
  }
  oncomplete(item: PagedArgs<GarbageDropRecordViewModel>) {
    this.complete.paged.Data = item.data;
    this.complete.paged.Page = item.page;
    this.complete.show = true;
  }
}
