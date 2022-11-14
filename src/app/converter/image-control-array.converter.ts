import { ImageControlModel } from 'src/app/view-model/image-control.model';
import { IConverter } from 'src/app/common/interfaces/converter.interface';
import { ImageControlConverter } from 'src/app/converter/image-control.converter';
import { ICamera } from '../network/model/camera.interface';

export class ImageControlArrayConverter
  implements IConverter<ICamera[], ImageControlModel[]>
{
  itemConverter = new ImageControlConverter();

  Convert(source: ICamera[], ...res: any[]): ImageControlModel[] {
    let array: ImageControlModel[] = [];
    for (let i = 0; i < source.length; i++) {
      const item = this.itemConverter.Convert(source[i]);
      array.push(item);
    }
    return array;
  }
}
