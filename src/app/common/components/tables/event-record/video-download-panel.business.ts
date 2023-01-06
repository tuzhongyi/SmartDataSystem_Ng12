import { Injectable } from '@angular/core';
import { DownloadBusiness } from 'src/app/common/business/download.business';
import { IBusiness } from 'src/app/common/interfaces/bussiness.interface';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { EventRecordViewModel } from 'src/app/view-model/event-record.model';
import { VideoDownloader } from '../../panels/video-download-panel/video-downloader.model';
import { WindowViewModel } from '../../window-control/window.model';

@Injectable()
export class VideoDownloadPanelBusiness
  extends WindowViewModel
  implements IBusiness<EventRecordViewModel, VideoDownloader[]>
{
  constructor(private downloader: DownloadBusiness) {
    super();
  }

  record?: EventRecordViewModel;

  Converter: IConverter<EventRecordViewModel, VideoDownloader[]> =
    new VideoDownloaderConverter();
  async load(cameraUsage: CameraUsage): Promise<VideoDownloader[]> {
    if (this.record) {
      let model = this.Converter.Convert(this.record, cameraUsage);
      return model;
    }
    return [];
  }
  getData(...args: any): Promise<EventRecordViewModel> {
    throw new Error('Method not implemented.');
  }

  style = {
    width: '350px',
    height: '300px',
  };

  download(model: VideoDownloader) {
    this.downloader.video(model.stationId, model.cameraId, model);
    this.show = false;
  }
  cancel() {
    this.show = false;
  }
}

class VideoDownloaderConverter
  implements IConverter<EventRecordViewModel, VideoDownloader[]>
{
  Convert(
    source: EventRecordViewModel,
    cameraUsage: CameraUsage
  ): VideoDownloader[] {
    let array: VideoDownloader[] = [];
    if (source.GarbageStation) {
      if (source.GarbageStation.Cameras) {
        for (let i = 0; i < source.GarbageStation.Cameras.length; i++) {
          const camera = source.GarbageStation.Cameras[i];
          let flags = new Flags(camera.CameraUsage);
          if (flags.contains(cameraUsage)) {
            let begin = new Date(source.EventTime.getTime());
            begin.setSeconds(begin.getSeconds() - 15);
            let end = new Date(source.EventTime.getTime());
            end.setSeconds(end.getSeconds() + 15);
            let item = new VideoDownloader(
              camera.Name,
              camera.Id,
              camera.GarbageStationId,
              { BeginTime: begin, EndTime: end }
            );
            array.push(item);
          }
        }
      }
    }
    return array;
  }
}
