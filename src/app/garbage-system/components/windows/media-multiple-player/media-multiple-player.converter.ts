import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { Duration } from 'src/app/network/model/garbage-station/duration.model';
import { GarbageStation } from 'src/app/network/model/garbage-station/garbage-station.model';
import {
  MediaMultiplePlayerArgs,
  MediaMultiplePlayerModel,
} from './media-multiple-player.model';

export class MediaMultiplePlayerConverter
  implements IConverter<MediaMultiplePlayerArgs, MediaMultiplePlayerModel>
{
  converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    args: MediaMultiplePlayerArgs,
    station?: GarbageStation
  ): MediaMultiplePlayerModel {
    let model = new MediaMultiplePlayerModel();
    if (station && station.Cameras) {
      for (let i = 0; i < station.Cameras.length; i++) {
        const camera = station.Cameras[i];
        let flags = new Flags(camera.CameraUsage);
        if (args.usage.length > 0) {
          for (let i = 0; i < args.usage.length; i++) {
            if (!flags.contains(args.usage[i])) {
              let media = this.getMedia(args.stationId!, camera);
              model.medias.push(media);
            }
          }
        } else {
          let media = this.getMedia(args.stationId!, camera, args.duration);
          model.medias.push(media);
        }
      }
    }

    return model;
  }

  getMedia(stationId: string, camera: Camera, duration?: Duration) {
    let media = new ImageVideoControlModel(camera.Id, stationId);
    media.image = this.converter.image.Convert(camera);
    media.duration = duration;
    return media;
  }
}
