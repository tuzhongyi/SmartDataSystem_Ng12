import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MonitorImageWindowBusiness } from './monitor-image-window.business';
import { MonitorMediaWindowBusiness } from './monitor-media-window.business';
import { MonitorVideoWindowBusiness } from './monitor-video-window.business';

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

  constructor(
    private media: MonitorMediaWindowBusiness,
    private video: MonitorVideoWindowBusiness,
    private image: MonitorImageWindowBusiness
  ) {
    super();
  }
  onimage(
    model: ImageControlModelArray<
      GarbageDropRecordViewModel | GarbageStationTableModel
    >
  ) {
    this.image.array.manualcapture =
      model.data instanceof GarbageStationTableModel;
    this.image.array.index = model.index;
    if (model.models.length > 0) {
      this.image.array.stationId = model.models[0].stationId;
    }
    this.image.array.models = model.models;
    this.image.array.show = true;
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
    this.video.playback(id, DateTimeTool.beforeOrAfter(item.EventTime));
  }
  onchartdblclick(args: LineZoomChartArgs) {
    this.media.multiple.statistic = args.statistic;
    this.media.multiple.date = args.date;
    this.media.multiple.show = true;
  }
}
