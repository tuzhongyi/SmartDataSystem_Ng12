import { ImageControlModel } from '../view-model/image-control.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { OnlineStatus } from '../enum/online-status.enum';
import { Medium } from '../common/tools/medium';
import { CameraImageUrlModel } from '../common/components/tables/event-record/event-record.model';
import { ICamera } from '../network/model/camera.interface';
import { Camera } from '../network/model/camera.model';
import { VehicleCamera } from '../network/model/vehicle-camera.model';

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
        src: Medium.jpg(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: OnlineStatus.Online,
        camera: source,
        eventTime,
      });
    } else if (source instanceof Camera) {
      return new ImageControlModel({
        id: source.Id,
        stationId: source.GarbageStationId,
        name: source.Name,
        src: Medium.jpg(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    } else if (source instanceof VehicleCamera) {
      return new ImageControlModel({
        id: source.Id,
        name: source.Name,
        src: Medium.jpg(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    } else {
      return new ImageControlModel({
        id: source.Id,
        name: source.Name,
        src: Medium.jpg(source.ImageUrl),
        onerror: onerror ? Medium.default : '',
        status: source.OnlineStatus ?? OnlineStatus.Offline,
        camera: source,
        eventTime: eventTime,
      });
    }
  }
}
