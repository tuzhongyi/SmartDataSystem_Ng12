import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropEventRecordModel } from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-drop-record-table/dapuqiao-garbage-drop-record-table.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { GarbageStationTableModel } from 'src/app/common/components/tables/garbage-station-table/garbage-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { Medium } from 'src/app/common/tools/medium';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { MediaMultipleWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-window/media-multiple-window.model';
import { AIGarbageRfidCardRecord } from 'src/app/network/model/ai-garbage/rfid-card-record.model';
import { SewageEventRecord } from 'src/app/network/model/garbage-station/event-record/sewage-event-record.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { IndexImageWindowBusiness } from './index-image-window.business';
import { IndexMediaWindowBusiness } from './index-media-window.business';
import { IndexSuperviseWindowBusiness } from './index-supervise-window.business';
import { IndexVideoWindowBusiness } from './index-video-window.business';

@Injectable()
export class IndexGarbageStationInfoWindowBusiness extends WindowViewModel {
  dapuqiao: DaPuQiaoLevelBusiness;

  style = {
    height: '88%',
    width: '93%',
    transform: 'translate(-50%, -44%)',
  };
  index = GarbageStationWindowIndex.station;
  stationId?: string;
  divisionId?: string;
  status?: GarbageTaskStatus;

  clear() {
    this.index = GarbageStationWindowIndex.station;
    this.stationId = undefined;
    this.divisionId = undefined;
    this.status = undefined;
    this.dapuqiao.clear();
  }

  constructor(
    private media: IndexMediaWindowBusiness,
    private video: IndexVideoWindowBusiness,
    private image: IndexImageWindowBusiness,
    supervise: IndexSuperviseWindowBusiness
  ) {
    super();
    this.dapuqiao = new DaPuQiaoLevelBusiness(image, supervise);
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

class DaPuQiaoLevelBusiness {
  constructor(
    private image: IndexImageWindowBusiness,
    private supervise: IndexSuperviseWindowBusiness
  ) {}

  level?: number;
  unit?: TimeUnit;
  clear() {
    this.level = undefined;
    this.unit = undefined;
  }

  ondetails(item: GarbageDropEventRecordModel) {
    this.supervise.detail.eventId = item.EventId;
    this.supervise.detail.show = true;
  }
  onimage(args: PagedArgs<GarbageDropEventRecordModel>) {
    this.image.array.manualcapture = false;
    this.image.array.index = args.page.PageIndex;
    this.image.array.models = args.data.imgs.map((x, i) => {
      let img = new ImageControlModel();
      img.id = x.id ?? '';
      img.index = i;
      img.eventTime = args.data.LevelTime;
      img.name = x.name ?? '';
      img.stationId = args.data.Data.StationId;
      img.src = new Promise((resolve) => {
        resolve(x.url);
      });
      return img;
    });

    this.image.array.show = true;
  }
  async onpicture(item: GarbageDropEventRecordModel) {
    let station = await item.GarbageStation;
    if (station.Cameras) {
      this.image.array.manualcapture = true;
      this.image.array.index = 0;
      this.image.array.stationId = station.Id;
      this.image.array.models = station.Cameras.sort((a, b) => {
        return LocaleCompare.compare(a.Name, b.Name);
      }).map((x, i) => {
        let img = new ImageControlModel();
        img.id = x.Id ?? '';
        img.index = i;
        img.name = x.Name ?? '';
        img.stationId = x.GarbageStationId;
        img.src = Medium.img(x.ImageUrl);
        img.status = x.OnlineStatus ?? OnlineStatus.Offline;
        return img;
      });
      this.image.array.show = true;
    }
  }
  onprocess(item: GarbageDropEventRecordModel) {
    this.supervise.complete.eventId = item.EventId;
    this.supervise.complete.show = true;
  }
}
