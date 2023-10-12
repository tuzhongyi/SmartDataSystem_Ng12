import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { GarbageStationWindowIndex } from '../../../windows/garbage-station-window/garbage-station-window.component';
import { MediaMultipleWindowArgs } from '../../../windows/media-multiple-window/media-multiple-window.model';
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
    model: PagedArgs<
      GarbageDropRecordViewModel | GarbageStationTableModel | ImageControlModel
    >
  ) {
    this.image.array.manualcapture =
      model.data instanceof GarbageStationTableModel;
    this.image.array.index = model.page.PageIndex;

    if (model.data instanceof GarbageStationTableModel) {
      this.image.array.stationId = model.data.GarbageStation.Id;
      if (model.data.GarbageStation.Cameras) {
        this.image.array.models = model.data.GarbageStation.Cameras.map((x) =>
          ImageControlCreater.Create(x)
        );
      }
    } else if (model.data instanceof GarbageDropRecordViewModel) {
      this.image.array.stationId = model.data.Data.StationId;
      this.image.array.models = ImageControlCreater.Create(model.data);
    } else {
      this.image.array.models = [model.data];
    }

    this.image.array.show = true;
  }
  async onvideo(item: GarbageDropRecordViewModel | AIGarbageRfidCardRecord) {
    if (item instanceof GarbageDropRecordViewModel) {
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
    } else if (item instanceof AIGarbageRfidCardRecord) {
      this.media.multiple.args = new MediaMultipleWindowArgs();
      this.media.multiple.args.stationId = item.GarbageStationId;
      this.media.multiple.args.time = item.Time;
      this.media.multiple.date = item.Time;
      this.media.multiple.fullplay = true;
      this.media.multiple.show = true;
    }
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
