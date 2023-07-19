import { Page } from '../network/model/page_list.model';
import { ImageControlModel } from './image-control.model';

export class Paged<T> {
  Data!: T;
  Page!: Page;
}

export class ImagePaged<T> extends Paged<T> {
  Image!: ImageControlModel;
}
