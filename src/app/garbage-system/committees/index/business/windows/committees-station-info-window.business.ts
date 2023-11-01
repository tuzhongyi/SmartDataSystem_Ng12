import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { MediaMultipleWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-window/media-multiple-window.model';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { SewageEventRecord } from 'src/app/network/model/garbage-station/event-record/sewage-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesMediaWindowBusiness } from './committees-media-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesGarbageStationInfoWindowBusiness extends WindowViewModel {
  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  index = GarbageStationWindowIndex.station;
  stationId?: string;

  constructor(
    private media: CommitteesMediaWindowBusiness,
    private image: CommitteesIndexImageWindowBusiness,
    private video: CommitteesVideoWindowBusiness
  ) {
    super();
  }
  onimage(
    model: PagedArgs<
      | GarbageDropRecordViewModel
      | GarbageStationTableModel
      | EventRecordViewModel
      | ImageControlModel
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
    } else if (model.data instanceof EventRecordViewModel) {
      this.image.page.page = model.page;
      let data = model.data as SewageEventRecord;
      this.image.page.model = ImageControlCreater.Create(data);
      this.image.page.show = true;
      return;
    } else {
      this.image.array.models = [model.data];
    }

    this.image.array.show = true;
  }
  async onvideo(
    item:
      | GarbageDropRecordViewModel
      | AIGarbageRfidCardRecord
      | EventRecordViewModel
  ) {
    if (item instanceof GarbageDropRecordViewModel) {
      let id = item.ResourceId ?? '';
      let name = item.ResourceName;
      let time = item.EventTime;
      if (item.ResourceType === ResourceType.GarbageStation) {
        if (
          item.Data.HandleImageUrls &&
          item.Data.HandleImageUrls.length > 0 &&
          item.Data.HandleTime
        ) {
          id = item.Data.HandleImageUrls[0].CameraId;
          name = item.Data.HandleImageUrls[0].CameraName;
          time = item.Data.HandleTime;
        } else if (
          item.Data.TimeoutImageUrls &&
          item.Data.TimeoutImageUrls.length > 0
        ) {
          id = item.Data.TimeoutImageUrls[0].CameraId;
          name = item.Data.TimeoutImageUrls[0].CameraName;
        } else if (
          item.Data.DropImageUrls &&
          item.Data.DropImageUrls.length > 0
        ) {
          id = item.Data.DropImageUrls[0].CameraId;
          name = item.Data.DropImageUrls[0].CameraName;
          time = item.Data.DropTime;
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
