import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { Flags } from 'src/app/common/tools/flags';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Camera } from 'src/app/network/model/camera.model';
import { GarbageStation } from 'src/app/network/model/garbage-station.model';
import {
  MediaMultipleWindowArgs,
  MediaMultipleWindowModel,
} from './media-multiple-window.model';

export class MediaMultipleWindowConverter
  implements IConverter<MediaMultipleWindowArgs, MediaMultipleWindowModel>
{
  converter = {
    image: new ImageControlConverter(),
  };

  Convert(
    args: MediaMultipleWindowArgs,
    station?: GarbageStation
  ): MediaMultipleWindowModel {
    let model = new MediaMultipleWindowModel();
    if (station && station.Cameras) {
      for (let i = 0; i < station.Cameras.length; i++) {
        const camera = station.Cameras[i];
        let flags = new Flags(camera.CameraUsage);
        if (args.usage.length > 0) {
          for (let i = 0; i < args.usage.length; i++) {
            if (!flags.contains(args.usage[i])) {
              let media = this.getMedia(args.stationId!, camera, args.time);
              model.medias.push(media);
            }
          }
        } else {
          let media = this.getMedia(args.stationId!, camera, args.time);
          model.medias.push(media);
        }
      }
    }
    model.station = station;
    model.date = args.time;
    model.statistic = args.statistic;
    return model;
  }

  getMedia(stationId: string, camera: Camera, date: Date) {
    let media = new ImageVideoControlModel(camera.Id, stationId);
    media.image = this.converter.image.Convert(camera, undefined, date);
    return media;
  }
}
