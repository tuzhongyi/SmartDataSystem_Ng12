import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { CameraUsage } from 'src/app/enum/camera-usage.enum';
import { GarbageStationGarbageCountStatistic } from 'src/app/network/model/garbage-station-sarbage-count-statistic.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import { MediaMultipleWindowModel } from './media-multiple-window.model';

export class MediaMultipleWindowConverter
  implements
    IConverter<GarbageStationGarbageCountStatistic, MediaMultipleWindowModel>
{
  converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    source: GarbageStationGarbageCountStatistic,
    station: GarbageStation
  ): MediaMultipleWindowModel {
    let model = new MediaMultipleWindowModel();
    if (station.Cameras) {
      for (let i = 0; i < station.Cameras.length; i++) {
        const camera = station.Cameras[i];
        let flags = new Flags(camera.CameraUsage);
        if (!flags.contains(CameraUsage.GarbageFull)) {
          let media = new ImageVideoControlModel(source.Id, camera.Id);
          media.image = this.converter.image.Convert(camera);
          model.medias.push(media);
        }
      }
    }
    model.station = station;
    model.date = source.BeginTime;
    model.garbageCount = source.GarbageCount;
    return model;
  }
}
