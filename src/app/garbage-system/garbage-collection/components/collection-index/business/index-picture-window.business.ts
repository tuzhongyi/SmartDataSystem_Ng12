import { WindowViewModel } from 'src/app/common/components/window-control/window.model';
import { ImageResult } from '../../../../../view-model/image-result.model';

export class IndexPictureWindow extends WindowViewModel {
  constructor() {
    super();
  }

  image?: ImageResult;

  title: string = '';
  style = {
    width: '60%',
    height: '60%',
  };
}
