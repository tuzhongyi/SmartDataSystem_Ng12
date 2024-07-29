import { Injectable } from '@angular/core';

import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import {
  GarbageDropStationTableArgs,
  GarbageDropStationTableModel,
} from 'src/app/common/components/tables/garbage-drop-station-table/garbage-drop-station-table.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageControlCreater } from 'src/app/converter/image-control.creater';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageDropStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-drop-window/garbage-drop-window.model';
import { MediaMultipleWindowArgs } from 'src/app/garbage-system/components/windows/media-multiple-window/media-multiple-window.model';
import { PagedArgs } from 'src/app/network/model/model.interface';
import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { CommitteesIndexImageWindowBusiness } from './committees-image-window.business';
import { CommitteesMediaWindowBusiness } from './committees-media-window.business';
import { CommitteesVideoWindowBusiness } from './committees-video-window.business';

@Injectable()
export class CommitteesGarbageStationDropWindowBusiness extends WindowViewModel {
  constructor(
    private media: CommitteesMediaWindowBusiness,
    private image: CommitteesIndexImageWindowBusiness,
    private video: CommitteesVideoWindowBusiness
  ) {
    super();
  }
  args: GarbageDropStationTableArgs = {};
  index = GarbageDropStationWindowIndex.station;

  style = {
    height: '83.5%',
    width: '90%',
    transform: 'translate(-50%, -44.5%)',
  };

  async onimage(
    model: PagedArgs<
      | GarbageDropStationTableModel
      | GarbageDropRecordViewModel
      | ImageControlModel
    >
  ) {
    this.image.array.manualcapture = false;
    this.image.array.index = model.page.PageIndex;

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
      this.image.array.models = [model.data];
    }

    this.image.array.show = true;
  }
  async onvideo(model: GarbageDropRecordViewModel) {}

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
