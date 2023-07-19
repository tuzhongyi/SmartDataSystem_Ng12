import {
  ImageVideoControlModel,
  ImageVideoControlOperation,
} from '../image-video-control/image-video-control.model';

export class ImageVideoMultControlModel {
  constructor(operation: boolean = false) {
    this.operation.play = operation;
    this.operation.fullscreen = operation;
  }
  operation: ImageVideoControlOperation = new ImageVideoControlOperation();
  model?: Promise<ImageVideoControlModel>;
  fulled: boolean = false;
}
