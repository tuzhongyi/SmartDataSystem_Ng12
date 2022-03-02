import {
  IConverter,
  IPromiseConverter,
} from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import {
  GarbageDropEventRecord,
  IllegalDropEventRecord,
} from 'src/app/network/model/event-record.model';
import { GarbageStationNumberStatisticV2 } from 'src/app/network/model/garbage-station-number-statistic-v2.model';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { CameraImageUrl } from 'src/app/network/model/url.model';
import { CameraImageUrlModel } from '../../tables/event-record-table/event-record.model';
import {
  ImageTimeData,
  LineZoomChartModel,
  LineZoomChartSource,
  TimeData,
} from './line-zoom-chart.model';

export class LineZoomChartConverter
  implements IConverter<LineZoomChartSource, LineZoomChartModel>
{
  private converter = {
    count: new LineZoomChartDropDurationConverter(),
    record: new LineZoomChartEventRecordConverter(),
  };

  Convert(source: LineZoomChartSource, ...res: any[]): LineZoomChartModel {
    let model = new LineZoomChartModel();
    if (source.count) {
      model.count = this.converter.count.Convert(source.count);
    }
    if (source.record) {
      model.record = this.converter.record.Convert(source.record);
    }
    return model;
  }
}

export class LineZoomChartEventRecordConverter
  implements
    IConverter<
      IllegalDropEventRecord[],
      ImageTimeData<IllegalDropEventRecord>[]
    >
{
  converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    source: IllegalDropEventRecord[],
    ...res: any[]
  ): ImageTimeData<IllegalDropEventRecord>[] {
    let datas: ImageTimeData<IllegalDropEventRecord>[] = [];
    for (let i = 0; i < source.length; i++) {
      const record = source[i];
      let time = new Date(record.EventTime);
      time.setMilliseconds(0);
      time.setSeconds(0);

      let url: CameraImageUrl = {
        CameraId: record.ResourceId ?? '',
        CameraName: record.ResourceName,
        ImageUrl: record.ImageUrl ?? '',
      };

      let img = this.converter.image.Convert(
        new CameraImageUrlModel(url, record.Data.StationId)
      );
      datas.push({
        time: time,
        value: record,
        image: img,
      });
    }
    return datas;
  }
}

export class LineZoomChartDropDurationConverter
  implements
    IConverter<
      GarbageStationGarbageCountStatistic[],
      TimeData<GarbageStationGarbageCountStatistic>[]
    >
{
  Convert(
    source: GarbageStationGarbageCountStatistic[],
    ...res: any[]
  ): TimeData<GarbageStationGarbageCountStatistic>[] {
    let datas: TimeData<GarbageStationGarbageCountStatistic>[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = source[i];
      datas.push({
        time: item.BeginTime,
        value: item,
      });
    }
    return datas;
  }
}
