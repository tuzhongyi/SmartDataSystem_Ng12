import { ImageControlModel } from '../common/components/image-control/image-control.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { OnlineStatus } from '../enum/online-status.enum';
import { Camera } from '../network/model/camera.model';
import { CameraImageUrl } from '../network/model/url.model';
import { MediumRequestService } from '../network/request/medium/medium-request.service';
import { CameraInnerUrl } from '../network/url/garbage/inner/camera.url';

export class ImageControlConverter
  implements IConverter<Camera, ImageControlModel>
{
  Convert(source: Camera, onerror?: boolean): ImageControlModel;
  Convert(source: CameraImageUrl, onerror?: boolean): ImageControlModel;

  Convert(source: Camera | CameraImageUrl, onerror = true): ImageControlModel {
    if (source instanceof Camera) {
      return new ImageControlModel(
        source.Id,
        source.Name,
        MediumRequestService.jpg(source.ImageUrl),
        onerror ? MediumRequestService.default : '',
        source.OnlineStatus
      );
    } else {
      return new ImageControlModel(
        source.CameraId,
        source.CameraName ?? '',
        MediumRequestService.jpg(source.ImageUrl),
        onerror ? MediumRequestService.default : '',
        OnlineStatus.Online
      );
    }
  }
}
