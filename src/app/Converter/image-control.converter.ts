import { ImageControlModel } from '../common/components/image-control/image-control.model';
import { IConverter } from '../common/interfaces/converter.interface';
import { Camera } from '../network/model/camera.model';
import { MediumRequestService } from '../network/request/medium/medium-request.service';

export class ImageControlConverter
  implements IConverter<Camera, ImageControlModel>
{
  Convert(source: Camera, onerror = true): ImageControlModel {
    return new ImageControlModel(
      source.Id,
      source.Name,
      MediumRequestService.jpg(source.ImageUrl),
      onerror ? MediumRequestService.default : '',
      source.OnlineStatus
    );
  }
}
