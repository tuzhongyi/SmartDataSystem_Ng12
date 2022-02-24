import { ImageControlModel } from '../common/components/image-control/image-control.model';
import { CameraImageUrlModel } from '../common/components/tables/event-record-table/event-record.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { OnlineStatus } from '../enum/online-status.enum';
import { Camera } from '../network/model/camera.model';
import { CameraImageUrl } from '../network/model/url.model';
import { MediumRequestService } from '../network/request/medium/medium-request.service';

export class ImageControlConverter
  implements IConverter<Camera | CameraImageUrlModel, ImageControlModel>
{
  Convert(
    source: Camera,
    onerror?: boolean,
    eventTime?: Date
  ): ImageControlModel;
  Convert(
    source: CameraImageUrlModel,
    onerror?: boolean,
    eventTime?: Date
  ): ImageControlModel;

  Convert(
    source: Camera | CameraImageUrlModel,
    onerror = true,
    eventTime?: Date
  ): ImageControlModel {
    if (source instanceof Camera) {
      return new ImageControlModel(
        source.Id,
        source.GarbageStationId,
        source.Name,
        MediumRequestService.jpg(source.ImageUrl),
        onerror ? MediumRequestService.default : '',
        source.OnlineStatus,
        source,
        eventTime
      );
    } else {
      return new ImageControlModel(
        source.CameraId,
        source.Camera.GarbageStationId,
        source.CameraName ?? '',
        MediumRequestService.jpg(source.ImageUrl),
        onerror ? MediumRequestService.default : '',
        OnlineStatus.Online,
        source,
        eventTime
      );
    }
  }
}
