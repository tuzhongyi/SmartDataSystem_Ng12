import { Injectable } from '@angular/core';
import { LineZoomChartArgs } from 'src/app/common/components/charts/line-zoom-chart/line-zoom-chart.model';
import { GarbageDropRecordViewModel } from 'src/app/common/components/tables/garbage-drop-record-table/garbage-drop-record.model';
import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { DateTimeTool } from 'src/app/common/tools/datetime.tool';
import { GarbageStationWindowIndex } from 'src/app/garbage-system/components/windows/garbage-station-window/garbage-station-window.component';
import { ImageControlModelArray } from 'src/app/view-model/image-control.model';
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
  onimage(model: ImageControlModelArray) {
    this.image.array.models = model.models;
    this.image.array.index = model.index;
    if (model.models.length > 0) {
      this.image.array.current = model.models[0];
    }
    this.image.array.show = true;
  }
  async onvideo(item: GarbageDropRecordViewModel) {
    if (item.ResourceId) {
      this.video.playback(
        item.ResourceId,
        DateTimeTool.beforeOrAfter(item.EventTime)
      );
    }
  }
  onchartdblclick(args: LineZoomChartArgs) {
    this.media.multiple.statistic = args.statistic;
    this.media.multiple.date = args.date;
    this.media.multiple.show = true;
  }
}
