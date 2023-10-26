import { CameraImageUrlModel } from '../common/components/tables/event-record/event-record.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { Medium } from '../common/tools/medium';
import { OnlineStatus } from '../enum/online-status.enum';
import { ICamera } from '../network/model/garbage-station/camera.interface';
import { Camera } from '../network/model/garbage-station/camera.model';
import { VehicleCamera } from '../network/model/garbage-station/vehicle-camera.model';
import { ImageControlModel } from '../view-model/image-control.model';

export class ImageControlConverter
  implements IConverter<ICamera | CameraImageUrlModel, ImageControlModel>
{
  Convert(
    source: ICamera,
    onerror?: boolean,
    eventTime?: Date
  ): ImageControlModel;
  Convert(
    source: CameraImageUrlModel,
    onerror?: boolean,
    eventTime?: Date
  ): ImageControlModel;

  Convert(
    source: ICamera | CameraImageUrlModel,
    onerror = true,
    eventTime?: Date
  ): ImageControlModel {
    if (source instanceof CameraImageUrlModel) {
      return new ImageControlModel({
        id: source.CameraId,
        stationId: source.StationId,
        name: source.CameraName ?? '',
        src: Medium.img(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: OnlineStatus.Online,
        camera: source,
        eventTime: eventTime,
      });
    } else if (source instanceof Camera) {
      return new ImageControlModel({
        id: source.Id,
        stationId: source.GarbageStationId,
        name: source.Name,
        src: Medium.img(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    } else if (source instanceof VehicleCamera) {
      return new ImageControlModel({
        id: source.Id,
        name: source.Name,
        src: Medium.img(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    } else {
      return new ImageControlModel({
        id: source.Id,
        name: source.Name,
        src: Medium.img(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    }
  }
}
