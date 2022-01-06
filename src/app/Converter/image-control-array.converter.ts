import { ImageControlModel } from 'src/app/common/components/image-control/image-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { Camera } from 'src/app/network/model/camera.model';

export class ImageControlArrayConverter
  implements IConverter<Camera[], ImageControlModel[]>
{
  itemConverter = new ImageControlConverter();

  Convert(source: Camera[], ...res: any[]): ImageControlModel[] {
    let array: ImageControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = this.itemConverter.Convert(source[i]);
      array.push(item);
    }
    return array;
  }
}
