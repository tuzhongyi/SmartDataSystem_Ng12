import { ImageVideoControlModel } from 'src/app/common/components/image-video-control/image-video-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { ICamera } from 'src/app/network/model/garbage-station/camera.interface';
import { Camera } from 'src/app/network/model/garbage-station/camera.model';
import { ImageControlModel } from 'src/app/view-model/image-control.model';

export class MediaVideoControlArrayConverter
  implements
    IConverter<Array<ICamera | ImageControlModel>, ImageVideoControlModel[]>
{
  converter = {
    item: new MediaVideoControlConverter(),
  };
  Convert(
    source: (ICamera | ImageControlModel)[],
    onerror = true
  ): ImageVideoControlModel[] {
    let array: ImageVideoControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      let model: ImageVideoControlModel;
      let item = source[i];
      if (item instanceof ImageControlModel) {
        model = this.converter.item.Convert(item, onerror, item.eventTime);
      } else {
        model = this.converter.item.Convert(item, onerror);
      }

      array.push(model);
    }
    return array;
  }
}

class MediaVideoControlConverter
  implements IConverter<ICamera | ImageControlModel, ImageVideoControlModel>
{
  private converter = {
    image: new ImageControlConverter(),
  };
  Convert(
    source: ICamera | ImageControlModel,
    onerror = true,
    eventTime?: Date
  ): ImageVideoControlModel {
    let model: ImageVideoControlModel;

    if (source instanceof ImageControlModel) {
      model = new ImageVideoControlModel(source.id, source.stationId);
      model.image = source;
    } else if (source instanceof Camera) {
      model = new ImageVideoControlModel(source.Id, source.GarbageStationId);
      model.image = this.converter.image.Convert(source, onerror, eventTime);
    } else {
      model = new ImageVideoControlModel(source.Id);
      model.image = this.converter.image.Convert(source, onerror, eventTime);
    }

    return model;
  }
}
