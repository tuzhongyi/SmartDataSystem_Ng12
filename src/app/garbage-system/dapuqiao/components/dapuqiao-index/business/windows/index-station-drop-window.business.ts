import { Injectable } from '@angular/core';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';

import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { DapuqiaoGarbageDropEventRecordModel } from 'src/app/common/components/tables/daqupiao/dapuqiao-garbage-drop-record-table/dapuqiao-garbage-drop-record-table.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { DateTimeTool } from 'src/app/common/tools/date-time-tool/datetime.tool';
import { LocaleCompare } from 'src/app/common/tools/locale-compare';
import { Medium } from 'src/app/common/tools/medium';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageTaskStatus } from 'src/app/enum/garbage-task-status.enum';
import { OnlineStatus } from 'src/app/enum/online-status.enum';
import { ResourceType } from 'src/app/enum/resource-type.enum';
import { TimeUnit } from 'src/app/enum/time-unit.enum';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { MediaMultipleWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-window/media-multiple-window.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { IndexImageWindowBusiness } from './index-image-window.business';
import { IndexMediaWindowBusiness } from './index-media-window.business';
import { IndexSuperviseWindowBusiness } from './index-supervise-window.business';
import { IndexVideoWindowBusiness } from './index-video-window.business';

@Injectable()
export class IndexGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(
    private media: IndexMediaWindowBusiness,
    private image: IndexImageWindowBusiness,
    private video: IndexVideoWindowBusiness,
    supervise: IndexSuperviseWindowBusiness
  ) {
    super();
    this.dapuqiao = new DaPuQiaoLevelBusiness(image, supervise);
  }
  args: GarbageDropStationTableArgs = {};
  index = GarbageDropStationWindowIndex.station;
  status?: GarbageTaskStatus;
  dapuqiao: DaPuQiaoLevelBusiness;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  clear() {
    this.index = GarbageDropStationWindowIndex.station;
    this.args = {};
    this.status = undefined;
    this.dapuqiao.clear();
  }

  async onimage(
    model: PagedArgs<
      | GarbageDropStationTableModel
      | GarbageDropRecordViewModel
      | ImageControlModel
    >
  ) {
    this.image.array.index = model.page.PageIndex;
    this.image.array.manualcapture = false;
    if (model.data instanceof GarbageDropStationTableModel) {
      let station = await model.data.GarbageStation;
      this.image.array.stationId = station.Id;
      this.image.array.manualcapture = true;
      if (station.Cameras) {
        this.image.array.models = station.Cameras.map((x) =>
          ImageControlCreater.Create(x)
        );
      }
    } else if (model.data instanceof GarbageDropRecordViewModel) {
      this.image.array.stationId = model.data.Data.StationId;
      this.image.array.models = ImageControlCreater.Create(model.data);
    } else {
    }

    this.image.array.show = true;
  }
  onvideo(item: GarbageDropRecordViewModel) {
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

  ondetails(item: DapuqiaoGarbageDropEventRecordModel) {
    this.supervise.detail.eventId = item.EventId;
    this.supervise.detail.show = true;
  }
  onimage(args: PagedArgs<DapuqiaoGarbageDropEventRecordModel>) {
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
  async onpicture(item: DapuqiaoGarbageDropEventRecordModel) {
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
  onprocess(item: DapuqiaoGarbageDropEventRecordModel) {
    this.supervise.complete.eventId = item.EventId;
    this.supervise.complete.show = true;
  }
}
